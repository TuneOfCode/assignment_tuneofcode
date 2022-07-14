import CreateIcon from '@mui/icons-material/Create';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Forms from '../../../../components/form/Forms';
import { getListGroupBox } from '../../../groups/groupSlice';
import { countStudentRegistered } from '../../studentSlice';
import StudentProcessCreateForm from '../studentForm/StudentProcessCreateForm';

const StudentHeader = () => {
  const [openForms, setOpenForms] = React.useState(false);
  const dispatch = useDispatch();
  const { count_student_registered } = useSelector((state) => state.student);
  React.useEffect(() => {
    dispatch(getListGroupBox());
    dispatch(countStudentRegistered());
  }, []);
  const handleClickOpenForms = () => {
    setOpenForms(true);
  };
  const handleClickCloseForms = () => {
    setOpenForms(false);
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
        <PersonOutlineIcon sx={{ fontSize: '40px' }} />
        <Typography variant="h6" sx={{ marginLeft: '5px' }}>
          {count_student_registered} students
        </Typography>
        <ButtonGroup
          variant="contained"
          sx={{
            marginLeft: '8px',
            backgroundColor: '#34CAE0',
            ':hover': {
              backgroundColor: '#34CAE0',
            },
          }}
        >
          <Button
            onClick={handleClickOpenForms}
            className="button-create-icon"
            sx={{
              backgroundColor: '#09bdd8',
              ':hover': {
                backgroundColor: '#09bdd8',
              },
            }}
          >
            <CreateIcon />
          </Button>
          <Button
            onClick={handleClickOpenForms}
            sx={{
              backgroundColor: '#34CAE0',
              ':hover': {
                backgroundColor: '#34CAE0',
                opacity: 1,
              },
            }}
          >
            New
          </Button>
        </ButtonGroup>
      </Box>
      <Forms
        openForms={openForms}
        handleCloseForms={handleClickCloseForms}
        componentForms={<StudentProcessCreateForm closeDialog={handleClickCloseForms} />}
      />
    </>
  );
};

export default StudentHeader;
