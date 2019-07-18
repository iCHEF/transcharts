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
