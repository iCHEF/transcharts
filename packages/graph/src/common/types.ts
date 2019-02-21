import {
  ScaleLinear,
  ScalePoint,
  ScaleTime,
} from 'd3-scale';

/**
 * Name of the scale which should be consistent with the naming of d3 fuctions.
 * Ref: https://github.com/d3/d3-scale#api-reference
 */
export interface Scale {
  type: 'point' | 'time' | 'linear';
}

/**
 * Stores the name and other configurations for the fields to be painted on the axis.
 * Its name should be the same with the key in the data.
 * e.g., two lines are going to be painted => each line should have its field config
 */
export interface DataField {
  /** Name of the field, which corresponds to the field name in the data */
  name: string;
  /** Custom color config */
  color: string; // TODO: accept a function?: (index, value) => {...}
}

export interface FieldSelector {
  getOriginalVal: (record: object) => any;
  getScaledVal: (record: object) => any;
  getFormattedStringVal: (record: object) => string;
}

export interface AxisConfig {
  /**  List of fields appear in this axis */
  fields: DataField[];

  /*  Domain of the axis: [min, max] */
  domain: any[];

  /**
   * Range of the axis: [min, max]
   * it should match the inner width and height of the graph
   */
  range: [number, number];

  /** Returns the formatted value according to the type of the axis */
  getValue: (val: any) => any;

  /** d3's Scaling function employed in this axis */
  d3Scale: ScalePoint<any> | ScaleTime<any, any> | ScaleLinear<any, any>; // d3 scale function

  scaleConfig: Scale;

  getSelectorsByField: (fieldIndex: number) => FieldSelector;
}

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface Theme {
  colors: {
    category: ReadonlyArray<string>;
  };
};