import * as React from 'react';
import { throttle } from 'lodash-es';
import { localPoint } from '@vx/event';

import { Margin } from '../common/types';

export interface TooltipLayerProps {
  /** Margin between the inner graph area and the outer svg */
  margin: Margin;

  /** Hidden components to detect the mouse or touch interactions */
  collisionComponents: JSX.Element[];

  /** The debounce time for the mouse and touch events */
  debounceTime: number;
}

export interface TooltipLayerState {
  /** X position of the tooltip relative to the position of the inner graph */
  xPos: number;

  /** Y position of the tooltip relative to the position of the inner graph */
  yPos: number;
}

export class TooltipLayer extends React.PureComponent<
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
    debounceTime: 30,
  };

  public animaFrameID: number;

  public state: TooltipLayerState = {
    xPos: 0,
    yPos: 0,
  };

  /** Updates the position of the tooltip and sets the currently active data index */
  private updatePosition = (dataIndex: number, event: React.SyntheticEvent) => {
    const { margin } = this.props;
    const { left, top } = margin;
    // TODO: integrate `localPoint` of vx
    const { x, y } = localPoint(event);
    console.log(x - left, y - top)
    this.animaFrameID = window.requestAnimationFrame(() => {
      this.setState({
        xPos: x - left,
        yPos: y - top,
      });
    });
    // this.context.setActiveDataIndex(dataIndex);
  };

  private throttledUpdatePosition = throttle(this.updatePosition, this.props.debounceTime);

  private handleTooltip = (dataIndex: number) => (event: React.SyntheticEvent) => {
    // removes it from the event pool and allows references to the event
    event.persist();
    this.throttledUpdatePosition(dataIndex, event);
  };

  public componentWillUnmount() {
    window.cancelAnimationFrame(this.animaFrameID);
  }

  public render() {
    const { activeDataIndex } = this.context;
    const { collisionComponents, debounceTime } = this.props;
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
