import { debounce } from 'lodash-es';
import * as React from 'react';

export interface ResponsiveState {
  width: number;
  height: number;
}

export interface ResponsiveProps {
  className?: string;
  style?: React.CSSProperties;
  debounceTime?: number;
  children: (nodeSize: {width: number, height: number}) => React.ReactNode;
}

export class ResponsiveLayer extends React.Component<ResponsiveProps, ResponsiveState> {
  public static defaultProps: ResponsiveProps = {
    debounceTime: 300,
    children: () => null,
  };

  public state: ResponsiveState = {
    width: 0,
    height: 0,
  };

  private layerRef = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.debouncedResize);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedResize);
  }

  private resize = () => {
    const layerNode = this.layerRef.current;
    if (layerNode) {
      const boundingRect: ClientRect =  layerNode.getBoundingClientRect();
      const { width, height } = boundingRect;
      this.setState({
        width,
        height,
      });
    }
  }

  private debouncedResize = debounce(this.resize, this.props.debounceTime);

  public render() {
    const {
          className,
          style,
          children,
          debounceTime,
          ...restProps
        } = this.props;
    const {
          width,
          height,
        } = this.state;

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
