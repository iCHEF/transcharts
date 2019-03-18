import {
  ScaleLinear,
  ScalePoint,
  ScaleTime,
  ScaleBand,
} from 'd3-scale';

export interface FieldSelector {
  getOriginalVal: (record: object) => any;
  getScaledVal: (record: object) => any;
  getFormattedStringVal: (record: object) => string;
}

export interface GraphDimension {
  width: number;
  height: number;
}

export type ScaleType = 'point'
| 'time'
| 'linear'
| 'band'
| 'ordinal'
| 'sequential';

export interface Scale {
  /** d3's Scaling function employed in specific channel */
  scale: (...values: any[]) => any;

  /** scale type string */
  scaleType: ScaleType;

  /** field for axis */
  field: string;

  /** data type */
  type: string;

  /** Domain of input channel */
  domain: any[];

  /**
   * Range of input channel
   */
  range?: ReadonlyArray<any>;
}

export interface AxisScale extends Scale {
  /** d3's Scaling function employed in this axis */
  scale: ScalePoint<any>
    | ScaleTime<any, any>
    | ScaleLinear<any, any>
    | ScaleBand<any>; // d3 scale function

  /**
   * Range of the axis: [min, max]
   * it should match the inner width and height of the graph
   */
  range?: [number, number];
}

export type EncodingDataType = 'nominal' | 'ordinal' | 'quantitative' | 'temporal';
export interface ColorScale extends Scale {
  range?: [string, string] | ReadonlyArray<string>;
}

export interface Encoding {
  field: string;
  type: EncodingDataType;
  scale?: string;

  /** Extra configurations to generate D3 scale */
  scaleConfig?: {
    padding?: number;
    paddingInner?: number;
    paddingOuter?: number;
  };
}

export interface AxisEncoding extends Encoding {
  scale?: ScaleType;
}

export interface LegendConfig {
  /** direction of label  */
  direction?: 'horizontal' | 'vertical';
  /** where we put legend */
  orient?: 'top' | 'right' | 'bottom' | 'left';
  /** hide legend or not, default is false */
  hide?: boolean;
  /**
   * render props of that legend, default is null
   * which will make <Legend> render default legend.
   */
  render?: (labels: ReadonlyArray<object>) => React.ReactNode;
}

export interface ColorEncoding extends Encoding {
  legend?: LegendConfig;
}

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface AxisTheme {
  /** color of stroke */
  strokeColor: string;
  /** color of ticke stroke */
  tickStrokeColor: string;
  /** width of stroke */
  strokeWidth: number;
  /** font size of tick */
  tickFontSize: number;
}

export interface Theme {
  /** common colors */
  colors: {
    /** colors used for nominal data */
    category: ReadonlyArray<string>;
    sequential: {
      scheme: ReadonlyArray<ReadonlyArray<string>>;
      interpolator: (val: number) => string;
    }
  };
  /** x-axis theme config */
  xAxis: AxisTheme;
  /** y-axis theme config */
  yAxis: AxisTheme;
}

export type HoveringState = boolean;
export interface HoveredPointState {
  /** The index of data being hovered or touched */
  index: number;

  /** The mouse hovered or touched position */
  position: {
    x: number;
    y: number;
  };
}
