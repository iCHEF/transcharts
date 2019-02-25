/**
 * Fix the error (error TS2304: Cannot find name 'ResizeObserver')
 * which appears when compiling other packages which use the `graph` package
 * Ref: https://github.com/ant-design/ant-design/issues/13405#issuecomment-443658164
 */

interface ResizeObserver {
  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
}

interface ResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
}
