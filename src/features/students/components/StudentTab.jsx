import { TabPanel } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import React from 'react';
import FilterInput from '../../../components/input/FilterInput';
import SearchInput from '../../../components/input/SearchInput';
import StudentHeader from './studentHeader/StudentHeader';
import StudentTable from './studentTable/StudentTable';

const StudentTab = (props) => {
  return (
    <>
      <TabPanel value={props.value}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <SearchInput type="student" />
            <FilterInput />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box style={{ height: 371, width: '100%' }}>
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
