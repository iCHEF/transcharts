import { scaleOrdinal, scaleSequential } from 'd3-scale';
import { Theme, ColorEncoding, ColorScale } from '../common/types';
import { getRecordFieldSelector } from './getRecordFieldSelector';

interface GetColorScaleArgs {
  colors: Theme['colors'];
  encoding: ColorEncoding;
  data: object[]
}

const getColorScaleSetting = ({
  colors,
  encoding,
  data
}: GetColorScaleArgs): Pick<ColorScale, Extract<keyof ColorScale, 'field' | 'scale' | 'getValue' | 'scaleType'>> => {
  const { field, type } = encoding;
  switch (type) {
    case 'nominal': {
      const domain = Object.keys(data.reduce(
        (all, row) => {
          return {
            ...all,
            [row[field]]: true
          }
        },
        {}
      ));
      const scale = scaleOrdinal(colors.category).domain(domain);
      return {
        scale,
        scaleType: 'ordinal',
        range: colors.category,
        domain
      };
    }
    case 'ordinal': {
      const domain = Object.keys(data.reduce(
        (all, row) => {
          return {
            ...all,
            [row[field]]: true
          }
        },
        {}
      )).sort((a, b) => Number(a) - Number(b));
      const scale = scaleOrdinal(colors.sequential.scheme).domain(domain);
      return {
        scale,
        scaleType: 'ordinal',
        range: colors.sequential.scheme,
        domain
      };
    }
    case 'temporal': {
      const timeStamps: number[] = data.map(obj => obj[field].getTime());
      const minTime = Math.min(...timeStamps);
      const maxTime = Math.max(...timeStamps);
      const scale = scaleSequential(colors.sequential.interpolator).domain([minTime, maxTime]);
      return {
        scale,
        scaleType: 'sequential',
        range: colors.sequential.interpolator,
        domain: [minTime, maxTime],
      };
    }
    case 'quantitative': {
      const values = data.map(row => Number(row[field]));
      const min = Math.min(...values);
      const max = Math.max(...values);
      const scale = scaleSequential(colors.sequential.interpolator).domain([min, max]);
      return {
        scale,
        scaleType: 'sequential',
        range: colors.sequential.interpolator,
        domain: [min, max],
      };
    }

    default: {
      throw Error('Invalid color encoding type.');
    }
  }
};

export function getColorScale({encoding, colors, data}: {
  colors: Theme['colors'],
  encoding: ColorEncoding,
  data: object[]
}): ColorScale {
  const { type, field } = encoding
  const { scale, scaleType, domain, range } = getColorScaleSetting({ colors, encoding, data })
  const getValue = (val: any) => val;
  return {
    scale,
    domain,
    type,
    field,
    getValue,
    range,
    scaleType,
    selector: getRecordFieldSelector({ field, scale: getColorScaleFunc, getValue, scaleType })

  }
}
