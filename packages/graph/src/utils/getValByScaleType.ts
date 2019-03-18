import { ScaleType } from '../common/types';
import { DEFAULT_VALS } from '../common/config';

/**
 * Returns the orignal value of the data
 * based on the scale type.
 * It currently formats the date string as Date object.
 */
export function getValByScaleType(
  scaleType: ScaleType = DEFAULT_VALS.SCALE_TYPE
) {
  let getValue = (val: any) => val;

  if (scaleType === 'time') {
    // TODO: think out a way to deal with the date type
    getValue = (val: string) => new Date(val);
  }

  return getValue;
}
