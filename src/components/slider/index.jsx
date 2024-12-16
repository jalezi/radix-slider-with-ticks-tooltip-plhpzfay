import { forwardRef, useMemo, useLayoutEffect, useRef, useState } from 'react';
import { cx } from 'class-variance-authority';

import * as SliderPrimitive from '@radix-ui/react-slider';

import styles from './slider.module.css';
import { calcStepMarkOffset } from './utils';

const RadixSliderDefaults = {
  min: 0,
  max: 100,
  step: 1,
  orientation: 'horizontal',
};

const THUMB_SIZE = 16;

export const Slider = forwardRef(
  (
    {
      className,
      onValueChange,
      defaultValue: defaultValueProp,
      value: valueProp,
      ...props
    },
    forwardedRef
  ) => {
    const [value, setValue] = useState(defaultValueProp ?? valueProp ?? [0]);
    const [thumbWidth, setThumbWidth] = useState(THUMB_SIZE);
    const sliderRef = useRef(forwardedRef);
    const trackRef = useRef();

    const {
      max: innerMax = RadixSliderDefaults.max,
      min: innerMin = RadixSliderDefaults.min,
      step: innerStep = RadixSliderDefaults.step,
      orientation: innerOrientation = RadixSliderDefaults.orientation,
    } = props;

    const numberOfTicks = Math.ceil((innerMax - innerMin + 1) / innerStep);
    const maxTickIndex = innerMax - innerMin;
    const isHorizontal = innerOrientation === 'horizontal';
    const isVertical = innerOrientation === 'vertical';

    const ticks = useMemo(
      () =>
        Array.from({ length: numberOfTicks }, (_, i) => {
          const id = `tick-${i * innerStep}`;
          const newPosition = calcStepMarkOffset(
            i * innerStep,
            maxTickIndex,
            thumbWidth
          );
          const tickValue = i * innerStep + innerMin;
          let isInRange = false;
          if (value.length === 2) {
            const [first, second] = value;
            isInRange = first <= tickValue && tickValue <= second;
          }

          return (
            <span
              key={id}
              id={id}
              className={cx(
                styles.Tick,
                isHorizontal && styles.Horizontal,
                isVertical && styles.Vertical,
                isInRange && styles.InRange
              )}
              style={{
                left: isHorizontal ? newPosition : undefined,
                top: isVertical ? newPosition : undefined,
              }}
              role="presentation"
              aria-valuenow={tickValue}
            />
          );
        }),
      [maxTickIndex, thumbWidth, value]
    );

    useLayoutEffect(() => {
      const thumb = sliderRef.current.querySelector(`[id=tick-0]`);
      const width = thumb.offsetWidth;
      setThumbWidth(width);
    }, []);

    function handleValueChange(val) {
      setValue(val);
      onValueChange?.(val);
    }

    return (
      <SliderPrimitive.Slider
        ref={sliderRef}
        className={styles.Slider}
        value={value}
        onValueChange={handleValueChange}
        {...props}
      >
        <SliderPrimitive.Track ref={trackRef} className={styles.Track}>
          <SliderPrimitive.Range className={styles.Range} />
          {ticks}
        </SliderPrimitive.Track>
        {value.map((_, i) => (
          <SliderPrimitive.Thumb key={i} className={styles.Thumb} />
        ))}
      </SliderPrimitive.Slider>
    );
  }
);
