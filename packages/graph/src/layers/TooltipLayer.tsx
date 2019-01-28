import * as React from 'react';

export interface TooltipLayerProps {

}

export interface TooltipLayerState {
  /** X position of the tooltip */
  xPos: number;

  /** Y position of the tooltip */
  yPos: number;
}

export class TooltipLayer extends React.Component<
  TooltipLayerProps,
  TooltipLayerState
> {

  public state: TooltipLayerState = {
    xPos: 0,
    yPos: 0,
  };

  private handleTooltip = (dataIndex) => (event) => {
    // TODO: integrate `localPoint` of vx
    this.setState();
  };

  public render() {
    const { activeDataIndex } = this.context;
    const { renderCollisionAreas } = this.props;
    const collideAreas = renderCollisionAreas.map((area: JSX.Element, dataIndex: number) => {
      const handleCurrentTooltip = this.handleTooltip(dataIndex);
      return React.cloneElement(area, { onTouchStart: handleCurrentTooltip });
    });

    return (
      <>
        {/* Render areas to detect collisions of mouse pointers or touches with data points */}
        {collideAreas}
      </>
    );
  }
}
