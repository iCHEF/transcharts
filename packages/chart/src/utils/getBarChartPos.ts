export function getAccumXCalculator(baseX: number) {
  // calculate the accumulated x position of certain points
  const positiveX = {};
  const nonPositiveX = {};

  return (yPos: number, scaledX: number) => {
    if (scaledX < 0) {
      if (!nonPositiveX[yPos]) {
        nonPositiveX[yPos] = baseX;
      }
      nonPositiveX[yPos] += scaledX;
      return nonPositiveX[yPos];
    }

    // scaledX >= 0
    const xPos = !positiveX[yPos] ? baseX : positiveX[yPos];
    positiveX[yPos] = xPos + scaledX;
    return xPos;
  };
}

export function getAccumYCalculator(baseY: number) {
  // calculate the accumulated y position of certain points
  const positiveY = {};
  const nonPositiveY = {};

  return (xPos: number, scaledY: number) => {
    if (scaledY >= 0) {
      if (!positiveY[xPos]) {
        positiveY[xPos] = baseY;
      }
      positiveY[xPos] -= scaledY;
      return positiveY[xPos];
    }

    // scaledY < 0
    const yPos = !nonPositiveY[xPos] ? baseY : nonPositiveY[xPos];
    nonPositiveY[xPos] = yPos - scaledY;
    return yPos;
  };
}
