import { Box, Checkbox, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { common_css } from '../../constants/common.constant';
import { actions, getListStudent } from '../../features/students/studentSlice';

const FilterInput = () => {
  const dispatch = useDispatch();
  const { groupBox, params } = useSelector((state) => state.group);

  const [values, setValues] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const handleChecked = (e) => {
    const {
      target: { value, checked },
    } = e;
    setIsChecked(checked);
    let groupNames = [...values, value];
    if (values.includes(value)) {
      groupNames = groupNames.filter((item) => item != value);
    }
    setValues(groupNames);
  };

  useEffect(() => {
    dispatch(actions.setFilter(values));
    const filters = {
      filter: values,
    };
    dispatch(getListStudent(filters));
    dispatch(actions.setIsLoading(false));
  }, [values, isChecked]);
  return (
    <Box
      className="scrollbar"
      sx={{
        marginTop: '20px',
      }}
    >
      <Typography
        variant="h6"
        textTransform="uppercase"
        sx={{
          color: common_css.text_color_title,
          fontWeight: 600,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        FILTERS FOR STUDY GROUPS
      </Typography>
      <Box
        sx={{
          display: { xs: 'flex', md: 'block' },
          height: { xs: 'auto', md: '300px' },
          overflowY: 'hiden',
          flexWrap: 'wrap',
          justifyContent: { xs: 'center', md: 'flex-start' },
        }}
      >
        {groupBox.map((group) => (
          <Box
            key={group.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 'auto',
            }}
          >
            {/* <CheckboxInput value={group.name} sx={{ display: "block" }} /> */}
            <Checkbox
              value={group.name}
              onChange={(e) => handleChecked(e)}
              color="warning"
            />
            <Typography sx={{ color: '#333', fontWeight: 600 }}>{group.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FilterInput;
