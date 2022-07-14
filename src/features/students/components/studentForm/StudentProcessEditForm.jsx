import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../utils';
import {
  actions,
  countStudentRegistered,
  editStudent,
  getListStudent,
} from '../../studentSlice';
import StudentFormEdit from './StudentFormEdit';

StudentProcessEditForm.propTypes = {
  closeDialog: PropTypes.func,
};

function StudentProcessEditForm(props) {
  const dispatch = useDispatch();
  const { student_ID } = useSelector((state) => state.student);
  const { enqueueSnackbar } = useSnackbar();
  const { closeDialog } = props;
  const handleSubmit = async (values) => {
    try {
      const { birth_date } = values;
      const formatBirthDate = utils.convertStringToDate(birth_date);
      const payload = {
        ...values,
        birth_date: formatBirthDate,
      };
      // console.log('>>>> Forms Value: ', payload);
      const id = student_ID;
      const action = editStudent({ payload, id });
      const studentEdit = await dispatch(action);
      const studentEditResult = unwrapResult(studentEdit);
      // console.log('>>> Edit Student: ', studentEditResult);
      dispatch(getListStudent());
      dispatch(countStudentRegistered());
      if (closeDialog) closeDialog();
      enqueueSnackbar(studentEditResult.message, { variant: 'success' });
    } catch (error) {
      console.log('>>>> ERROR CATCH: ', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return <StudentFormEdit onSubmit={handleSubmit} />;
}

export default StudentProcessEditForm;
