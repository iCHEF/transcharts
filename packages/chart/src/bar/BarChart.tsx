import React, { useContext, useMemo, useCallback } from 'react';
import { ScaleBand, ScaleLinear } from 'd3-scale';
import {
  // from HoverLayer
  HoverLayer,
  // from hooks
  useHoverState,
  // from TooltipLayer
  TooltipLayer,
  // from Legend,
  LegendGroup,
  // from common types
  AxisEncoding,
  // from themes
  Theme,
  ThemeContext,
} from '@ichef/transcharts-graph';

import {
  getAccumYCalculator,
} from '../utils/getBarPositions';
import { useChartDimensions } from '../hooks/useChartDimensions';
import { useCartesianEncodings } from '../hooks/useCartesianEncodings';
import { SvgWithAxisFrame } from '../frames/SvgWithAxisFrame';
import { DEFAULT_VALS } from '../common/config';
import { CommonChartProps } from '../common/types';

/** A line and a dot for the point being hovered */
const HoveringIndicator = ({ hovering, x, y, width, height }: {
  hovering: boolean,
  x: number,
  y: number,
  width: number,
  height: number,
}) => {
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

export interface BarChartProps extends CommonChartProps {
  /** Ratio of the paddings between bars */
  paddingInner: number;
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
  title,
  titleDesc,
  titleAlign,
  showLeftAxis,
  showBottomAxis,
  paddingInner = 0.1,
}: BarChartProps) => {
  const theme = useContext<Theme>(ThemeContext);
  const {
    chartRef,
    titleRef,
    legendRef,
    outerDimension,
    graphDimension,
  } = useChartDimensions(margin);
  const { width: graphWidth, height: graphHeight } = graphDimension;

  /**
   * Whether the graph should be drawn from the x-axis.
   * False if it should be drawn from the y-axis.
   */
  const drawFromXAxis = useMemo(
    () => {
      return x.type !== 'quantitative';
    },
    [x, y],
  );

  const xEncoding: AxisEncoding = { ...x, scale: 'band' };
  const yEncoding: AxisEncoding = { ...y, scale: 'linear' };
  if (drawFromXAxis) {
    xEncoding.scaleConfig = { paddingInner };
  } else {
    xEncoding.scale = 'linear';
    yEncoding.scale = 'band';
    yEncoding.scaleConfig = { paddingInner };
  }

  const {
    dataGroups,
    scalesConfig,
    rowValSelectors,
    axisProjectedValues,
  } = useCartesianEncodings(graphDimension, theme, data, xEncoding, yEncoding, color);
  const { clearHovering, hovering, hoveredPoint, setHoveredPosAndIndex } = useHoverState();

  const bandScale = scalesConfig[drawFromXAxis ? 'x' : 'y'].scale as ScaleBand<any>;
  const linearScale = scalesConfig[drawFromXAxis ? 'y' : 'x'].scale as ScaleLinear<any, any>;
  const bandWidth = bandScale.bandwidth();

  /**
   * Returns the size and position of the hovering detection rectangle
   * or hovering highlight rectangle
   */
  const getHoveringRectPos = useCallback(
    (idx: number) => {
      const paddingVal = bandWidth * paddingInner;
      const xPos = idx === 0
        ? 0
        : axisProjectedValues[idx].xPos - paddingVal / 2;
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

  const hoverDetectionComponents = useMemo(
    () => (
      axisProjectedValues.map(
        (row, idx) => {
          return (
            <rect
              // #TODO: use unique keys rather than array index
              key={`colli-${idx}`}
              x={row.xPos}
              y={0}
              height={graphHeight}
              width={bandWidth}
              opacity={0}
              {...{ ...getHoveringRectPos(idx) }}
            />
          );
        }
      )
    ),
    [axisProjectedValues, graphHeight, bandWidth, getHoveringRectPos]
  );

  const graphGroup = useMemo(
    () => {
      const baseY = linearScale(0);
      const getAccumY = getAccumYCalculator(baseY);

      return dataGroups.map(
        (rows: object[], groupIdx: number) => {
          return rows.map((row: object, rowIdx: number) => {
            const colorString: string = rowValSelectors.color.getString(rows[0]);
            const xPos = rowValSelectors.x.getScaledVal(row);
            const scaledY = rowValSelectors.y.getScaledVal(row);
            const height = scaledY >= 0
              ? baseY - scaledY
              : baseY - graphHeight - scaledY;

            return (
              <rect
                key={`bar-${rowIdx}`}
                x={xPos}
                y={getAccumY(xPos, height)}
                width={bandWidth}
                height={Math.abs(height)}
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
      titleRef={titleRef}
      title={title}
      titleDesc={titleDesc}
      titleAlign={titleAlign}
      outerDimension={outerDimension}
      graphDimension={graphDimension}
      showLeftAxis={showLeftAxis}
      showBottomAxis={showBottomAxis}
      x={x}
      y={y}
      // put the axes on top of the bars
      axisInBackground={false}
      margin={margin}
      data={data}
      scalesConfig={scalesConfig}
      svgOverlay={
        <>
          {/* Draw the tooltip */}
          <TooltipLayer
            hovering={hovering}
            hoveredPoint={hoveredPoint}
            axisProjectedValues={axisProjectedValues}
            graphWidth={graphWidth}
            graphHeight={graphHeight}
            margin={margin}
            xOffset={bandWidth / 2}
          />
          {/* Draw the legend */}
          <LegendGroup
            color={color && {
              ...color,
              ...scalesConfig.color!,
            }}
            ref={legendRef}
          />
        </>
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
        hoverDetectionComponents={hoverDetectionComponents}
      />
    </SvgWithAxisFrame>
  );
};
BarChart.defaultProps = defaultProps;
