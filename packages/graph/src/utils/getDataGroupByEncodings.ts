import groupBy from 'lodash/groupBy';
import values from 'lodash/values';

import { Encoding } from '../common/types';

/**
 * It's a utility to split rows into different sub rows by multiple field.
 * For example, given:
 * const data = [
 *   { value: 1, type: 'a', color: 'green' },
 *   { value: 2, type: 'b', color: 'green' },
 *   { value: 3, type: 'a', color: 'red' },
 *   { value: 4, type: 'b', color: 'red' },
 *   { value: 5, type: 'a', color: 'green' },
 *   { value: 6, type: 'b', color: 'green' },
 *   { value: 7, type: 'a', color: 'red' },
 *   { value: 8, type: 'b', color: 'red' },
 * ]
 * `getDataGroupByFields(data, ['type', 'color']) will categorize data by fields and return
 * [
 *   [
 *     { value: 1, type: 'a', color: 'green' },
 *     { value: 5, type: 'a', color: 'green' },
 *   ],
 *   [
 *     { value: 2,  type: 'b', color: 'green' },
 *     { value: 6,  type: 'b', color: 'green' },
 *   ],
 *   [
 *     { value: 3, type: 'a', color: 'red' },
 *     { value: 7, type: 'a', color: 'red' },
 *   ],
 *   [
 *     { value: 4 type: 'b', color: 'red' }
 *     { value: 8 type: 'b', color: 'red' }
 *   ],
 * ]
 */

export function getDataGroupByFields(data: object[], fields: string[]): object[][] {
  return fields.reduce(
    (all, field) => {
      const groups = all.map(rows => values(groupBy(rows, field)));
      return groups.reduce((joinedGroups, group) => [...joinedGroups, ...group], []);
    },
    [data],
  );
}

/**
 *
 * It's a utility to split rows into different sub rows by multiple encoding.
 * It will get field name from encodings
 * and apply `getdataGroupByFields` to build data group.
 */

export function getDataGroupByEncodings(data: object[], encodings: Encoding[]): object[][] {
  const fieldsToGroupBy: string[] = encodings
    .map(encoding => encoding!.field);
  return getDataGroupByFields(data, fieldsToGroupBy);
}
