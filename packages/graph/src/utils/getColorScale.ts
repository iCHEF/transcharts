import { extent as d3Extent } from 'd3-array';
import { scaleOrdinal, scaleSequential } from 'd3-scale';

import { Theme, ColorEncoding, ColorScale } from '../common/types';

import { getRecordFieldSelector } from './getRecordFieldSelector';

interface ColorScaleArgs {
  colors: Theme['colors'];
  encoding: ColorEncoding;
  data: object[];
}

function getNumericDomain(values: number[]): [number, number] {
  const extent = d3Extent(values);
  /**
   * The `d3Extent` return [number, number] | [undefined, undefined].
   * Maybe there is better way to make compiler happy, it's a workaround now.
   */
  return [
    typeof extent[0] === 'undefined' ? 0 : extent[0],
    typeof extent[1] === 'undefined' ? 0 : extent[1],
  ];
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
      const domain = Object.keys(data.reduce(
        (all, row) => {
          const value = row[field];
          return {
            ...all,
            [value]: true,
          };
        },
        {},
      ));
      const scale = scaleOrdinal(colors.category).domain(domain);
      return {
        domain,
        scale,
        scaleType: 'ordinal',
        range: colors.category,
      };
    }
    case 'ordinal': {
      const domain = Object.keys(data.reduce(
        (all, row) => {
          return {
            ...all,
            [row[field]]: true,
          };
        },
        {},
      )).sort((a, b) => Number(a) - Number(b));
      const scale = scaleOrdinal(colors.sequential.scheme).domain(domain);
      return {
        domain,
        scale,
        scaleType: 'ordinal',
        range: colors.sequential.scheme,
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
      let domain = getNumericDomain(values);
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
    selector: getRecordFieldSelector({ field, scale, getValue, scaleType }),
  };
}
