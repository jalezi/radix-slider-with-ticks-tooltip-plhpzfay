import { useLayoutEffect, useState } from "react";

import { THUMB_SIZE } from "../constants";

export function useThumbWidth(parentRef, selector = "[id=tick-0]", defaultSize = THUMB_SIZE) {
  const [width, setWidth] = useState(defaultSize);

  useLayoutEffect(() => {
    const thumb = parentRef.current.querySelector(selector);
    const width = thumb?.offsetWidth;
    if (width) setWidth(width);
  }, []);


  return width
}