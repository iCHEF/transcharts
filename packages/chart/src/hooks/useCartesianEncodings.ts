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
  // from common types
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

  // handle the colors
  const colorScale = useMemo(
    () => (typeof color !== 'undefined') && getColorScale({
      data,
      encoding: color,
      colors: theme.colors,
    }),
    [color, data, theme.colors],
  );
  const defaultColor = theme.colors.category[0];
  const getColorString = colorScale
    ? colorScale.selector.getScaledVal
    : () => defaultColor;

  // the scales and configs of the axis based on its encodings
  const xAxis = useMemo(
    () => getXAxisScale({
      data,
      axisLength: width,
      encoding: x,
    }),
    [data, width, x],
  );
  const yAxis = useMemo(
    () => getYAxisScale({
      data,
      axisLength: height,
      encoding: y,
    }),
    [data, height, y],
  );

  // selectors to get the original/scaled/formatted values
  const xSelector = xAxis.selector;
  const ySelector = yAxis.selector;

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

    /** Contains functions to select values from a data row */
    rowValSelectors: {
      /** Functions to get value on the x-axis */
      xAxis: xSelector,

      /** Functions to get value on the y-axis */
      yAxis: ySelector,

      /** Functions to get colors */
      color: {
        /** Function to get the color string */
        getColorString,
      },
    },
  };
};
