import { Scale } from '../common/types';

/**
 * Returns the data value selectors for a data record
 * using the computed axis configurations including the d3Scale function of the axis
 * @param axis - AxisScale
 * @param fieldIndex - the current index of the field
 */
export function getRecordFieldSelector(
  axis: Pick<Scale, Extract<keyof Scale, 'field' | 'scale' | 'getValue' | 'scaleType'>>,
) {
  const { field, scale, getValue, scaleType } = axis;

  /** Given a record of data, it returns the orginal value of the specified field */
  const getOriginalVal = (record: object) => getValue(record[field]);

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
