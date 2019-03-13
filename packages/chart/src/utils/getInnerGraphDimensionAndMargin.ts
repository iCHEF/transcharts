import { GraphDimension, Margin, LegendConfig } from '@ichef/transcharts-graph';

const DEFAULT_LENGTH = 300;

/**
 * Returns the inner width and height of the graph
 * @param dimension - the outer width and height of the graph
 * @param margin - the lengths of top, right, bottom, and left margin
 * @param legendDimension - the width and height of the legend
 * @param legendOrient - orient of legend
 */
export function getInnerGraphDimensionAndMargin(
  dimension: GraphDimension,
  margin: Margin,
  legendDimension: GraphDimension,
  legendOrient: LegendConfig['orient'],
) {
  const { width: outerWidth, height: outerHeight } = dimension;
  const { top, right, bottom, left } = margin;
  let graphWidth = DEFAULT_LENGTH;
  let graphHeight = DEFAULT_LENGTH;
  const graphMargin = { ...margin };
  switch (legendOrient) {
    case 'left':
    case 'right': {
      graphWidth = outerWidth > 0
        ? outerWidth - left - right - legendDimension.width
        : DEFAULT_LENGTH;
      graphHeight = outerHeight > 0 ? outerHeight - top - bottom : DEFAULT_LENGTH;
      if (legendOrient === 'left') {
        graphMargin.left += legendDimension.width;
      }
      break;
    }
    case 'top':
    case 'bottom': {
      graphWidth = outerWidth > 0 ? outerWidth - left - right : DEFAULT_LENGTH;
      graphHeight = outerHeight > 0
        ? outerHeight - top - bottom - legendDimension.height
        : DEFAULT_LENGTH;
      if (legendOrient === 'top') {
        graphMargin.top += legendDimension.height;
      }
      break;
    }
    default: {
      break;
    }
  }

  return {
    graphMargin,
    graphDimension: {
      width: graphWidth,
      height: graphHeight,
    },
  };
}
