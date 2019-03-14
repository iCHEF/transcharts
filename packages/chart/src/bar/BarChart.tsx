import React, { FunctionComponent, useContext, useMemo, useCallback } from 'react';
import {
  // from HoverLayer
  HoverLayer,
  // from hooks
  useHoverState,
  // from TooltipLayer
  TooltipLayer,
  // from common types
  Margin,
  AxisEncoding,
  ColorEncoding,
  // from themes
  Theme,
  ThemeContext,
} from '@ichef/transcharts-graph';

import { useChartDimensions } from '../hooks/useChartDimensions';
import { useCartesianEncodings } from '../hooks/useCartesianEncodings';
import { SvgWithAxisFrame } from '../frames/SvgWithAxisFrame';
import { DEFAULT_VALS } from '../common/config';

/** A line and a dot for the point being hovered */
const HoveringIndicator: FunctionComponent<{
  hovering: boolean,
  x: number,
  y: number,
  width: number,
  height: number,
}> = ({ hovering, x, y, width, height }) => {
  if (!hovering) {
    return null;
  }

  return(
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      opacity={0.5}
      fill="rgba(124, 137, 147, 0.25)"
    />
  );
};

export interface BarChartProps {
  /** Margin between the inner graph area and the outer svg */
  margin?: Margin;

  /** Should show the axis on the left or not */
  showLeftAxis?: boolean;

  /** Should show the axis on the bottom or not */
  showBottomAxis?: boolean;

  /** Ratio of the paddings between bars */
  paddingInner: number;

  data: object[];
  x: AxisEncoding;
  y: AxisEncoding;
  color?: ColorEncoding;
}

const defaultProps = {
  margin: DEFAULT_VALS.MARGIN,
  paddingInner: 0.1,
};

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
  paddingInner = 0.1,
}: BarChartProps) => {
  const theme = useContext<Theme>(ThemeContext);
  const { chartRef, outerDimension, graphDimension } = useChartDimensions(margin);
  const { width: graphWidth, height: graphHeight } = graphDimension;

  const xEncoding: AxisEncoding = { ...x, scale: 'band', scaleConfig: {
    paddingInner,
  }};
  const yEncoding: AxisEncoding = { ...y, scale: 'linear' };
  const {
    dataGroups,
    scalesConfig,
    rowValSelectors,
  } = useCartesianEncodings(graphDimension, theme, data, xEncoding, yEncoding, color);
  const { clearHovering, hovering, hoveredPoint, setHoveredPosAndIndex } = useHoverState();

  const bandWidth = scalesConfig.x.scale.bandwidth();

  /**
   * Returns the size and position of the collision rectangle or hovering highlight rectangle
   */
  const getHoveringRectPos = useCallback(
    (idx: number) => {
      const paddingVal = bandWidth * paddingInner;
      const xPos = idx === 0
        ? 0
        : rowValSelectors.x.getScaledVal(data[idx]) - paddingVal / 2;
      const width = idx === 0 || idx === data.length - 1
            ? bandWidth + paddingVal / 2
            : bandWidth + paddingVal;

      return {
        width,
        height: graphHeight,
        x: xPos,
        y: 0,
      };
    },
    [bandWidth, paddingInner],
  );

  const graphGroup = useMemo(
    () => {
      // calculate the accumulated y position of certain points
      const accumY = {};
      const getAccumY = (xPos: number, yPos: number, height: number) => {
        if (!accumY[xPos]) {
          accumY[xPos] = graphHeight;
        }
        accumY[xPos] -= height;
        return accumY[xPos];
      };

      return dataGroups.map(
        (rows: object[], groupIdx: number) => {
          return rows.map((row: object, rowIdx: number) => {
            const colorString: string = rowValSelectors.color.getString(rows[0]);
            const xPos = rowValSelectors.x.getScaledVal(row);
            const yPos = rowValSelectors.y.getScaledVal(row);
            const height = graphHeight - yPos;
            return (
              <rect
                key={`bar-${rowIdx}`}
                x={xPos}
                y={getAccumY(xPos, yPos, height)}
                width={bandWidth}
                height={height}
                fill={colorString}
              />
            );
          });
        }
      );
    },
    [dataGroups, scalesConfig, rowValSelectors],
  );

  return (
    <SvgWithAxisFrame
      ref={chartRef}
      outerDimension={outerDimension}
      graphDimension={graphDimension}
      showLeftAxis={showLeftAxis}
      showBottomAxis={showBottomAxis}
      // put the axes on top of the bars
      axisInBackground={false}
      margin={margin}
      data={data}
      scalesConfig={scalesConfig}
      svgOverlay={
        // Draw the tooltip
        <TooltipLayer
          hovering={hovering}
          hoveredPoint={hoveredPoint}
          data={data}
          graphWidth={graphWidth}
          graphHeight={graphHeight}
          margin={margin}
          xSelector={rowValSelectors.x}
          ySelector={rowValSelectors.y}
          x={rowValSelectors.x.getScaledVal(data[hoveredPoint.index]) + bandWidth / 2}
          getColor={rowValSelectors.color.getString}
        />
      }
    >
      {graphGroup}
      <HoveringIndicator
        hovering={hovering}
        {...{ ...getHoveringRectPos(hoveredPoint.index) }}
      />

      {/* Areas which are used to detect mouse or touch interactions */}
      <HoverLayer
        setHoveredPosAndIndex={setHoveredPosAndIndex}
        clearHovering={clearHovering}
        collisionComponents={data.map(
          (_, idx) => {
            return (
              <rect
                // #TODO: use unique keys rather than array index
                key={`colli-${idx}`}
                opacity={0}
                {...{ ...getHoveringRectPos(idx) }}
              />
            );
          }
        )}
      />
    </SvgWithAxisFrame>
  );
};
BarChart.defaultProps = defaultProps;
