import React, { FunctionComponent } from 'react';
import { useTransition, animated } from 'react-spring';

import { styled } from '../utils/styled-components';

export interface TooltipProps {
  position: {
    x: number;
    y: number;
  };
  show: boolean;
  children: React.ReactNode;
  graphWidth: number;
  graphHeight: number;
}

const TooltipWrapper = styled.div`
  display: table;
  position: absolute;
  min-width: 3rem;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1.2rem;
  border-radius: 5px;
  font-size: 1rem;
  white-space: nowrap;
  top: 0;
  left: 0;
  pointer-events: none;
  transition: all 500ms linear;
  box-shadow: 0px 2px 8px 3px rgba(120,120,120,0.3);

  h3 {
    color: #7c8a94;
    margin: 0.15rem 0 0.4rem 0.1rem;
    font-size: 1.1rem;
  }
`;

/**
 * Returns the position and transform
 * which limit the tooltip within the bound of the graph
 */
function getTooltipPosition(
  graphWidth: TooltipProps['graphWidth'],
  graphHeight: TooltipProps['graphHeight'],
  position: TooltipProps['position'],
) {
  const onRightHalf = (position.x / graphWidth) > 0.5;
  const percentX = onRightHalf ? -100 : 0;
  const percentY = Math.round(-80 * (position.y / graphHeight));
  const xOffset = onRightHalf ? -16 : 16;
  return {
    top: `${position.y}px`,
    left: `${position.x + xOffset}px`,
    transform: `translate(${percentX}%, ${percentY}%)`,
    transition: 'all 150ms ease',
  };
}

export const Tooltip: FunctionComponent<TooltipProps> = ({
  position,
  children,
  show = false,
  graphWidth,
  graphHeight,
}) => {
  if (!position) {
    return null;
  }

  const tooltipStyle = getTooltipPosition(graphWidth, graphHeight, position);

  const transition = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    unique: true,
  });

  // use transition to control the mounting/unmounting of Tooltip
  return (
    <>
      {transition.map(({ item, key, props }) => (
        item && (
          <animated.div key={key} style={{ ...props, transition: 'opacity 300ms ease-out' }}>
            <TooltipWrapper style={tooltipStyle}>
              {children}
            </TooltipWrapper>
          </animated.div>
        )
      ))}
    </>
  );
};
