import { AxisConfig } from '../common/types';

/**
 * Returns the data value selectors for a data record
 * using the computed axis configurations including the d3Scale function of the axis
 * @param axis - the axis computed from DataLayer
 * @param fieldIndex - the current index of the field
 */
export function getRecordFieldSelectors(
  axis: Pick<AxisConfig, Exclude<keyof AxisConfig, 'getSelectorsByField'>>,
  fieldIndex: number,
) {
  const { fields, d3Scale, getValue, scaleConfig } = axis;
  const fieldName = fields[fieldIndex].name;

  /** Given a record of data, it returns the orginal value of the specified field */
  const getOriginalVal = (record: object) => getValue(record[fieldName]);

  return {
    getOriginalVal,

    /**
     * Given a record of data,
     * it returns the mapped value (computed by d3 scale function) of the specified field
     */
    getScaledVal: (record: object) => d3Scale(getOriginalVal(record)),

    getFormattedStringVal: (record: object) => {
      const recordValue = getOriginalVal(record);

      if (scaleConfig.type === 'time') {
        // FIXME: unify the way of formatting datetime
        return recordValue.toLocaleString();
      }

      return recordValue;
    },
  };
}
