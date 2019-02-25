import React, { FunctionComponent, useRef } from 'react';

import { useContainerDimension } from '../hooks/useContainerDimension';

export interface ResponsiveState {
  width: number;
  height: number;
}

export interface ResponsiveProps {
  className?: string;
  style?: React.CSSProperties;
  debounceTime?: number;
  children: (dimension: { width: number; height: number }) => React.ReactNode;
}

export const ResponsiveLayer: FunctionComponent<ResponsiveProps> = ({
  className,
  style,
  children,
  debounceTime,
  ...restProps
}) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const dimension = useContainerDimension(layerRef);

  return (
    <div
      ref={layerRef}
      style={{ ...style, width: '100%', height: '100%', position: 'relative' }}
      className={className}
      {...restProps}
    >
      {children(dimension)}
    </div>
  );
};
