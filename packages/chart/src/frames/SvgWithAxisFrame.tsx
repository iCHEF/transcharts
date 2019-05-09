import React from 'react';
import {
  // from AxisLayer
  AxisLayer,
  // from Overlays
  HeaderBox,
  HeaderBoxProps,
  // from common types
  AxisScale,
  Margin,
  GraphDimension,
  AxisEncoding,
} from '@ichef/transcharts-graph';

export interface FrameContentProps {
  /** Width and height of the outer container including the margin */
  outerDimension: GraphDimension;

  /** Width and height of the graph to be drawed inside the SVG group */
  graphDimension: GraphDimension;

  /** Axis encoding of x-axis */
  x: AxisEncoding;

  /** Axis encoding of y-axis */
  y: AxisEncoding;

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
export interface SvgFrameProps extends FrameContentProps {
  /** Ref to <HeaderBox> */
  titleRef: React.RefObject<HTMLDivElement>;

  /** Title of <HeaderBox> */
  title?: HeaderBoxProps['title'];

  /** Description of <HeaderBox> */
  titleDesc?: HeaderBoxProps['desc'];
}

const defaultProps = {
  showLeftAxis: true,
  showBottomAxis: true,
  axisInBackground: true,
};

const FrameContent = ({
  outerDimension,
  graphDimension,
  x,
  y,
  margin,
  data,
  scalesConfig,
  showLeftAxis,
  showBottomAxis,
  axisInBackground,
  svgOverlay,
  children,
}: FrameContentProps) => {
  const { width: outerWidth, height: outerHeight } = outerDimension;
  const { width: graphWidth, height: graphHeight } = graphDimension;
  const axisLayer = (
    <AxisLayer
      width={graphWidth}
      height={graphHeight}
      showLeftAxis={showLeftAxis}
      showBottomAxis={showBottomAxis}
      data={data}
      x={x}
      y={y}
      xAxisScale={scalesConfig.x.scale}
      yAxisScale={scalesConfig.y.scale}
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

/**
 * It manages the size of the chart container, SVG, and the axes
 * that generally used across different charts.
 */
export const SvgWithAxisFrame = React.forwardRef<
  HTMLDivElement,
  JSX.LibraryManagedAttributes<typeof FrameContent, SvgFrameProps>
>(({
  titleRef,
  title,
  titleDesc,
  ...restProps
}, ref) => (
  <div
    ref={ref}
    style={{ width: '100%', height: '100%', position: 'relative' }}
  >
    <FrameContent {...restProps} />
    <HeaderBox
      ref={titleRef}
      title={title}
      desc={titleDesc}
    />
  </div>
));
