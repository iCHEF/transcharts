import { useState } from 'react';

export interface HoverState {
  /** Records whether there is mouse or touch event generating from the inner layer */
  hovering: boolean;

  /** The position of the point being hovered and its mapped index of data  */
  hoveredPoint: {
    /** The index of data being hovered or touched */
    index: number;

    /** The mouse hovered or touched position */
    position: {
      x: number;
      y: number;
    };
  };
}

export function useHoverState() {
  const [hoverState, setState] = useState({
    hovering: false,
    hoveredPoint: {
      index: 0,
      position: {
        x: 0,
        y: 0,
      },
    },
  });

  const clearHovering = () => {
    setState({ ...hoverState, hovering: false });
  };

  const setHoveredPosAndIndex = (hoveredIndex: number, xPos: number, yPos: number) => {
    setState({
      hovering: true,
      hoveredPoint: {
        index: hoveredIndex,
        position: {
          x: xPos,
          y: yPos,
        },
      },
    });
  };
  return {
    ...hoverState,
    clearHovering,
    setHoveredPosAndIndex,
  };
}
