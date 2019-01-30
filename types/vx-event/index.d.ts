declare module '@vx/event' {
  interface Point {
    x: number;
    y: number;
  }

  function localPoint(event: React.SyntheticEvent): Point;
  function localPoint(node: React.ReactNode, event: React.SyntheticEvent): Point;
}
