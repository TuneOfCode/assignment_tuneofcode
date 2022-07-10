import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { countStudyGroup, createGroup, getListGroup } from '../../groupSlice';
import GroupFormCreate from './GroupFormCreate';

GroupProcessCreateForm.propTypes = {
  closeDialog: PropTypes.func,
};

function GroupProcessCreateForm(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { closeDialog } = props;
  const handleSubmit = async (values) => {
    try {
      const { leader } = values;
      const payload = {
        ...values,
        leader_id: leader,
      };
      // console.log('>>>> Forms Value: ', payload);
      const action = createGroup(payload);
      const resultAction = await dispatch(action);
      const groupResult = unwrapResult(resultAction);
      // console.log('>>> New Group: ', groupResult);
      dispatch(getListGroup());
      dispatch(countStudyGroup());
      if (closeDialog) closeDialog();
      enqueueSnackbar(groupResult.message, { variant: 'success' });
    } catch (error) {
      console.log('>>>> ERROR CATCH: ', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return <GroupFormCreate onSubmit={handleSubmit} />;
}

export default GroupProcessCreateForm;
