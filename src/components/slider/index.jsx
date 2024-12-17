import { forwardRef, useRef, useState } from 'react';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as Tooltip from '@radix-ui/react-tooltip';

import { Ticks } from './components/Ticks';
import { RadixSliderDefaults } from './constants';
import { useThumbWidth } from './hooks/useThumbWidth';

import styles from './slider.module.css';
import { isNotNullOrUndefined } from './utils';
import { cx } from 'class-variance-authority';

export const Slider = forwardRef(
  (
    { className, onValueChange, defaultValue: defaultValueProp, value: valueProp, ...props },
    forwardedRef
  ) => {
    const sliderRef = useRef(forwardedRef);
    const trackRef = useRef();

    const [value, setValue] = useState(defaultValueProp ?? valueProp ?? [0]);
    const [tooltipValue, setTooltipValue] = useState(null);
    const [tooltipOffset, setTooltipOffset] = useState(0);
    const thumbWidth = useThumbWidth(sliderRef, '[id=tick-0]');

    const {
      max: innerMax = RadixSliderDefaults.max,
      min: innerMin = RadixSliderDefaults.min,
      step: innerStep = RadixSliderDefaults.step,
      orientation: innerOrientation = RadixSliderDefaults.orientation,
    } = props;

    function handleValueChange(val) {
      setValue(val);
      onValueChange?.(val);
    }

    function hadlePointerEnter(event) {
      const slider = sliderRef.current;
      if (!slider) return;

      const rect = slider.getBoundingClientRect(); // Get slider position and dimensions
      const pointerPosition = event.clientX - rect.left; // Pointer position relative to slider start
      const percentage = pointerPosition / rect.width; // Relative percentage (0 to 1)

      // Calculate the value based on min, max, and percentage
      const value = Math.round(innerMin + percentage * (innerMax - innerMin));

      setTooltipValue(value);
      setTooltipOffset(pointerPosition);
    }

    function handlePointerLeave() {
      setTooltipValue(null);
    }

    return (
      <SliderPrimitive.Slider
        ref={sliderRef}
        className={cx(styles.Slider, className)}
        value={value}
        onValueChange={handleValueChange}
        onPointerEnter={hadlePointerEnter}
        onPointerMove={hadlePointerEnter}
        onPointerLeave={handlePointerLeave}
        {...props}
      >
        <Tooltip.Root open={isNotNullOrUndefined(tooltipValue)}>
          <Tooltip.Trigger asChild>
            <SliderPrimitive.Track ref={trackRef} className={styles.Track}>
              <SliderPrimitive.Range className={styles.Range} />
              <Ticks
                min={innerMin}
                max={innerMax}
                step={innerStep}
                value={value}
                thumbWidth={thumbWidth}
                orientation={innerOrientation}
              />
            </SliderPrimitive.Track>
          </Tooltip.Trigger>
          {value.map((_, i) => (
            <SliderPrimitive.Thumb key={i} className={styles.Thumb} />
          ))}

          <Tooltip.Content
            id="track-tooltip"
            align="start"
            alignOffset={tooltipOffset}
            sideOffset={thumbWidth / 2 + 2}
            className={styles.TooltipContent}
          >
            {tooltipValue}
          </Tooltip.Content>
        </Tooltip.Root>
      </SliderPrimitive.Slider>
    );
  }
);

Slider.displayName = 'Slider';
