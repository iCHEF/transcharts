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
  getColor: FieldSelector['getScaledVal'];
}

/** Generates the tooltip box */
export const TooltipLayer: React.FC<TooltipLayerProps> = ({
  hovering,
  hoveredPoint,
  data,
  graphWidth,
  graphHeight,
  margin,
  xSelector,
  ySelector,
  getColor,
}) => {
  const { index, position } = hoveredPoint;

  return (
    <Tooltip
      graphWidth={graphWidth}
      graphHeight={graphHeight}
      graphMargin={margin}
      position={{
        x: xSelector.getScaledVal(data[index]),
        y: position.y,
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
