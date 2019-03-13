import { map, sortedUniq } from 'lodash-es';
import { extent as d3Extent } from 'd3-array';
import { scaleOrdinal, scaleSequential } from 'd3-scale';

import { Theme, ColorEncoding, ColorScale } from '../common/types';

interface ColorScaleArgs {
  colors: Theme['colors'];
  encoding: ColorEncoding;
  data: object[];
}

function getNumericDomain(values: number[]): [number, number] {
  /**
   * The `d3Extent` return [number, number] | [undefined, undefined].
   * Maybe there is better way to make compiler happy, it's a workaround now.
   */
  const [extentMin = 0, extentMax = 0] = d3Extent(values);
  return [extentMin, extentMax];
}

const getColorScaleSetting = ({
  colors,
  encoding,
  data,
}: ColorScaleArgs): Pick<
  ColorScale,
  Extract<keyof ColorScale, 'domain' | 'scale' | 'range' | 'scaleType'>
> => {
  const { field, type } = encoding;
  switch (type) {
    case 'nominal': {
      const domain = map(data, field);
      const scale = scaleOrdinal(colors.category).domain(domain);
      return {
        domain,
        scale,
        scaleType: 'ordinal',
        range: colors.category,
      };
    }
    case 'ordinal': {
      /**
       * make sure the element is unique or
       * scaleOrdinal will treat same element in domain as different value and map it incorrectly.
       */
      const domain = sortedUniq(map(data, field).sort((a, b) => Number(a) - Number(b)));
      const range = colors.sequential.scheme[domain.length];
      const scale = scaleOrdinal(range).domain(domain);
      return {
        domain,
        range,
        scale,
        scaleType: 'ordinal',
      };
    }
    case 'temporal': {
      const timeStamps: number[] = data.map(obj => obj[field].getTime());
      const domain = getNumericDomain(timeStamps);
      const scale = scaleSequential(colors.sequential.interpolator)
        .domain(domain);
      return {
        domain,
        scale,
        scaleType: 'sequential',
      };
    }
    case 'quantitative': {
      const values = data.map(row => Number(row[field]));
      const domain = getNumericDomain(values);
      const scale = scaleSequential(colors.sequential.interpolator).domain(domain);
      return {
        domain,
        scale,
        scaleType: 'sequential',
      };
    }
    default: {
      throw Error('Invalid color encoding type.');
    }
  }
};

/**
 * computes and returns domain, range, color scale and value selector,
 * which you can utitlize in Chart component.
 */

export function getColorScale({
  colors,
  encoding,
  data,
}: ColorScaleArgs): ColorScale {
  const { type, field } = encoding;
  const { scale, scaleType, domain, range } = getColorScaleSetting({ colors, encoding, data });
  const getValue = (val: any) => val;
  return {
    scale,
    domain,
    type,
    field,
    getValue,
    range,
    scaleType,
  };
}
