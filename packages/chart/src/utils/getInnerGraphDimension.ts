import { GraphDimension, Margin } from '@ichef/transcharts-graph';

const DEFAULT_LENGTH = 300;

/**
 * Returns the inner width and height of the graph
 * @param dimension - the outer width and height of the graph
 * @param margin - the lengths of top, right, bottom, and left margin
 */
export function getInnerGraphDimension(
  dimension: GraphDimension,
  margin: Margin,
  legendWidth: number = 0,
) {
  const { width: outerWidth, height: outerHeight } = dimension;
  const { top, right, bottom, left } = margin;
  const graphWidth = outerWidth > 0 ? outerWidth - left - right - legendWidth : DEFAULT_LENGTH;
  const graphHeight = outerHeight > 0 ? outerHeight - top - bottom : DEFAULT_LENGTH;

  return {
    graphWidth,
    graphHeight,
  };
}
