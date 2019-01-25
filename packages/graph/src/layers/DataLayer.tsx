import * as React from 'react';
import { extent as d3Extent } from 'd3-array';
import {
  scaleLinear,
  scalePoint,
  scaleTime,
} from 'd3-scale';
import memoizeOne from 'memoize-one';

import { Scale, DataField, AxisConfig } from '../common/types';

export interface DataLayerAxes {
  xAxis: AxisConfig;
  yAxis: AxisConfig;
}

export interface DataLayerProps {
  /** Width of the inner graph */
  width: number;

  /** height of the inner graph */
  height: number;

  /**
   * Data for computing the axis config.
   * If there are multiple fields appear in the axes (like multi-series line charts),
   * then all of the data related to the fields will be included in the computations
   * @example [{ x: 1, y: 0 }, { x: 0, y: 1 }, ...]
   */
  data: object[];

  /** Scale config of the x-axis */
  scaleX: Scale;

  /** Scale config of the y-axis */
  scaleY: Scale;

  /** DataFields of the x-axis */
  fieldsX: DataField[];

  /** DataFields of the y-axis */
  fieldsY: DataField[];

  /** Render props with the computed configurations for the axes */
  children: (axes: DataLayerAxes) => React.ReactNode;
}

export interface DataLayerState {
  /** TODO: records the indices of data selected by users from the interaction layer */
  activeDataIndices: number[];
}

/**
 * Computes and returns the configurations for the axis,
 * such as its range and d3 scale functions
 */
function getAxisConfig(
  min: number,
  max: number,
  data: object[],
  scale: Scale,
  fields: DataField[],
): AxisConfig {
  const range: AxisConfig['range'] = [min, max];

  const dataVals: any[] = [];
  fields.forEach(({ name }) => {
    data.forEach((row) => {
      const val = row[name];
      if (val !== undefined && val !== null) {
        dataVals.push(val);
      }
    });
  });

  let domain: AxisConfig['domain'];
  let d3Scale: AxisConfig['d3Scale'];
  let getValue = (val: any) => val;

  switch (scale.type) {
    case 'point': {
      domain = dataVals;
      d3Scale = scalePoint().domain(domain).range(range);
      break;
    }
    case 'time': {
      // TODO: think out a way to deal with the date type
      getValue = (val: string) => new Date(val);
      domain = d3Extent(dataVals.map(time => getValue(time)));
      d3Scale = scaleTime().domain(domain).range(range);
      break;
    }
    case 'linear': {
      domain = d3Extent(dataVals);
      d3Scale = scaleLinear().domain(domain).range(range);
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
    d3Scale,
    getValue,
  };
}

/**
 * The layer is responsible for computing axis data in order to draw a graph
 */
export class DataLayer extends React.PureComponent<
  DataLayerProps,
  DataLayerState
> {
  public state: DataLayerState = {
    activeDataIndices: [],
  };

  private getXYAxes = memoizeOne(
    (width, height, data, scaleX, scaleY, fieldsX, fieldsY) => {
      return {
        xAxis: getAxisConfig(0, width, data, scaleX, fieldsX),
        yAxis: getAxisConfig(height, 0, data, scaleY, fieldsY),
      };
    },
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
      children,
    } = this.props;
    const { xAxis, yAxis } = this.getXYAxes(
      width,
      height,
      data,
      scaleX,
      scaleY,
      fieldsX,
      fieldsY,
    );
    return children({ xAxis, yAxis });
  }
}
