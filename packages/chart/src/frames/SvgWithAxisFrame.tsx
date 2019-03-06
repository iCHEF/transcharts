import React, { FunctionComponent } from 'react';
import {
  // from AxisLayer
  AxisLayer,
  // from common types
  AxisScale,
  Margin,
  GraphDimension,
} from '@ichef/transcharts-graph';

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

  scalesConfig: {
    x: AxisScale,
    y: AxisScale,
  };

  /** Elements to be overlayed on top of the SVG */
  svgOverlay?: React.ReactNode;

  /** Elements to be drawed inside of the SVG */
  children: React.ReactNode;
}

export const SvgWithAxisFrame: FunctionComponent<SvgFrameProps> = React.forwardRef((
  {
    outerDimension,
    graphDimension,
    margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 60,
    },
    data,
    showLeftAxis = true,
    showBottomAxis = true,
    scalesConfig,
    svgOverlay,
    children,
  },
  ref: React.RefObject<HTMLDivElement>,
) => {
  const { width: outerWidth, height: outerHeight } = outerDimension;
  const { width: graphWidth, height: graphHeight } = graphDimension;

  return (
    <div
      ref={ref}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <svg width={outerWidth} height={outerHeight}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisLayer
            width={graphWidth}
            height={graphHeight}
            showLeftAxis={showLeftAxis}
            showBottomAxis={showBottomAxis}
            data={data}
            xAxis={scalesConfig.x}
            yAxis={scalesConfig.y}
          />
          {children}
        </g>
      </svg>
      {svgOverlay}
    </div>
  );
});