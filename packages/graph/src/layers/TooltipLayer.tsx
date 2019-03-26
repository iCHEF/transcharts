import * as React from 'react';

import { Margin, HoveringState, HoveredPointState } from '../common/types';
import { Tooltip } from '../tooltip/Tooltip';
import { TooltipItem } from '../tooltip/TooltipItem';
export interface GroupedY {
  /** Index of `dataGroups` */
  groupIdx: number;

  /** Original value on Y */
  yStrVal: number;

  /** Projected position of Y */
  yPos: number;

  /** Color string of the point */
  color: string;
}
export interface AxisProjectedValue {
  /** Projected position of X */
  xPos: number;

  /** Original value on X */
  xStrVal: number;

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

  /** X offset for the position of the tooltip */
  xOffset?: number;

  /** Y offset for the position of the tooltip */
  yOffset?: number;
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
  xOffset = 0,
  yOffset = 0,
}: TooltipLayerProps) => {
  const projected = axisProjectedValues[hoveredPoint.index];
  const tooltipItems = projected.groupedY.map(pointY => (
    <TooltipItem
      key={`t-${pointY.yStrVal}`}
      color={pointY.color}
      text={`${pointY.yStrVal}`}
    />
  ));

  return (
    <Tooltip
      graphWidth={graphWidth}
      graphHeight={graphHeight}
      graphMargin={margin}
      position={{
        x: x + xOffset,
        y: y + yOffset,
      }}
      show={hovering}
    >
      <h3>{`${projected.xStrVal}`}</h3>
      {tooltipItems}
    </Tooltip>
  );
};
