import memoizeOne from 'memoize-one';

import { Scale, DataField, AxisConfig } from '../common/types';
import { getAxisConfig } from './getAxisConfig';

export interface XYAxisConfig {
  xAxis: AxisConfig;
  yAxis: AxisConfig;
}

export interface xyAxisEncoding {
  /** Width of the inner graph */
  width: number;

  /** height of the inner graph */
  height: number;

  /**
   * Data for computing the axis config.
   * If there are multiple fields appear in the axes (like multi-series line charts),
   * then all of the data related to the fields will be included in the computations
   * @example [{ x: 1, y: 0 }, { x: 0, y: 1 }, ...]
   */
  data: object[];

  /** Scale config of the x-axis */
  scaleX: Scale;

  /** Scale config of the y-axis */
  scaleY: Scale;

  // #TODO: defien the keys for the fields, and the default keys are the index of the record
  /** DataFields of the x-axis */
  fieldsX: DataField[];

  /** DataFields of the y-axis */
  fieldsY: DataField[];
}

/**
 * This is responsible for computing axis data in order to draw a graph
 */

export function getAxis(args: xyAxisEncoding): XYAxisConfig {
  const getXYAxes = memoizeOne(
    (width, height, data, scaleX, scaleY, fieldsX, fieldsY) => {
      return {
        xAxis: getAxisConfig(0, width, data, scaleX, fieldsX),
        yAxis: getAxisConfig(height, 0, data, scaleY, fieldsY),
      };
    },
  );

  const {
    width,
    height,
    data,
    scaleX,
    scaleY,
    fieldsX,
    fieldsY,
  } = args;

  const { xAxis, yAxis } = getXYAxes(
    width,
    height,
    data,
    scaleX,
    scaleY,
    fieldsX,
    fieldsY,
  );

  return {
    xAxis,
    yAxis,
  };
}
