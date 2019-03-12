import { useState, useCallback } from 'react';

import { HoveredPointState, HoveringState } from '../common/types';

export interface HoverState {
  /** Records whether there is mouse or touch event generating from the inner layer */
  hovering: HoveringState;

  /** The position of the point being hovered and its mapped index of data  */
  hoveredPoint: HoveredPointState;
}

export interface HoverStateControls extends HoverState {
  /** set `hovering` as false; it should be called after the mouse left the `<HoverLayer>`. */
  clearHovering: () => void;
  /** set current hovered position and data index */
  setHoveredPosAndIndex: (hoveredIndex: number, xPos: number, yPos: number) => void;
}

export function useHoverState(): HoverStateControls {
  const [hovering, setHovering] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState({
    index: 0,
    position: {
      x: 0,
      y: 0,
    },
  });

  const clearHovering = useCallback(
    () => {
      setHovering(false);
    },
    [],
  );

  const setHoveredPosAndIndex = useCallback(
    (hoveredIndex: number, xPos: number, yPos: number) => {
      setHovering(true);
      setHoveredPoint({
        index: hoveredIndex,
        position: {
          x: xPos,
          y: yPos,
        },
      });
    },
    [],
  );

  return {
    hovering,
    hoveredPoint,
    clearHovering,
    setHoveredPosAndIndex,
  };
}
