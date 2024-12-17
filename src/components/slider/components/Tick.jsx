import { cx } from 'class-variance-authority';
import styles from '../slider.module.css';

export function Tick({ 
  id, 
  position, 
  value, 
  isInRange, 
  orientation = 'horizontal',
}) {
  const isHorizontal = orientation === 'horizontal';
  const isVertical = orientation === 'vertical';

  return (
    <span
      id={id}
      className={cx(
        styles.Tick,
        isHorizontal && styles.Horizontal,
        isVertical && styles.Vertical,
        isInRange && styles.InRange
      )}
      style={{
        left: isHorizontal ? position : undefined,
        top: isVertical ? position : undefined,
      }}
      role="presentation"
      aria-valuenow={value}
    />
  );
}