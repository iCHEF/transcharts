import * as React from 'react';

import { Margin, FieldSelector } from '../common/types';
import { Tooltip } from '../tooltip/Tooltip';
import { TooltipItem } from '../tooltip/TooltipItem';

import { DataLayerRenderParams } from './DataLayer';

export interface TooltipLayerProps {
  hovering: DataLayerRenderParams['hovering'];
  hoveredPoint: DataLayerRenderParams['hoveredPoint'];
  data: object[];
  graphWidth: number;
  graphHeight: number;
  margin: Margin;
  xSelector: FieldSelector;
  ySelector: FieldSelector;
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
      {/* TODO: unify the way of dealing colors of the fields */}
      <TooltipItem color="#ff7049" text={ySelector.getFormattedStringVal(data[index])} />
    </Tooltip>
  );
};
