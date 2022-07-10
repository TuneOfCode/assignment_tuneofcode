import { Checkbox } from "@mui/material";
import { forwardRef } from "react";

const CheckboxInput = forwardRef((props, ref) => {
  return (
    <Checkbox
      value={props.value}
      color="warning"
      sx={props.sx}
      ref={ref}
      {...props}
    />
  );
});

export default CheckboxInput;
