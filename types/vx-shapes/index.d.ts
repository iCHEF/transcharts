declare module '@vx/shape' {

  interface LinePath {
    innerRef?: HTMLInputElement;
    data: object[];
    curve?: any;
    defined?: any;
    x: ((d: any) => any) | number;
    y: ((d: any) => any) | number;
    stroke?: string;
    strokeWidth?: number;
    strokeLinecap?: string;
    strokeLinejoin?: string;
  }
  const LinePath: React.ComponentType<LinePath>;
}
