import React from 'react';
import {
  // from AxisLayer
  AxisLayer,
  // from common types
  AxisScale,
  Margin,
  GraphDimension,
} from '@ichef/transcharts-graph';

/**
 * It manages the size of the chart container, SVG, and the axes
 * that generally used across different charts.
 */
export interface SvgFrameProps {
  /** Width and height of the outer container including the margin */
  outerDimension: GraphDimension;

  /** Width and height of the graph to be drawed inside the SVG group */
  graphDimension: GraphDimension;

  /** Margin between the inner graph area and the outer svg */
  margin: Margin;

  /** It determines how the axes are drawn */
  data: object[];

  /** Should show the axis on the left or not */
  showLeftAxis: boolean;

  /** Should show the axis on the bottom or not */
  showBottomAxis: boolean;

  /** Whether to display the axes in the background or foreground of the chart */
  axisInBackground: boolean;

  scalesConfig: {
    x: AxisScale,
    y: AxisScale,
  };

  /** Elements to be overlayed on top of the SVG */
  svgOverlay?: React.ReactNode;

  /** Elements to be drawed inside of the SVG */
  children: React.ReactNode;
}

const defaultProps = {
  showLeftAxis: true,
  showBottomAxis: true,
  axisInBackground: true,
};

const FrameContent = ({
  outerDimension,
  graphDimension,
  margin,
  data,
  scalesConfig,
  showLeftAxis,
  showBottomAxis,
  axisInBackground,
  svgOverlay,
  children,
}: SvgFrameProps) => {
  const { width: outerWidth, height: outerHeight } = outerDimension;
  const { width: graphWidth, height: graphHeight } = graphDimension;
  const axisLayer = (
    <AxisLayer
      width={graphWidth}
      height={graphHeight}
      showLeftAxis={showLeftAxis}
      showBottomAxis={showBottomAxis}
      data={data}
      xAxis={scalesConfig.x}
      yAxis={scalesConfig.y}
    />
  );

  return (
    <>
      <svg width={outerWidth} height={outerHeight}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {axisInBackground ? (<>{axisLayer}{children}</>) : (<>{children}{axisLayer}</>)}
        </g>
      </svg>
      {svgOverlay}
    </>
  );
};
FrameContent.defaultProps = defaultProps;

export const SvgWithAxisFrame = React.forwardRef<
  HTMLDivElement,
  JSX.LibraryManagedAttributes<typeof FrameContent, SvgFrameProps>
>((props, ref) => (
  <div
    ref={ref}
    style={{ width: '100%', height: '100%', position: 'relative' }}
  >
    <FrameContent {...props} />
  </div>
));
