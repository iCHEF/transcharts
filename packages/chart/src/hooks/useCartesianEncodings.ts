import { useMemo } from 'react';
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
  AxisScale,
  GraphDimension,
  // from themes
  Theme,
} from '@ichef/transcharts-graph';

/**
 * Return [min, max] of a column selected from the grouped data
 */
function getDomainFromDataGroup(
  dataGroups: object[][],
  keyField: string,
  valueField: string,
) {
  const aggreated = {};
  dataGroups.forEach((data: object[]) => {
    data.forEach((row) => {
      const key = row[keyField];
      const val = row[valueField];
      aggreated[key] = aggreated[key]
        ? aggreated[key] + val
        : val;
    });
  });

  const max = Math.max(...Object.keys(aggreated).map(key => aggreated[key]));

  return [0, max];
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
) => {
  // get the inner width and height of the graph
  const { width, height } = graphDimension;

  // sort the data
  const sortedData = useMemo(
    () => {
      const getValue = getValByScaleType(x.scaleType);
      const getOriginalVal = (record: object) => getValue(record[x.field]);

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
  const xAxis: AxisScale = useMemo(
    () => {
      const axisScale = getXAxisScale({
        data,
        axisLength: width,
        encoding: x,
      });

      // update the domain if the domains of x-y scales is band-linear
      if (x.scale === 'linear' && y.scale === 'band') {
        axisScale.scale.domain(getDomainFromDataGroup(dataGroups, y.field, x.field));
      }
      return axisScale;
    },
    [data, width, x],
  );
  const yAxis: AxisScale = useMemo(
    () => {
      const axisScale = getYAxisScale({
        data,
        axisLength: height,
        encoding: y,
      });

      // update the domain if the domains of x-y scales is linear-band
      if (x.scale === 'band' && y.scale === 'linear') {
        axisScale.scale.domain(getDomainFromDataGroup(dataGroups, x.field, y.field));
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

  return {
    /** Array of data grouped by fields of colors  */
    dataGroups,

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
