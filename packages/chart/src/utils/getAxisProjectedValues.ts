import {
  // from common types
  FieldSelector,
} from '@ichef/transcharts-graph';

/**
 * Return the y-values in the `dataGroups` grouped by projected x values.
 * -  Structure of groupedY: "groupedY":[ { "index of dataGroup": "value" }, ... ]
 * @example
 * [{
 *  "xPos": 0,
 *  "xStrVal": "0",
 *  "groupedY": [{"groupIdx": 0, "yStrVal": 9, "yPos": 18, "color": "#deebf7"}],
 *  },
 * {
 *  "xPos": 109.12812500000001,
 *  "xStrVal": "2",
 *  "groupedY": [{"groupIdx": 0, "yStrVal": 3, "yPos": 6, "color": "#deebf7"}, ...],
 * }]
 */
export function getAxisProjectedValues(
  /** Data grouped in `useCartesianEncodings()`  */
  dataGroups: object[][],

  /** Functions to get value on the x-axis */
  xSelector: FieldSelector,

  /** Functions to get value on the y-axis */
  ySelector: FieldSelector,

  /** Functions to get the formatted color string */
  getColorString: (record: any) => string,
) {
  // project by original values on the axis
  const projections = {};
  const xPositions = {};
  dataGroups.forEach((group, groupIdx) => {
    group.forEach((row) => {
      const xStrVal = xSelector.getFormattedStringVal(row);
      const yStrVal = ySelector.getFormattedStringVal(row);
      const xPos = xSelector.getScaledVal(row);
      const yPos = ySelector.getScaledVal(row);
      if (!projections[xStrVal]) {
        projections[xStrVal] = [];
        xPositions[xStrVal] = xPos;
      }
      projections[xStrVal].push({
        groupIdx,
        yStrVal,
        yPos,
        color: getColorString(row),
      });
    });
  });

  // convert the position along the axis, and sort by the converted values
  const columns = Object.keys(projections).reduce(
    (accum, xStrVal: any) => {
      const groupedY = projections[xStrVal];
      // ensure that we always get the correct type, not a string instead
      const xPos: number = xPositions[xStrVal] || 0;
      const column = {
        xPos,
        xStrVal,
        groupedY,
      };

      return [...accum, column];
    },
    []
  );

  return columns.sort((a, b) => (a.xPos - b.xPos));
}
