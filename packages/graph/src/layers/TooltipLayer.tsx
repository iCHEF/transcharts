import * as React from 'react';

import { Margin, HoveringState, HoveredPointState } from '../common/types';
import { Tooltip } from '../tooltip/Tooltip';
import { TooltipItem } from '../tooltip/TooltipItem';
export interface GroupedY {
  /** Index of `dataGroups` */
  groupIdx: number;

  /** Original value on Y */
  yVal: number;

  /** Projected position of Y */
  yPos: number;

  /** Color string of the point */
  color: string;
}
export interface AxisProjectedValue {
  /** Projected position of X */
  xPos: number;

  /** Original value on X */
  xVal: number;

  /** Corresponding data in `dataGroups` */
  groupedY: GroupedY[];
}

export interface TooltipLayerProps {
  hovering: HoveringState;
  hoveredPoint: HoveredPointState;
  axisProjectedValues: AxisProjectedValue[];
  graphWidth: number;
  graphHeight: number;
  margin: Margin;

  /** X position of the tooltip */
  x?: number;

  /** Y position of the tooltip */
  y?: number;
}

/** Generates the tooltip box */
export const TooltipLayer = ({
  hovering,
  hoveredPoint,
  axisProjectedValues,
  graphWidth,
  graphHeight,
  margin,
  x = axisProjectedValues[hoveredPoint.index].xPos,
  y = hoveredPoint.position.y,
}: TooltipLayerProps) => {
  const projected = axisProjectedValues[hoveredPoint.index];
  const tooltipItems = projected.groupedY.map(pointY => (
    <TooltipItem
      color={pointY.color}
      text={`${pointY.yVal}`}
    />
  ));

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
      <h3>{projected.xVal}</h3>
      {tooltipItems}
    </Tooltip>
  );
};
