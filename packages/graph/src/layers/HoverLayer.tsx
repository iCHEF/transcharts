import * as React from 'react';
import { throttle } from 'lodash-es';
import { localPoint } from '@vx/event';

export interface HoverLayerProps {
  /** Set the information related to hover or touch interactions  */
  setHoveredPosAndIndex: (hoveredIndex: number, xPos: number, yPos: number) => void;

  /** Function to be called before the latest tooltip position is set */
  handleHover: () => void;

  /** Function to hide the tooltip */
  clearHovering: () => void;

  /** Hidden components to detect the mouse or touch interactions */
  collisionComponents: JSX.Element[];

  /** The debounce time for the mouse and touch events */
  throttleTime: number;
}

export class HoverLayer extends React.PureComponent<HoverLayerProps, {}> {
  public static defaultProps = {
    throttleTime: 180,
    handleHover: () => null,
  };

  public animaFrameID: number;

  /** Updates the position of the tooltip and sets the currently active data index */
  private updatePosition = (dataIndex: number, event: React.SyntheticEvent) => {
    const { setHoveredPosAndIndex, handleHover } = this.props;

    // custom action which executes before the position is updated
    handleHover();

    // convert the position of the event to the coordinate system of the SVG
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

  private hideTooltip = () => {
    // cancel the previously thorttled event to prevent the tooltip from reappearing
    this.throttledUpdatePosition.cancel();
    this.props.clearHovering();
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
        onMouseLeave: this.hideTooltip,
      });
    });

    return (
      // Render areas to detect collisions of mouse pointers or touches with data points
      detectionAreas
    );
  }
}
