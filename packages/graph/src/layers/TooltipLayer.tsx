import * as React from 'react';

import { Margin, HoveringState, HoveredPointState } from '../common/types';
import { Tooltip } from '../tooltip/Tooltip';
import { TooltipItem } from '../tooltip/TooltipItem';
export interface GroupedY {
  /** Index of `dataGroups` */
  groupIdx: number;

  /** Original value (normally on y-axis) */
  projectedStrVal: number;

  /** Projected position (normally on y-axis) */
  projectedPos: number;

  /** Color string of the point */
  color: string;
}
export interface AxisProjectedValue {
  /** Projected position of the base axis (normally x-axis) */
  basePos: number;

  /** Original value on the base axis (normally x-axis) */
  baseStrVal: number;

  /** Corresponding data in `dataGroups` */
  projectedVals: GroupedY[];
}

export interface TooltipLayerProps {
  hovering: HoveringState;
  hoveredPoint: HoveredPointState;
  drawFromXAxis?: boolean;
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
  drawFromXAxis = true,
  axisProjectedValues,
  graphWidth,
  graphHeight,
  margin,
  x = drawFromXAxis
    ? axisProjectedValues[hoveredPoint.index].basePos + margin.left
    : hoveredPoint.position.x,
  y = drawFromXAxis
    ? hoveredPoint.position.y
    : axisProjectedValues[hoveredPoint.index].basePos + margin.top,
  xOffset = 0,
  yOffset = 0,
}: TooltipLayerProps) => {
  const projected = axisProjectedValues[hoveredPoint.index];
  const tooltipItems = projected.projectedVals.map(pointY => (
    <TooltipItem
      key={`t-${pointY.projectedStrVal}`}
      color={pointY.color}
      text={`${pointY.projectedStrVal}`}
    />
  ));

  return (
    <Tooltip
      graphWidth={graphWidth}
      graphHeight={graphHeight}
      position={{
        x: x + xOffset,
        y: y + yOffset,
      }}
      show={hovering}
    >
      <h3>{`${projected.baseStrVal}`}</h3>
      {tooltipItems}
    </Tooltip>
  );
};
