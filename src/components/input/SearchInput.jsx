import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputBase, Paper, Typography } from '@mui/material';
import Proptypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { common_css } from '../../constants/common.constant';
import { actionsGroup, getListGroup } from '../../features/groups/groupSlice';
import { actions, getListStudent } from '../../features/students/studentSlice';

import useDebounce from '../../hooks/useDebounce';
const SearchInput = (props) => {
  const dispatch = useDispatch();
  const { params } = useSelector((state) => state.student);
  const [values, setValues] = useState('');
  const [isActiveCloseBtn, setIsActiveCloseBtn] = useState(false);
  const { type } = props;

  const debounce = useDebounce(values, 600);
  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setValues(value);
    if (value !== '') {
      setIsActiveCloseBtn(true);
    } else {
      setIsActiveCloseBtn(false);
    }
  };
  const handleClickClose = () => {
    setValues('');
    setIsActiveCloseBtn(false);
  };
  useEffect(() => {
    dispatch(actions.setSearch(values));
  }, [debounce, values]);
  useEffect(() => {
    const callSearchStudents = async () => {
      const { search } = params;
      const filters = {
        search: search,
      };
      if (!debounce.trim()) {
        if (params.filter.length > 0) {
          dispatch(getListStudent(params));
          dispatch(actions.setIsLoading(false));
          return;
        }
      }
      if (type === 'student') {
        dispatch(getListStudent(filters));
        dispatch(actions.setIsLoading(false));
      } else {
        dispatch(getListGroup(filters));
        dispatch(actionsGroup.setIsLoading(false));
      }
    };
    callSearchStudents();
  }, [debounce]);

  return (
    <Box>
      <Typography
        variant="h6"
        textTransform="uppercase"
        sx={{
          color: common_css.text_color_title,
          fontWeight: 600,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        Search for name
      </Typography>
      <Paper
        sx={{
          backgroundColor: common_css.bg_main,
          display: 'flex',
          alignItems: 'center',
          width: { xs: '100%', md: 250 },
          fontSize: '20px',
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          value={values}
          onChange={(e) => handleChangeSearch(e)}
        />
        {isActiveCloseBtn && (
          <IconButton onClick={handleClickClose} sx={{ p: '10px' }} aria-label="menu">
            <CloseIcon />
          </IconButton>
        )}
      </Paper>
    </Box>
  );
};

SearchInput.propTypes = {
  type: Proptypes.string.isRequired,
};

export default SearchInput;
