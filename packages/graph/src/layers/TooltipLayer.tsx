import * as React from 'react';
import { localPoint } from '@vx/event';

import { Margin } from '../common/types';

export interface TooltipLayerProps {
  /** Margin between the inner graph area and the outer svg */
  margin: Margin;

  /** Hidden components to detect the mouse or touch interactions */
  collisionComponents: JSX.Element[];
}

export interface TooltipLayerState {
  /** X position of the tooltip relative to the position of the inner graph */
  xPos: number;

  /** Y position of the tooltip relative to the position of the inner graph */
  yPos: number;
}

export class TooltipLayer extends React.Component<
  TooltipLayerProps,
  TooltipLayerState
> {
  public static defaultProps = {
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };

  public state: TooltipLayerState = {
    xPos: 0,
    yPos: 0,
  };

  private handleTooltip = (dataIndex: number) => (event: MouseEvent | TouchEvent) => {
    const { margin } = this.props;
    const { left, top } = margin;
    // TODO: integrate `localPoint` of vx
    const { x, y } = localPoint(event);
    console.log('node.createSVGPoint', localPoint(event), x - left, y - top)
    this.setState({
      xPos: x - left,
      yPos: y - top,
    });
    // this.context.setActiveDataIndex(dataIndex);
  };

  public render() {
    const { activeDataIndex } = this.context;
    const { collisionComponents } = this.props;
    const detectionAreas = collisionComponents.map((area: JSX.Element, dataIndex: number) => {
      const handleCurrentTooltip = this.handleTooltip(dataIndex);
      return React.cloneElement(area, {
        onTouchStart: handleCurrentTooltip,
        onTouchMove: handleCurrentTooltip,
        onMouseMove: handleCurrentTooltip,
      });
    });

    return (
      <>
        {/* Render areas to detect collisions of mouse pointers or touches with data points */}
        {detectionAreas}
      </>
    );
  }
}
