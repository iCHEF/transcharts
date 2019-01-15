import { scaleLinear, scalePoint, scaleTime } from '@vx/scale';
import { extent as d3Extent } from 'd3-array';
import * as d3Scale from 'd3-scale';
import * as React from 'react';

export interface Scale {
  type: 'point' | 'time' | 'linear';
}

export interface Field {
  /**
   * Name of the field, which corresponds to the field name in the data
   */
  name: string;
  color: string; // TODO: accept a function?: (index, value) => {...}
}

export interface Axis {
  /**
   * List of fields appear in this axis
   */
  fields: Field[];

  /**
   * Domain of the axis: [min, max]
   */
  domain: any[];

  /**
   * Range of the axis: [min, max]
   */
  range: any[];

  /**
   * d3's Scaling function employed in this axis
   */
  d3Scale: d3Scale.ScaleContinuousNumeric<number[], number>; // d3 scale function
}

export interface DataLayerProps {
  width: number;
  height: number;
  data: object[];
  scaleX: Scale;
  scaleY: Scale;
  fieldsX: Field[];
  fieldsY: Field[];
  children: (dimension: { width: number; height: number }) => React.ReactNode;
}

export interface DataLayerState {
  activeDataIndices: number[];
  xAxis: Axis;
  yAxis: Axis;
}

function getAxisConfig(min: number, max: number, data: object[], scale: Scale, fields: Field[]): Axis {
  const range = [min, max];
  const fieldsAndRange = {
    fields,
    range,
  };
  const dataVals: any[] = [];
  fields.forEach(({name}) => {
    const val = data[name];
    if (val) {
      dataVals.push(val)
    }
  });

  switch(scale.type) {
    case 'point': {
      const domain = dataVals;
      return {
        ...fieldsAndRange,
        domain,
        d3Scale: scalePoint({domain, range }),
      };
    }
    case 'time': {
      const domain = d3Extent(dataVals.map(time => new Date(time)));
      return {
        ...fieldsAndRange,
        domain,
        d3Scale: scaleTime({domain, range }),
      };
    }
    case 'linear': {
      const domain = d3Extent(dataVals);
      return {
        ...fieldsAndRange,
        domain,
        d3Scale: scaleLinear({domain, range }),
      };
    }
    default:
      throw new Error('Unsupported scale type');
  }
}

export class DataLayer extends React.Component<
  DataLayerProps,
  DataLayerState
> {
  public constructor(props: DataLayerProps) {
    super(props);
    const {
      width,
      height,
      data,
      scaleX,
      scaleY,
      fieldsX,
      fieldsY,
     } = this.props;
    this.state = {
      activeDataIndices: [],
      xAxis: getAxisConfig(0, width, data, scaleX, fieldsX),
      yAxis: getAxisConfig(height, 0, data, scaleY, fieldsY),
    };
  }

}
