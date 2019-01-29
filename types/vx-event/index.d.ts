declare module '@vx/event' {
  interface Point {
    x: number;
    y: number;
  }

  function localPoint(event: UIEvent): Point;
  function localPoint(node: React.ReactNode, event: UIEvent): Point;
}
