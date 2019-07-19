import {
  // from common types
  FieldSelector,
} from '@ichef/transcharts-graph';

/**
 * Return the y-values in the `dataGroups` grouped by projected base values.
 * -  Structure of projectedVals: "projectedVals":[ { "index of dataGroup": "value" }, ... ]
 * @example
 * [{
 *  "basePos": 0,
 *  "baseStrVal": "0",
 *  "projectedVals": [{"groupIdx": 0, "projectedStrVal": 9, "projectedPos": 18, "color": "#deebf7"}],
 *  },
 * {
 *  "basePos": 109.12812500000001,
 *  "baseStrVal": "2",
 *  "projectedVals": [{"groupIdx": 0, "projectedStrVal": 3, "projectedPos": 6, "color": "#deebf7"}, ...],
 * }]
 */
export function getAxisProjectedValues(
  /** Data grouped in `useCartesianEncodings()`  */
  dataGroups: object[][],

  /**
   * Functions to get value on the base axis,
   * normally x-axis, if the graph has not been transposed.
   */
  baseSelector: FieldSelector,

  /**
   * Functions to get value on the project axis,
   * normally y-axis, if the graph has not been transposed.
   */
  projectedSelector: FieldSelector,

  /** Functions to get the formatted color string */
  getColorString: (record: any) => string,
) {
  // project by original values on the axis
  const projections = {};
  const basePositions = {};
  dataGroups.forEach((group, groupIdx) => {
    group.forEach((row) => {
      const baseStrVal = baseSelector.getFormattedStringVal(row);
      const projectedStrVal = projectedSelector.getFormattedStringVal(row);
      const basePos = baseSelector.getScaledVal(row);
      const projectedPos = projectedSelector.getScaledVal(row);
      if (!projections[baseStrVal]) {
        projections[baseStrVal] = [];
        basePositions[baseStrVal] = basePos;
      }
      projections[baseStrVal].push({
        groupIdx,
        projectedStrVal,
        projectedPos,
        color: getColorString(row),
      });
    });
  });

  // convert the position along the axis, and sort by the converted values
  const columns = Object.keys(projections).reduce(
    (accum, baseStrVal: any) => {
      const projectedVals = projections[baseStrVal];
      // ensure that we always get the correct type, not a string instead
      const basePos: number = basePositions[baseStrVal] || 0;
      const column = {
        basePos,
        baseStrVal,
        projectedVals,
      };

      return [...accum, column];
    },
    []
  );

  return columns.sort((a, b) => (a.basePos - b.basePos));
}
