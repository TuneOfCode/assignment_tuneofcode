import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countStudyGroup, editGroup, getListGroup } from '../../groupSlice';
import GroupFormEdit from './GroupFormEdit';

GroupProcessEditForm.propTypes = {
  closeDialog: PropTypes.func,
};

function GroupProcessEditForm(props) {
  const dispatch = useDispatch();
  const { group_ID } = useSelector((state) => state.group);
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
      const id = group_ID;
      // console.log('ID group update: ', id);
      const action = editGroup({ payload, id });
      const groupEdit = await dispatch(action);
      const groupEditResult = unwrapResult(groupEdit);
      // console.log('>>> Edit Group: ', groupEditResult);
      dispatch(getListGroup());
      dispatch(countStudyGroup());
      if (closeDialog) closeDialog();
      enqueueSnackbar(groupEditResult.message, { variant: 'success' });
    } catch (error) {
      console.log('>>>> ERROR CATCH: ', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return <GroupFormEdit onSubmit={handleSubmit} />;
}

export default GroupProcessEditForm;
