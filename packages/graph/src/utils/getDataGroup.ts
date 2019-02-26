import { values, groupBy } from 'lodash-es';

/**
 * It's a utility to split rows into different sub rows by multiple field.
 * For example, given:
 * const data = [
 *   { type: 'a', color: 'green' },
 *   { type: 'b', color: 'green' },
 *   { type: 'a', color: 'red' },
 *   { type: 'b', color: 'red' },
 * ]
 * `getDataGroup(data, ['type', 'color']) will categorize data by fields and return
 * [
 *   [{ type: 'a', color: 'green' }],
 *   [{ type: 'b', color: 'green' }],
 *   [{ type: 'a', color: 'red' }],
 *   [{ type: 'b', color: 'red' }],
 * ]
 */
export function getDataGroup(data: object[], fields: string[]): object[][] {
  return fields.reduce(
    (all, field) => {
      const groups = all.map(rows => values(groupBy(rows, field)));
      return groups.reduce((joinedGroups, group) => [...joinedGroups, ...group], []);
    },
    [data],
  );
}
