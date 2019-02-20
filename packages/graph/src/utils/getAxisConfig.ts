import { extent as d3Extent } from 'd3-array';
import {
  scaleLinear,
  scalePoint,
  scaleTime,
} from 'd3-scale';

import { Scale, DataField, AxisConfig } from '../common/types';

import { getRecordFieldSelectors } from './getRecordFieldSelectors';

/**
 * Computes and returns the configurations for the axis,
 * such as its domain, range and d3 scale functions
 */
export function getAxisConfig(
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

  const axisConfig = {
    fields,
    range,
    domain,
    getValue,
    d3Scale,
    scaleConfig: scale,
  };

  return {
    ...axisConfig,
    getSelectorsByField: (fieldIndex: number) => getRecordFieldSelectors(axisConfig, fieldIndex),
  };
}
