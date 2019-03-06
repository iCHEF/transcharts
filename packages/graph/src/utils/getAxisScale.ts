import { extent as d3Extent } from 'd3-array';
import {
  scaleLinear,
  scalePoint,
  scaleTime,
} from 'd3-scale';

import { AxisScale, AxisEncoding } from '../common/types';

import { getRecordFieldSelector } from './getRecordFieldSelector';

export interface GetAxisScaleArgs {
  data: object[];
  encoding: AxisEncoding;
  axisLength: number;
}

/**
 * Computes and returns the configurations for the axis,
 * such as its domain, range and d3 scale functions
 */
export function getAxisScale(
  min: number,
  max: number,
  data: object[],
  encoding: AxisEncoding,
): AxisScale {
  const range: AxisScale['range'] = [min, max];
  const { field, type } = encoding;

  const dataVals: any[] = [];
  data.forEach((row) => {
    const val = row[field];
    if (val !== undefined && val !== null) {
      dataVals.push(val);
    }
  });

  let domain: AxisScale['domain'];
  let scale;
  const scaleType = encoding.scale || 'linear';
  let getValue = (val: any) => val;

  switch (scaleType) {
    case 'point': {
      domain = dataVals;
      scale = scalePoint().domain(domain).range(range);
      break;
    }
    case 'time': {
      // TODO: think out a way to deal with the date type
      getValue = (val: string) => new Date(val);
      domain = d3Extent(dataVals.map(time => getValue(time)));
      scale = scaleTime().domain(domain).range(range);
      break;
    }
    case 'linear':
    default: {
      domain = d3Extent(dataVals);
      scale = scaleLinear().domain(domain).range(range);
      break;
    }
  }

  const axisScale = {
    field,
    range,
    domain,
    getValue,
    scaleType,
    type,
    scale,
  };
  return axisScale;
}

export function getXAxisScale({ encoding, data, axisLength }: GetAxisScaleArgs): AxisScale {
  return getAxisScale(0, axisLength, data, encoding);
}

export function getYAxisScale({ encoding, data, axisLength }: GetAxisScaleArgs): AxisScale {
  return getAxisScale(axisLength, 0, data, encoding);
}
