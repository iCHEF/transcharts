import { extent as d3Extent } from 'd3-array';
import {
  scaleLinear,
  scalePoint,
  scaleTime,
  scaleBand,
} from 'd3-scale';

import { AxisScale, ScaleType, AxisEncoding } from '../common/types';
import { DEFAULT_VALS } from '../common/config';

import { getValByScaleType } from './getValByScaleType';
import { getFieldValuesFromData } from './getFieldValuesFromData';

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
  const { field, type, scaleConfig } = encoding;

  const dataVals = getFieldValuesFromData(data, field);

  let domain: AxisScale['domain'];
  let scale;
  const scaleType: ScaleType = encoding.scale || DEFAULT_VALS.SCALE_TYPE;
  const getValue = getValByScaleType(scaleType);

  switch (scaleType) {
    case 'point': {
      domain = dataVals;
      scale = scalePoint().domain(domain).range(range);
      break;
    }
    case 'time': {
      domain = d3Extent(dataVals.map(time => getValue(time)));
      scale = scaleTime().domain(domain).range(range);
      break;
    }
    case 'band': {
      domain = dataVals;
      scale = scaleBand().domain(domain).range(range);
      if (scaleConfig) {
        const { padding, paddingInner, paddingOuter } = scaleConfig;
        if (padding) {
          scale.padding(padding);
        }
        if (paddingInner) {
          scale.paddingInner(paddingInner);
        }
        if (paddingOuter) {
          scale.paddingOuter(paddingOuter);
        }
      }
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
