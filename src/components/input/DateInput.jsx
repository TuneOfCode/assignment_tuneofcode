import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

DateInput.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  inputFormat: PropTypes.string,
};

function DateInput(props) {
  const { name, label, form, inputFormat } = props;
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              name={name}
              label={label}
              value={value}
              onChange={onChange}
              inputFormat={inputFormat}
              onBlur={onBlur}
              inputRef={ref}
              renderInput={(params) => (
                <TextField
                  {...params}
                  color="info"
                  error={errors[name] ? true : false}
                  helperText={errors[name] ? errors[name].message : ""}
                />
              )}
            />
          </LocalizationProvider>
        </>
      )}
    />
  );
}
export default DateInput;
