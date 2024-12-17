
import { useTicks } from '../hooks/useTicks';
import { Tick } from './Tick';

export function Ticks({
  min,
  max,
  step,
  value,
  thumbWidth,
  orientation,
}) {
  const ticks = useTicks({
    min,
    max,
    step,
    value,
    thumbWidth,
    orientation
  });

  return (
    <>
      {ticks.map((tickProps) => {
        return (
          <Tick key={tickProps.id} {...tickProps} />
        )
      })}
    </>
  );
}