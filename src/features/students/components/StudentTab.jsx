import { TabPanel } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterInput from '../../../components/input/FilterInput';
import SearchInput from '../../../components/input/SearchInput';
import { getListGroup, getListGroupBox } from '../../groups/groupSlice';
import { actions, getListLeaderBox, getListStudent } from '../studentSlice';
import StudentHeader from './studentHeader/StudentHeader';
import StudentTable from './studentTable/StudentTable';

const StudentTab = (props) => {
  const dispatch = useDispatch();
  const { params } = useSelector((state) => state.student);
  const { search, filter } = params;
  useEffect(() => {
    const callSearchStudents = async () => {
      if (search !== '') {
        dispatch(getListStudent(params));
        dispatch(actions.setIsLoading(false));
        return;
      }
    };
    callSearchStudents();
  }, [filter]);
  return (
    <>
      <TabPanel value={props.value}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <SearchInput type="student" />
            <FilterInput />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box style={{ height: 375, width: '100%' }}>
              <StudentHeader />
              <StudentTable />
            </Box>
          </Grid>
        </Grid>
      </TabPanel>
    </>
  );
};

export default StudentTab;
