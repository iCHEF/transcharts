import * as React from 'react';

import { Margin, FieldSelector, HoveringState, HoveredPointState } from '../common/types';
import { Tooltip } from '../tooltip/Tooltip';
import { TooltipItem } from '../tooltip/TooltipItem';

export interface TooltipLayerProps {
  hovering: HoveringState;
  hoveredPoint: HoveredPointState;
  data: object[];
  graphWidth: number;
  graphHeight: number;
  margin: Margin;
  xSelector: FieldSelector;
  ySelector: FieldSelector;

  /** X position of the tooltip */
  x?: number;

  /** Y position of the tooltip */
  y?: number;

  getColor: FieldSelector['getScaledVal'];
}

/** Generates the tooltip box */
export const TooltipLayer = ({
  hovering,
  hoveredPoint,
  data,
  graphWidth,
  graphHeight,
  margin,
  xSelector,
  ySelector,
  x = xSelector.getScaledVal(data[hoveredPoint.index]),
  y = hoveredPoint.position.y,
  getColor,
}: TooltipLayerProps) => {
  const { index } = hoveredPoint;

  return (
    <Tooltip
      graphWidth={graphWidth}
      graphHeight={graphHeight}
      graphMargin={margin}
      position={{
        x,
        y,
      }}
      show={hovering}
    >
      <h3>{xSelector.getFormattedStringVal(data[index])}</h3>
      <TooltipItem
        color={getColor(data[index])}
        text={ySelector.getFormattedStringVal(data[index])}
      />
    </Tooltip>
  );
};
