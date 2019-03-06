import { useRef, useMemo } from 'react';
import {
  // from TooltipLayer
  Margin,
  // from hooks
  useContainerDimension,
} from '@ichef/transcharts-graph';

import { getInnerGraphDimension } from '../utils/getInnerGraphDimension';

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
) => {
  // compute the outer and inner dimension of the chart
  const chartRef = useRef<HTMLDivElement>(null);
  const outerDimension = useContainerDimension(chartRef);
  const graphDimension = useMemo(
    () => {
      return getInnerGraphDimension(outerDimension, margin);
    },
    [outerDimension, margin],
  );

  return {
    /** Ref to the chart, which is to be passed in the props of the container */
    chartRef,

    /** Width and height of the outer container */
    outerDimension,

    /** Width and height of the inner graph (does not contain axes, legend, etc...) */
    graphDimension,
  };
};
