import React, { FunctionComponent, useContext } from 'react';
import { LinePath } from '@vx/shape';
import {
  // from HoverLayer
  HoverLayer,
  // from hooks
  useHoverState,
  // from TooltipLayer
  TooltipLayer,
  // from common types
  Margin,
  FieldSelector,
  AxisEncoding,
  ColorEncoding,
  // from themes
  Theme,
  ThemeContext,
} from '@ichef/transcharts-graph';

import { useChartDimensions } from '../hooks/useChartDimensions';
import { useCartesianEncodings } from '../hooks/useCartesianEncodings';
import { SvgWithAxisFrame } from '../frames/SvgWithAxisFrame';

export interface BarChartProps {
  /** Margin between the inner graph area and the outer svg */
  margin?: Margin;

  /** Should show the axis on the left or not */
  showLeftAxis?: boolean;

  /** Should show the axis on the bottom or not */
  showBottomAxis?: boolean;

  data: object[];
  x: AxisEncoding;
  y: AxisEncoding;
  color?: ColorEncoding;
}

export const BarChart = ({
  data,
  // FIXME: remove the default margin after fixing the defaultProps of`<SvgWithAxisFrame>`
  margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 60,
  },
  x,
  y,
  color,
  showLeftAxis,
  showBottomAxis,
}: BarChartProps) => {
  const theme = useContext<Theme>(ThemeContext);
  const { chartRef, outerDimension, graphDimension } = useChartDimensions(margin);
  const { width: graphWidth, height: graphHeight } = graphDimension;

  const xEncoding: AxisEncoding = { ...x, scale: 'band', scaleConfig: {
    paddingInner: 0.1,
  }};
  const yEncoding: AxisEncoding = { ...y, scale: 'linear' };
  const {
    dataGroups,
    scalesConfig,
    rowValSelectors,
  } = useCartesianEncodings(graphDimension, theme, data, xEncoding, yEncoding, color);

  const graphGroup = dataGroups.map(
    (rows: object[], groupIdx: number) => {
      return rows.map((row: object, rowIdx: number) => {
        const colorString: string = rowValSelectors.color.getString(rows[0]);
        return (
          <rect
            key={`bar-${rowIdx}`}
            x={rowValSelectors.x.getScaledVal(row)}
            y={rowValSelectors.y.getScaledVal(row)}
            width={scalesConfig.x.scale.bandwidth()}
            height={graphHeight - rowValSelectors.y.getScaledVal(row)}
            fill={colorString}
          />
        );
      });
      console.log(rows, colorString)
    }
  );

  return (
    <SvgWithAxisFrame
      ref={chartRef}
      outerDimension={outerDimension}
      graphDimension={graphDimension}
      showLeftAxis={showLeftAxis}
      showBottomAxis={showBottomAxis}
      margin={margin}
      data={data}
      scalesConfig={scalesConfig}
    >
      {graphGroup}
    </SvgWithAxisFrame>
  );
};
