import * as React from "react";
import { debounce } from "lodash-es";

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
    static defaultProps: ResponsiveProps = {
      debounceTime: 300,
      children: () => null,
    };

    state: ResponsiveState = {
      width: 0,
      height: 0,
    };

    private layerRef = React.createRef<HTMLDivElement>();

    componentDidMount() {
      this._resize();
      window.addEventListener('resize', this._debouncedResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this._debouncedResize);
    }

    private _resize = () => {
      const layerNode = this.layerRef.current;
      if (layerNode) {
        const boundingRect: ClientRect =  layerNode.getBoundingClientRect();
        const { width, height } = boundingRect;
        this.setState({
          width,
          height,
        });
      }
    };

    private _debouncedResize = debounce(this._resize, this.props.debounceTime);

    render() {
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
