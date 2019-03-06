import { useMemo } from 'react';
import {
  // from TooltipLayer
  Encoding,
  AxisEncoding,
  ColorEncoding,
  // from utils
  getColorScale,
  getDataGroupByEncodings,
  getXAxisScale,
  getYAxisScale,
  getRecordFieldSelector,
  // from common types
  AxisScale,
  GraphDimension,
  // from themes
  Theme,
} from '@ichef/transcharts-graph';

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

  // the scales and configs of the axis based on its encodings
  const xAxis: AxisScale = useMemo(
    () => getXAxisScale({
      data,
      axisLength: width,
      encoding: x,
    }),
    [data, width, x],
  );
  const yAxis: AxisScale = useMemo(
    () => getYAxisScale({
      data,
      axisLength: height,
      encoding: y,
    }),
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

  // sort the data
  const sortedData = useMemo(
    () => data.sort(
      (rowA, rowB) => xSelector.getOriginalVal(rowA) - xSelector.getOriginalVal(rowB),
    ),
    [data, xSelector],
  );

  // groups the data by colors
  const dataGroups = useMemo(
    () => {
      const encodings = [color].filter((encoding): encoding is Encoding => !!encoding);
      return getDataGroupByEncodings(sortedData, encodings);
    },
    [color, sortedData],
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
