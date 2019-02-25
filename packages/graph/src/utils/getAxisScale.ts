import memoizeOne from 'memoize-one';
import { ScaleLinear, ScalePoint, ScaleTime } from 'd3-scale';

import { FieldSelector, AxisEncoding } from '../common/types';


import { extent as d3Extent } from 'd3-array';
import {
  scaleLinear,
  scalePoint,
  scaleTime,
} from 'd3-scale';

/**
 * Returns the data value selectors for a data record
 * using the computed axis configurations including the d3Scale function of the axis
 * @param axis - the axis computed from DataLayer
 * @param fieldIndex - the current index of the field
 */
function getRecordFieldSelectors(
  axis: Pick<AxisScale, Exclude<keyof AxisScale, 'getSelectorsByField'>>,
) {
  const { field: fieldName, scale, getValue, scaleType } = axis;


  /** Given a record of data, it returns the orginal value of the specified field */
  const getOriginalVal = (record: object) => getValue(record[fieldName]);

  return {
    getOriginalVal,

    /**
     * Given a record of data,
     * it returns the mapped value (computed by d3 scale function) of the specified field
     */
    getScaledVal: (record: object) => scale(getOriginalVal(record)),

    getFormattedStringVal: (record: object) => {
      const recordValue = getOriginalVal(record);

      if (scaleType === 'time') {
        // FIXME: unify the way of formatting datetime
        return recordValue.toLocaleString();
      }

      return recordValue;
    },
  };
}

interface GetAxisScaleArgs {
  data: object[],
  encoding: AxisEncoding,
  axisLength: number,
}

interface AxisScale {
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

  getSelectors: () => FieldSelector;
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
  const { field, type, scale } = encoding;

  const dataVals: any[] = [];
  data.forEach((row) => {
    const val = row[field];
    if (val !== undefined && val !== null) {
      dataVals.push(val);
    }
  });

  let domain: AxisScale['domain'];
  let d3ScaleFunc;
  let scaleType = scale || 'linear';
  let getValue = (val: any) => val;

  switch (scaleType) {
    case 'point': {
      domain = dataVals;
      d3ScaleFunc = scalePoint().domain(domain).range(range);
      break;
    }
    case 'time': {
      // TODO: think out a way to deal with the date type
      getValue = (val: string) => new Date(val);
      domain = d3Extent(dataVals.map(time => getValue(time)));
      d3ScaleFunc = scaleTime().domain(domain).range(range);
      break;
    }
    case 'linear':
    default: {
      domain = d3Extent(dataVals);
      d3ScaleFunc = scaleLinear().domain(domain).range(range);
      break;
    }
  }

  const axisScale = {
    field,
    range,
    domain,
    getValue,
    scaleType,
    scale: d3ScaleFunc,
    type,
    getSelectors: () => getRecordFieldSelectors(axisScale),
  }
  return axisScale
}

export function getXAxisScale({ encoding, data, axisLength }: GetAxisScaleArgs): AxisScale {
  return getAxisScale(0, axisLength, data, encoding);
}

export function getYAxisScale({ encoding, data, axisLength }: GetAxisScaleArgs): AxisScale {
  return getAxisScale(axisLength, 0, data, encoding);
}
