import React from "react";
import InputRange from "react-input-range";

function DefaultInputRange({
  step = 5,
  minValue = 0,
  maxValue = 100,
  ...rest
}) {
  return (
    <InputRange step={step} minValue={minValue} maxValue={maxValue} {...rest} />
  );
}

export default DefaultInputRange;
