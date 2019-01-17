declare module '@vx/shape' {
  import React from 'react';

  interface LinePath {
    innerRef: any;
    data: any[];
    curve: any;
    defined: any;
    x: any;
    y: any;
  }

  const LinePath: React.ComponentType<LinePath>;
}
