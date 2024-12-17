/** 
 * With a help from @nickluger
 * @see:https://github.com/radix-ui/primitives/issues/1188#issuecomment-1594974370
*/
import { THUMB_SIZE } from "./constants";

export function calcStepMarkOffset(index, maxIndex, thumbSize = THUMB_SIZE) {
  const percent = convertValueToPercentage(index, 0, maxIndex);
  const thumbInBoundsOffset = getThumbInBoundsOffset(thumbSize, percent, 1);
  return `calc(${percent}% + ${thumbInBoundsOffset}px)`;
}

export function convertValueToPercentage(value, min, max) {
  const maxSteps = max - min;
  const percentPerStep = 100 / maxSteps;
  const percentage = percentPerStep * (value - min);
  return clamp(percentage, { max: 100, min: 0 });
}

export function getThumbInBoundsOffset(width, left, direction) {
  const halfWidth = width / 2;
  const halfPercent = 50;
  const offset = linearScale([0, halfPercent], [0, halfWidth]);
  return (halfWidth - offset(left) * direction) * direction;
}

export function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}

export function clamp(value, { min, max }) {
  return Math.min(max, Math.max(min, value));
}

export function isNotNullOrUndefined(value) {
  return value !== null && value !== undefined;
}
