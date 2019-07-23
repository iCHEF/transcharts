import { useMemo } from 'react';
import values from 'lodash/values';
import {
  // from utils
  getColorScale,
  getDataGroupByEncodings,
  getXAxisScale,
  getYAxisScale,
  getRecordFieldSelector,
  getValByScaleType,
  // from common types
  Encoding,
  AxisEncoding,
  ColorEncoding,
  GraphDimension,
  // from themes
  Theme,
  // from TooltipLayer
  AxisProjectedValue,
} from '@ichef/transcharts-graph';

import { getAxisProjectedValues } from '../utils/getAxisProjectedValues';

/**
 * Return [min, max] of a column selected from the grouped data
 */
function getLinearDomainFromDataGroup(
  dataGroups: object[][],
  keyField: string,
  valueField: string,
) {
  const aggreatedMax: object = {};
  const aggreatedMin: object = {};
  dataGroups.forEach((data: object[]) => {
    data.forEach((row) => {
      const key = row[keyField];
      const val = row[valueField];
      if (val >= 0) {
        aggreatedMax[key] = aggreatedMax[key]
          ? aggreatedMax[key] + val
          : val;
      } else {
        aggreatedMin[key] = aggreatedMin[key]
          ? aggreatedMin[key] + val
          : val;
      }
    });
  });

  const min = Math.min(0, ...values(aggreatedMin));
  const max = Math.max(0, ...values(aggreatedMax));

  return [min, max];
}

/**
 * It returns calculated groups of data and its value selectors
 * from the given encodings of Cartesian plots.
 */
export const useCartesianEncodings = (
  /** Width and height of the inner graph (does not contain axes, legend, etc...) */
  graphDimension: GraphDimension,

  /** Theme of the chart */
  theme: Theme,

  /** Array of rows of data */
  data: object[],

  /** Field and data type of x-axis */
  x: AxisEncoding,

  /** Field and data type of y-axis */
  y: AxisEncoding,

  /** Fields and definitions for colors */
  color?: ColorEncoding,

  /**
   * Whether the graph is drawn from the x-axis, i.e., vertical graph.
   * In a transposed (horizontal) graph, you have to set it as false,
   * in order to get the right `axisProjectedValues` value.
   */
  drawFromXAxis: boolean = true,
) => {
  // get the inner width and height of the graph
  const { width, height } = graphDimension;

  // sort the data
  const sortedData = useMemo(
    () => {
      const baseAxis = drawFromXAxis ? x : y;
      const getValue = getValByScaleType(baseAxis.scale);
      const getOriginalVal = (record: object) => getValue(record[baseAxis.field]);

      return (
        data.sort(
          (rowA, rowB) => getOriginalVal(rowA) - getOriginalVal(rowB),
        )
      );
    },
    [data, x],
  );

  // groups the data by colors
  const dataGroups = useMemo(
    () => {
      const encodings = [color].filter((encoding): encoding is Encoding => !!encoding);
      return getDataGroupByEncodings(sortedData, encodings);
    },
    [color, sortedData],
  );

  // the scales and configs of the axis based on its encodings
  const xAxis = useMemo(
    () => {
      const axisScale = getXAxisScale({
        data,
        axisLength: width,
        encoding: x,
      });

      // update the domain if the domains of x-y scales is band-linear
      if (x.scale === 'linear' && y.scale === 'band') {
        const domain = getLinearDomainFromDataGroup(dataGroups, y.field, x.field);
        axisScale.domain = domain;
        axisScale.scale.domain(domain);
      }
      return axisScale;
    },
    [data, width, x],
  );
  const yAxis = useMemo(
    () => {
      const axisScale = getYAxisScale({
        data,
        axisLength: height,
        encoding: y,
      });

      // update the domain if the domains of x-y scales is linear-band
      if (x.scale === 'band' && y.scale === 'linear') {
        const domain = getLinearDomainFromDataGroup(dataGroups, x.field, y.field);
        axisScale.domain = domain;
        axisScale.scale.domain(domain);
      }
      return axisScale;
    },
    [data, height, y],
  );

  // selectors to get the original/scaled/formatted values
  const xSelector = useMemo(
    () => getRecordFieldSelector(xAxis),
    [xAxis],
  );
  const ySelector = useMemo(
    () => getRecordFieldSelector(yAxis),
    [yAxis],
  );

  // handle the colors
  const colorScale = useMemo(
    () => {
      if (typeof color === 'undefined') {
        return null;
      }
      return getColorScale({
        data,
        encoding: color,
        colors: theme.colors,
      });
    },
    [color, data, theme.colors],
  );
  const defaultColor = theme.colors.category[0];
  const getColorString = useMemo(
    () => (
      colorScale
      ? getRecordFieldSelector(colorScale).getScaledVal
      : () => defaultColor
    ),
    [colorScale, defaultColor],
  );

  const axisProjectedValues: AxisProjectedValue[] = useMemo(
    () => {
      if (!drawFromXAxis) {
        return getAxisProjectedValues(dataGroups, ySelector, xSelector, getColorString);
      }
      return getAxisProjectedValues(dataGroups, xSelector, ySelector, getColorString);
    },
    [dataGroups, xSelector, ySelector, getColorString],
  );

  return {
    /** Array of data grouped by fields of colors  */
    dataGroups,

    /**
     * The y-values in the `dataGroups` grouped by projected x values.
     * -  Structure of groupedY: "groupedY":[ { "index of dataGroup": "value" }, ... ]
     * @example
     * [{
     *  "basePos": 0,
     *  "baseStrVal": "0",
     *  "projectedVals": [{"groupIdx": 0, "projectedStrVal": 9, "projectedPos": 18, "color": "#deebf7"}],
     *  },
     * {
     *  "basePos": 109.12812500000001,
     *  "baseStrVal": "2",
     *  "projectedVals": [{"groupIdx": 0, "projectedStrVal": 3, "projectedPos": 6, "color": "#deebf7"}, ...],
     * }]
     */
    axisProjectedValues,

    /** d3 scale functions and other related configurations computed for various encodings */
    scalesConfig: {
      /** scale function and configs for x-axis */
      x: xAxis,

      /** scale function and configs for y-axis */
      y: yAxis,

      /** scale function and configs for the color scale; null if there is no color encoding */
      color: colorScale,
    },

    /** Contains functions to select values from a data row */
    rowValSelectors: {
      /** Functions to get value on the x-axis */
      x: xSelector,

      /** Functions to get value on the y-axis */
      y: ySelector,

      /** Functions to get colors */
      color: {
        /** Function to get the color string */
        getString: getColorString,
      },
    },
  };
};
