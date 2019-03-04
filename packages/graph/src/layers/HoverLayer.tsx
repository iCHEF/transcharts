import React, { FunctionComponent, useCallback } from 'react';
import { throttle } from 'lodash-es';
import { localPoint } from '@vx/event';

import { useAnimationFrame } from '../hooks/useAnimationFrame';

import { DataLayerRenderParams } from './DataLayer';

export interface HoverLayerProps {
  /** Set the information related to hover or touch interactions  */
  setHoveredPosAndIndex: DataLayerRenderParams['setHoveredPosAndIndex'];

  /** Function to be called before the latest tooltip position is set */
  handleHover: () => void;

  /** Function to hide the tooltip */
  clearHovering: () => void;

  /**
   * Hidden components to detect the mouse or touch interactions.
   * **Note:** The order of the components should correspond to the order of the data.
   */
  collisionComponents: JSX.Element[];

  /** The throttle time for the mouse and touch events */
  throttleTime: number;
}

export const HoverLayer: FunctionComponent<HoverLayerProps> = ({
  setHoveredPosAndIndex,
  handleHover= () => null,
  clearHovering,
  collisionComponents,
  throttleTime = 180,
}) => {
  /** use requestAnimationFrame to schedule updates of hovered position and data index */
  const { requestWindowAnimationFrame } = useAnimationFrame();

  /** Function to update the position of the tooltip and sets the currently active data index */
  const updatePosition = useCallback(
    throttle(
      (dataIndex: number, event: React.SyntheticEvent) => {
        // custom action which executes before the position is updated
        handleHover();

        // convert the position of the event to the coordinate system of the SVG
        const { x, y } = localPoint(event);
        requestWindowAnimationFrame(() => {
          setHoveredPosAndIndex(
            dataIndex,
            x,
            y,
          );
        });
      },
      throttleTime,
    ),
    [handleHover, setHoveredPosAndIndex, throttleTime],
  );

  /** Function to keep the event data and perform throttled updates of the position */
  const handleTooltip = useCallback(
    (dataIndex: number) => (event: React.SyntheticEvent) => {
      // removes it from the event pool and allows references to the event
      event.persist();
      updatePosition(dataIndex, event);
    },
    [updatePosition],
  );

  /** Function to cancel the update of position and disable the hovering state */
  const hideTooltip = useCallback(
    () => {
      // cancel the previously thorttled event to prevent the tooltip from reappearing
      updatePosition.cancel();
      clearHovering();
    },
    [updatePosition, clearHovering],
  );

  const detectionAreas = collisionComponents.map((area: JSX.Element, dataIndex: number) => {
    const handleCurrentTooltip = handleTooltip(dataIndex);
    return React.cloneElement(area, {
      onTouchStart: handleCurrentTooltip,
      onTouchMove: handleCurrentTooltip,
      onMouseMove: handleCurrentTooltip,
      onMouseLeave: hideTooltip,
    });
  });

  // Render areas to detect collisions of mouse pointers or touches with data points
  return (
    <>
      {detectionAreas}
    </>
  );
};
