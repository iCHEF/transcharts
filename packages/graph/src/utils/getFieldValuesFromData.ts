/**
 * Returns an array of data selected by the given field name of the data array.
 * It will filter out null and undefined values automatically.
 * @param data - an array of data with various fields
 * @param fieldName - the field to be selected
 */
export function getFieldValuesFromData(
  data: object[],
  fieldName: string,
) {
  const dataVals: any[] = [];
  data.forEach((row) => {
    const val = row[fieldName];
    if (val !== undefined && val !== null) {
      dataVals.push(val);
    }
  });
  return dataVals;
}
