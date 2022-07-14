import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../utils';
import {
  countStudentRegistered,
  createStudent,
  getListStudent,
} from '../../studentSlice';
import StudentFormCreate from './StudentFormCreate';

StudentProcessCreateForm.propTypes = {
  closeDialog: PropTypes.func,
};

function StudentProcessCreateForm(props) {
  const dispatch = useDispatch();
  const { listStudent } = useSelector((state) => state.student);
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      const { closeDialog } = props;
      const { birth_date } = values;
      const formatBirthDate = utils.convertStringToDate(birth_date);
      const payload = {
        ...values,
        birth_date: formatBirthDate,
      };
      // console.log(">>>> Forms Value: ", payload);
      const action = createStudent(payload);
      const resultAction = await dispatch(action);
      const studentResult = unwrapResult(resultAction);
      // console.log(">>> New Student: ", studentResult);
      dispatch(getListStudent());
      dispatch(countStudentRegistered());
      if (closeDialog) closeDialog();
      enqueueSnackbar(studentResult.message, { variant: 'success' });
    } catch (error) {
      console.log('>>>> ERROR CATCH: ', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return <StudentFormCreate onSubmit={handleSubmit} />;
}

export default StudentProcessCreateForm;
