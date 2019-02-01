import * as React from 'react';
import { throttle } from 'lodash-es';
import { localPoint } from '@vx/event';

export interface HoverLayerProps {
  /** Set the information related to hover or touch interactions  */
  setHoveredPosAndIndex: (hoveredIndex: number, xPos: number, yPos: number) => void;

  /** Hidden components to detect the mouse or touch interactions */
  collisionComponents: JSX.Element[];

  /** The debounce time for the mouse and touch events */
  throttleTime: number;
}

export class HoverLayer extends React.PureComponent<HoverLayerProps, {}> {
  public static defaultProps = {
    throttleTime: 100,
  };

  public animaFrameID: number;

  /** Updates the position of the tooltip and sets the currently active data index */
  private updatePosition = (dataIndex: number, event: React.SyntheticEvent) => {
    const { setHoveredPosAndIndex } = this.props;
    // TODO: integrate `localPoint` of vx
    const { x, y } = localPoint(event);
    this.animaFrameID = window.requestAnimationFrame(() => {
      setHoveredPosAndIndex(
        dataIndex,
        x,
        y,
      );
    });
  };

  private throttledUpdatePosition = throttle(this.updatePosition, this.props.throttleTime);

  private handleTooltip = (dataIndex: number) => (event: React.SyntheticEvent) => {
    // removes it from the event pool and allows references to the event
    event.persist();
    this.throttledUpdatePosition(dataIndex, event);
  };

  public componentWillUnmount() {
    window.cancelAnimationFrame(this.animaFrameID);
  }

  public render() {
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
      // Render areas to detect collisions of mouse pointers or touches with data points
      detectionAreas
    );
  }
}
