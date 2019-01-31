import * as React from 'react';
import { LinePath } from '@vx/shape';
import {
  AxisConfig,
  AxisLayer,
  DataLayer,
  DataLayerRenderParams,
  HoverLayer,
  DataField,
  ResponsiveLayer,
  ResponsiveState,
  Scale,
  Margin,
  Tooltip,
} from '@ichef/transcharts-graph';

export interface LineChartProps {
   /** Margin between the inner graph area and the outer svg */
  margin: Margin;
  data: object[];
  scaleX: Scale;
  scaleY: Scale;
  fieldsX: DataField[];
  fieldsY: DataField[];
  /** Should show the axis on the left or not */
  showLeftAxis: boolean;
  /** Should show the axis on the bottom or not */
  showBottomAxis: boolean;
}

/**
 * Returns the data value selectors for a data record
 * using the computed axis configurations including the d3Scale function of the axis
 * @param axis - the axis computed from DataLayer
 * @param fieldIndex - the current index of the field
 */
function getRecordFieldSelectors(axis: AxisConfig, fieldIndex: number) {
  const { fields, d3Scale, getValue, scaleConfig } = axis;
  const fieldName = fields[fieldIndex].name;

  /** Given a record of data, it returns the orginal value of the specified field */
  const getOriginalVal = (record: object) => getValue(record[fieldName]);

  return {
    getOriginalVal,

    /**
     * Given a record of data,
     * it returns the mapped value (computed by d3 scale function) of the specified field
     */
    getScaledVal: (record: object) => d3Scale(getOriginalVal(record)),

    getFormattedStringVal: (record: object) => {
      const recordValue = getOriginalVal(record);

      if (scaleConfig.type === 'time') {
        // FIXME: unify the way of formatting datetime
        return recordValue.toLocaleString();
      }

      return recordValue;
    },
  };
}

const getSelectorType = (false as true) && getRecordFieldSelectors(undefined, 0);

function getTooltipBox(
  hoveredIndex: number,
  hoveredPos: DataLayerRenderParams['hoveredPos'],
  data: object[],
  xSelector: typeof getSelectorType,
  ySelector: typeof getSelectorType,
) {
  if (hoveredIndex === null || !data) {
    return null;
  }

  return (
    <Tooltip
      position={hoveredPos}
    >
      <p>{xSelector.getFormattedStringVal(data[hoveredIndex])}</p>
      <p>{ySelector.getFormattedStringVal(data[hoveredIndex])}</p>
    </Tooltip>
  );
}

export const LineChart: React.SFC<LineChartProps> = ({
  data,
  scaleX,
  scaleY,
  fieldsX,
  fieldsY,
  margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 60,
  },
  showLeftAxis = true,
  showBottomAxis = true,
}) => {
  return (
    <ResponsiveLayer>
      {({ width: outerWidth, height: outerHeight }: ResponsiveState) => {
        const { top, right, bottom, left } = margin;
        const graphWidth = outerWidth - left - right;
        const graphHeight = outerHeight - top - bottom;

        if (graphWidth <= 0 || graphHeight <= 0) {
          return null;
        }

        return (
          <DataLayer
            width={graphWidth}
            height={graphHeight}
            data={data}
            scaleX={scaleX}
            scaleY={scaleY}
            fieldsX={fieldsX}
            fieldsY={fieldsY}
          >
            {({
              // computed x and y axis configurations
              xAxis,
              yAxis,
              // currently hovered positions
              hoveredIndex,
              hoveredPos,
              setHoveredPosAndIndex,
            }: DataLayerRenderParams) => {
              const xSelector = getRecordFieldSelectors(xAxis, 0);
              const ySelector = getRecordFieldSelectors(yAxis, 0);

              /** Width of the collision detection rectangle */
              const bandWidth = graphWidth / (data.length - 1);

              const lineDots = data.map((dataRow, index) => (
                <circle
                  key={`c-${index}`}
                  cx={xSelector.getScaledVal(dataRow)}
                  cy={ySelector.getScaledVal(dataRow)}
                  r={3.5}
                  fill={'#ff7049'}
                />
              ));

              return (
                <>
                  <svg width={outerWidth} height={outerHeight}>
                    <g transform={`translate(${left}, ${top})`}>
                      {/* Draw the axes */}
                      <AxisLayer
                        width={graphWidth}
                        height={graphHeight}
                        showLeftAxis={showLeftAxis}
                        showBottomAxis={showBottomAxis}
                        data={data}
                        xAxis={xAxis}
                        yAxis={yAxis}
                      />

                      {/* Draw the line */}
                      <LinePath
                        data={data}
                        x={xSelector.getScaledVal}
                        y={ySelector.getScaledVal}
                        stroke={'#ff7049'}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Draw dots on the line */}
                      {lineDots}

                      {/* Areas which are used to detect mouse or touch interactions */}
                      <HoverLayer
                        setHoveredPosAndIndex={setHoveredPosAndIndex}
                        collisionComponents={data.map((dataRow, index) => (
                          <rect
                            key={`colli-${index}`}
                            x={
                              index === 0 ? 0 : xSelector.getScaledVal(dataRow) - bandWidth * 0.5
                            }
                            y={0}
                            width={
                              index === 0 || index === data.length - 1
                                ? bandWidth / 2
                                : bandWidth
                            }
                            height={graphHeight}
                            fill={'#ff7049'}
                            opacity={0.5}
                            stroke="blue"
                            strokeWidth={3}
                          />
                        ))}
                      />
                    </g>
                  </svg>

                  {/* Draw the tooltip */}
                  {getTooltipBox(hoveredIndex, hoveredPos, data, xSelector, ySelector)}
                </>
              );
            }}
          </DataLayer>
        );
      }}
    </ResponsiveLayer>
  );
};
