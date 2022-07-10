import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

TextInput.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  InputProps: PropTypes.object,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.string,
  color: PropTypes.string,
};

function TextInput(props) {
  const {
    form,
    name,
    label,
    disabled,
    required,
    InputProps,
    autoFocus,
    color,
    autoComplete,
  } = props;
  const {
    control,
    formState: { errors },
  } = form;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <>
          <TextField
            fullWidth
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required ? true : false}
            color={color}
            autoComplete={autoComplete}
            label={label}
            disabled={disabled}
            InputProps={InputProps}
            inputRef={ref}
            autoFocus={autoFocus ? true : false}
            error={errors[name] ? true : false}
            helperText={errors[name] ? errors[name].message : ""}
          />
        </>
      )}
    />
  );
}

export default TextInput;
