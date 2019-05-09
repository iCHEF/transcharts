import { useRef, useMemo } from 'react';
import {
  // from common types
  Margin,
  GraphDimension,
  ColorEncoding,
  // from hooks
  useContainerDimension,
} from '@ichef/transcharts-graph';

import { getInnerGraphDimensionAndMargin } from '../utils/getInnerGraphDimensionAndMargin';

/**
 * Returns a ref to be bind with a container,
 * and it calculates the inner and outer dimension of the graph
 * based on the given margin.
 */
export const useChartDimensions = (
  /** Margin between the inner graph area and the outer svg */
  margin: Margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 60,
  },
  color?: ColorEncoding,
) => {
  // compute the outer and inner dimension of the chart
  const chartRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const outerDimension: GraphDimension = useContainerDimension(chartRef);
  const legendDimension = useContainerDimension(legendRef);
  const titleDimension = useContainerDimension(titleRef);
  const legendOrient = (color && color.legend && color.legend.orient) || 'right';

  const { graphDimension, graphMargin }  = useMemo(
    () => {
      return getInnerGraphDimensionAndMargin(
        outerDimension,
        margin,
        titleDimension,
        legendDimension,
        legendOrient,
      );
    },
    [outerDimension, margin, legendDimension, legendOrient],
  );

  return {
    /** Ref to the chart, which is to be passed in the props of the container */
    chartRef,

    /** Ref to the title box, which is to be passed in the props of the title box */
    titleRef,

    /** Ref to the legend, which is to be passed in the props of the legend */
    legendRef,

    /** Width and height of the outer container */
    outerDimension,

    /** Width and height of the inner graph (does not contain axes, legend, etc...) */
    graphDimension,

    /** Margin between the chart container and the inner graph */
    graphMargin,
  };
};
