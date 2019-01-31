import * as React from 'react';
import { debounce } from 'lodash-es';
import resizeObserverPolyfill from 'resize-observer-polyfill';

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

interface ResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
}

export class ResponsiveLayer extends React.Component<
  ResponsiveProps,
  ResponsiveState
> {
  public static defaultProps: ResponsiveProps = {
    debounceTime: 300,
    children: () => null,
  };
  public resizeObsr: ResizeObserver;
  public animaFrameID: number;

  public state: ResponsiveState = {
    width: 0,
    height: 0,
  };

  private layerRef = React.createRef<HTMLDivElement>();

  private resize = (
    entries: ResizeObserverEntry[],
    observer: ResizeObserver,
  ) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      this.updateDimension(width, height);
    }
  };

  private debouncedResize = debounce(this.resize, this.props.debounceTime);

  private updateDimension = (width: number, height: number) => {
    this.animaFrameID = window.requestAnimationFrame(() => {
      this.setState({
        width,
        height,
      });
    });
  };

  public componentDidMount() {
    const layerNode = this.layerRef.current;
    this.resizeObsr = new resizeObserverPolyfill(this.debouncedResize);
    this.resizeObsr.observe(layerNode!);
  }

  public componentWillUnmount() {
    window.cancelAnimationFrame(this.animaFrameID);
    this.resizeObsr.disconnect();
  }

  public render() {
    const {
      className,
      style,
      children,
      debounceTime,
      ...restProps
    } = this.props;
    const { width, height } = this.state;

    return (
      <div
        ref={this.layerRef}
        style={{ ...style, width: '100%', height: '100%' }}
        className={className}
        {...restProps}
      >
        {children({ width, height })}
      </div>
    );
  }
}
