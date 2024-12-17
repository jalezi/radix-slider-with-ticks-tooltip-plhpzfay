import { useMemo } from 'react';
import { calcStepMarkOffset } from '../utils';

export function useTicks({
  min,
  max,
  step,
  value,
  thumbWidth,
  orientation
}) {
  const numberOfTicks = Math.ceil((max - min + 1) / step);
  const maxTickIndex = max - min;

  return useMemo(
    () =>
      Array.from({ length: numberOfTicks }, (_, i) => {
        const tickValue = i * step + min;
        const position = calcStepMarkOffset(
          i * step,
          maxTickIndex,
          thumbWidth
        );
        
        let isInRange = false;
        if (value.length === 2) {
          const [first, second] = value;
          isInRange = first <= tickValue && tickValue <= second;
        }

        return {
          id: `tick-${i * step}`,
          position,
          value: tickValue,
          isInRange,
          orientation
        };
      }),
    [numberOfTicks, maxTickIndex, thumbWidth, value, orientation, min, step]
  );
}