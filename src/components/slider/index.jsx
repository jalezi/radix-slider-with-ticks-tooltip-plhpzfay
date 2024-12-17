import { forwardRef, useRef, useState } from 'react';

import * as SliderPrimitive from '@radix-ui/react-slider';

import { Ticks } from './components/Ticks';
import { RadixSliderDefaults, THUMB_SIZE } from './constants';
import { useThumbWidth } from './hooks/useThumbWidth';

import styles from './slider.module.css';




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
    const sliderRef = useRef(forwardedRef);
    const trackRef = useRef();

    const [value, setValue] = useState(defaultValueProp ?? valueProp ?? [0]);
    const thumbWidth = useThumbWidth(sliderRef, "[id=tick-0]")
    const [tooltipValue, setTooltipValue] = useState(null)


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
          <Ticks
            min={innerMin}
            max={innerMax}
            step={innerStep}
            value={value}
            thumbWidth={thumbWidth}
            orientation={innerOrientation}
          />
        </SliderPrimitive.Track>
        {value.map((_, i) => (
          <SliderPrimitive.Thumb key={i} className={styles.Thumb} />
        ))}
      </SliderPrimitive.Slider>
    );
  }
);
