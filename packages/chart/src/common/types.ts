import {
  // from Overlays
  HeaderBoxProps,
  // from common types
  Margin,
  AxisEncoding,
  ColorEncoding,
} from '@ichef/transcharts-graph';

export interface CommonChartProps {
  /** Margin between the inner graph area and the outer svg */
  margin?: Margin;

  /** Should show the axis on the left or not */
  showLeftAxis?: boolean;

  /** Should show the axis on the bottom or not */
  showBottomAxis?: boolean;

  /** Data of the chart */
  data: object[];

  /** Encoding config of the data on the x-axis */
  x: AxisEncoding;

  /** Encoding config of the data on the y-axis */
  y: AxisEncoding;

  /** Encoding config of the data related to the color display */
  color?: ColorEncoding;

  /** Title of <HeaderBox> */
  title?: HeaderBoxProps['title'];

  /** Description of <HeaderBox> */
  titleDesc?: HeaderBoxProps['desc'];

  /** Text align of <HeaderBox> */
  titleAlign?: HeaderBoxProps['align'];
}
