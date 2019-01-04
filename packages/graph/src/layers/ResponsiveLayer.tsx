import * as React from "react";

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

    constructor(props: ResponsiveProps) {
      super(props);
      this.state = {
        width: 0,
        height: 0,
      };
    }

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
            style={{ ...style, width: '100%', height: '100%' }}
            className={className}
            {...restProps}
          >
            {children({width, height })}
          </div>
        );
    }
}
