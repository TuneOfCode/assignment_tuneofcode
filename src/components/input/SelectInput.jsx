import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import * as React from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { FormHelperText } from '@mui/material';
import { common_css } from '../../constants/common.constant';
import utils from '../../utils/index';

SelectInput.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  multiple: PropTypes.bool,
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function SelectInput(props) {
  const { form, name, multiple, items, label } = props;
  const {
    control,
    formState: { errors },
  } = form;
  const handleLengthInGroups = (e, onChange) => {
    const { value } = e.target;
    const unique = value.filter(utils.onlyUnique);
    if (unique.length > 4) return;
    onChange(e);
  };

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <FormControl sx={{ width: '100%' }}>
            <InputLabel required color="warning">
              {label}
            </InputLabel>

            <Select
              name={name}
              // defaultValue={[]}
              value={value || []}
              onChange={
                label === 'Groups'
                  ? (e) => handleLengthInGroups(e, onChange)
                  : (e) => onChange(e)
              }
              multiple={multiple}
              onBlur={onBlur}
              inputRef={ref}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
              color="warning"
              error={errors[name] ? true : false}
            >
              {/* {label !== "Groups" &&
                items.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))} */}
              {label === 'Sex' &&
                items.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              {/* {label === "Groups" &&
                items.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))} */}
              {label !== 'Sex' &&
                items.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              {/* {label === "Sex"
                ? items.map((item, i) => (
                    <MenuItem key={i} value={item}>
                      {item}
                    </MenuItem>
                  ))
                : items.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))} */}
            </Select>
            <FormHelperText sx={{ color: common_css.text_color_error }}>
              {errors[name] ? errors[name].message : ''}
            </FormHelperText>
          </FormControl>
        )}
      />
    </div>
  );
}
