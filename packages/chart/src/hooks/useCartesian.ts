import { useContext, useRef } from 'react';
import {
  // from hooks
  useHoverState,
  // from TooltipLayer
  Margin,
  Encoding,
  AxisEncoding,
  ColorEncoding,
  // from utils
  getColorScale,
  getDataGroupByEncodings,
  getXAxisScale,
  getYAxisScale,
  // from themes
  ThemeContext,
  // from hooks
  useContainerDimension,
} from '@ichef/transcharts-graph';

import { getInnerGraphDimension } from '../utils/getInnerGraphDimension';

export const useCartesian = (
  /** Array of rows of data */
  data: object[],

  /** Field and data type of x-axis */
  x: AxisEncoding,

  /** Field and data type of y-axis */
  y: AxisEncoding,

  /** Fields and definitions for colors */
  color?: ColorEncoding,

  /** Margin between the inner graph area and the outer svg */
  margin: Margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 60,
  },

  /** Should show the axis on the left or not */
  showLeftAxis: boolean = true,

  /** Should show the axis on the bottom or not */
  showBottomAxis: boolean = true,
) => {
  // deal with the theme
  const theme = useContext(ThemeContext);

  // compute the outer and inner dimension of the chart
  const chartRef = useRef<HTMLDivElement>(null);
  const dimension = useContainerDimension(chartRef);
  const { width: outerWidth, height: outerHeight } = dimension;
  const { graphWidth, graphHeight } = getInnerGraphDimension(dimension, margin);

  // control the hovering/touch interactions
  const hoverControls = useHoverState();

  // handle the colors
  const colorScale = (typeof color !== 'undefined') && getColorScale({
    data,
    encoding: color,
    colors: theme.colors,
  });
  const defaultColor = theme.colors.category[0];
  const getColorString = colorScale
    ? colorScale.selector.getScaledVal
    : () => defaultColor;

  // the scales and configs of the axis based on its encodings
  const xAxis = getXAxisScale({
    data,
    axisLength: graphWidth,
    encoding: x,
  });
  const yAxis = getYAxisScale({
    data,
    axisLength: graphHeight,
    encoding: y,
  });

  // selectors to get the original/scaled/formatted values
  const xSelector = xAxis.selector;
  const ySelector = yAxis.selector;

  // sort the data
  const sortedData = data.sort(
    (rowA, rowB) => xSelector.getOriginalVal(rowA) - xSelector.getOriginalVal(rowB),
  );

  // TODO: memoization?
  // groups the data by colors
  const encodings = [color].filter((encoding): encoding is Encoding => !!encoding);
  const dataGroups = getDataGroupByEncodings(sortedData, encodings);

  return {
    /** Ref to the chart, which is to be passed in the props of the container */
    chartRef,

    /** Width and height of the outer and inner graph */
    dimension: {
      /** Width of the container of the graph */
      outerWidth,

      /** Height of the container of the graph */
      outerHeight,

      /** Width of inner graph (does not contain axes, legend, etc...) */
      graphWidth,

      /** Height of inner graph (does not contain axes, legend, etc...) */
      graphHeight,
    },

    /** Theme of the chart */
    theme,

    /** Info and functions related to touch/hover interactions */
    hoverControls,

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
