import { TabContext, TabList } from '@mui/lab';
import { Box, Tab, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { common_css } from '../../constants/common.constant';
import GroupTab from '../../features/groups/components/GroupTab';
import StudentTab from '../../features/students/components/StudentTab';
import './tab.css';
const TabChildren = ({ tabName, description }) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontSize: '18px', fontWeight: 700 }}>
        {tabName}
      </Typography>
      <Typography sx={{ fontSize: '15px', color: '#333', textTransform: 'lowercase' }}>
        {description}
      </Typography>
    </Box>
  );
};
const TabAll = () => {
  const [value, setValue] = useState('1');
  const { count_student_registered } = useSelector((state) => state.student);
  const { count_study_groups } = useSelector((state) => state.group);
  const tabCss = {
    fontSize: '18px',
    fontWeight: 700,
    height: '120px',
    width: { xs: '300px', md: '100%' },
    borderRadius: '8px',
    margin: '0 5px',
    backgroundColor: '#eff3f5',
  };
  const activeCss = {
    ...tabCss,
    color: '#34cae0',
    backgroundColor: 'white',
  };
  const handleChangeTab = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <TabContext value={value}>
        <Box bgcolor={common_css.bg_main}>
          <TabList
            textColor="inherit"
            sx={{
              color: '#989a9c',
              backgroundColor: '#e8ecef',
            }}
            onChange={handleChangeTab}
          >
            <Tab
              sx={value === '1' ? activeCss : tabCss}
              label={
                <TabChildren
                  tabName="Students"
                  description={`${count_student_registered} students registered`}
                />
              }
              value="1"
            />

            <Tab
              sx={value === '2' ? activeCss : tabCss}
              label={
                <TabChildren
                  tabName="Study Groups"
                  description={` ${count_study_groups} study groups with ${count_student_registered} students`}
                />
              }
              value="2"
            />
          </TabList>
        </Box>
        <StudentTab value="1" />
        <GroupTab value="2" />
      </TabContext>
    </Box>
  );
};

export default TabAll;
