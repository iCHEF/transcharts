import { useState } from 'react';

export type HoveringState = boolean;
export interface HoveredPointState {
  /** The index of data being hovered or touched */
  index: number;

  /** The mouse hovered or touched position */
  position: {
    x: number;
    y: number;
  };
};

export interface HoverState {
  /** Records whether there is mouse or touch event generating from the inner layer */
  hovering: boolean;

  /** The position of the point being hovered and its mapped index of data  */
  hoveredPoint: HoveredPointState
}

export function useHoverState() {
  const [hovering, setHovering] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState({
    index: 0,
    position: {
      x: 0,
      y: 0,
    },
  });

  const clearHovering = () => {
    setHovering(false);
  };

  const setHoveredPosAndIndex = (hoveredIndex: number, xPos: number, yPos: number) => {
    setHovering(true);
    setHoveredPoint({
      index: hoveredIndex,
      position: {
        x: xPos,
        y: yPos,
      },
    });
  };

  return {
    hovering,
    hoveredPoint,
    clearHovering,
    setHoveredPosAndIndex,
  };
}
