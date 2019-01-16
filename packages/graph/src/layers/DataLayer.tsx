import { extent as d3Extent } from 'd3-array';
import {
  scaleLinear,
  ScaleLinear,
  scalePoint,
  ScalePoint,
  scaleTime,
  ScaleTime
} from 'd3-scale';
import memoizeOne from 'memoize-one';
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
   * it should match the inner width and height of the graph
   */
  range: [number, number];

  /**
   * d3's Scaling function employed in this axis
   */
  d3Scale: ScalePoint<any> | ScaleTime<any, any> | ScaleLinear<any, any>; // d3 scale function
}

export interface DataLayerProps {
  width: number;
  height: number;
  data: object[];
  scaleX: Scale;
  scaleY: Scale;
  fieldsX: Field[];
  fieldsY: Field[];
  children: (
    dimension: {
      xAxis: Axis;
      yAxis: Axis;
    }
  ) => React.ReactNode;
}

export interface DataLayerState {
  activeDataIndices: number[];
}

function getAxisConfig(
  min: number,
  max: number,
  data: object[],
  scale: Scale,
  fields: Field[]
): Axis {
  const range: Axis['range'] = [min, max];

  const dataVals: any[] = [];
  fields.forEach(({ name }) => {
    data.forEach(row => {
      const val = row[name];
      if (val !== undefined && val !== null) {
        dataVals.push(val);
      }
    });
  });

  let domain: Axis['domain'];
  let d3Scale: Axis['d3Scale'];

  switch (scale.type) {
    case 'point': {
      domain = dataVals;
      d3Scale = scalePoint()
        .domain(domain)
        .range(range);
      break;
    }
    case 'time': {
      domain = d3Extent(dataVals.map(time => new Date(time)));
      d3Scale = scaleTime()
        .domain(domain)
        .range(range);
      break;
    }
    case 'linear': {
      domain = d3Extent(dataVals);
      d3Scale = scaleLinear()
        .domain(domain)
        .range(range);
      break;
    }
    default:
      // TODO: unify the way handling the errors
      throw new Error('Unsupported scale type');
  }

  return {
    fields,
    range,
    domain,
    d3Scale
  };
}

export class DataLayer extends React.PureComponent<
  DataLayerProps,
  DataLayerState
> {
  public state: DataLayerState = {
    activeDataIndices: []
  };

  private getXYAxes = memoizeOne(
    (width, height, data, scaleX, scaleY, fieldsX, fieldsY) => {
      return {
        xAxis: getAxisConfig(0, width, data, scaleX, fieldsX),
        yAxis: getAxisConfig(height, 0, data, scaleY, fieldsY)
      };
    }
  );

  public render() {
    const {
      width,
      height,
      data,
      scaleX,
      scaleY,
      fieldsX,
      fieldsY,
      children
    } = this.props;
    const { xAxis, yAxis } = this.getXYAxes(
      width,
      height,
      data,
      scaleX,
      scaleY,
      fieldsX,
      fieldsY
    );
    return children({ xAxis, yAxis });
  }
}
