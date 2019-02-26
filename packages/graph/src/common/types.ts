import {
  ScaleLinear,
  ScalePoint,
  ScaleTime,
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

export interface Scale {
  /** d3's Scaling function employed in specific channel */
  scale: (...values: any[]) => any;

  /** scale type string */
  scaleType: string;

  /** field for axis */
  field: string;

  /** data type */
  type: string;

  /** Domain of input channel */
  domain: any[];

  /**
   * Range of input channel
   */
  range: [any, any];

  /** Returns the formatted value according to the type of the axis */
  getValue: (val: any) => any;

  selector: FieldSelector;
}

export type AxisScaleType = 'point' | 'time' | 'linear';

export interface AxisScale extends Scale {
  /** d3's Scaling function employed in this axis */
  scale: ScalePoint<any> | ScaleTime<any, any> | ScaleLinear<any, any>; // d3 scale function

  /** scale type string */
  scaleType: AxisScaleType;

  /**
   * Range of the axis: [min, max]
   * it should match the inner width and height of the graph
   */
  range: [number, number];
}

export type EncodingDataType = 'nominal' | 'ordinal' | 'quantitative' | 'temporal';

export interface Encoding {
  field: string;
  type: EncodingDataType;
  scale?: string;
}

export interface AxisEncoding extends Encoding {
  scale?: AxisScaleType;
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
  };
  /** x-axis theme config */
  xAxis: AxisTheme;
  /** y-axis theme config */
  yAxis: AxisTheme;
}
