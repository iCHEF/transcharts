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

export interface AxisScale {
  /** d3's Scaling function employed in this axis */
  scale: ScalePoint<any> | ScaleTime<any, any> | ScaleLinear<any, any>; // d3 scale function

  /** scale type string */
  scaleType: string;

  /** field for axis */
  field: string;
  /** data type */
  type: string;

  /*  Domain of the axis: [min, max] */
  domain: any[];

  /**
   * Range of the axis: [min, max]
   * it should match the inner width and height of the graph
   */
  range: [number, number];

  /** Returns the formatted value according to the type of the axis */
  getValue: (val: any) => any;

  selector: FieldSelector;
}

export interface Encoding {
  field: string;
  type: 'nominal' | 'ordinal' | 'quantitative' | 'temporal';
  scale?: 'point' | 'time' | 'linear';
}

export type AxisEncoding = Encoding;

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
