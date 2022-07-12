import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogNotify from '../../../../components/dialog/DialogNotify';
import Forms from '../../../../components/form/Forms';
import CheckboxInput from '../../../../components/input/CheckboxInput';
import LoadingTable from '../../../../components/loading/LoadingTable';
import { DATA, SIZE, TABLE } from '../../../../constants/common.constant';
import {
  actionsGroup,
  countStudyGroup,
  destroyGroup,
  getGroupDetail,
  getListGroup,
} from '../../groupSlice';
import GroupProcessEditForm from '../groupForm/GroupProcessEditForm';
import './groupTable.css';

function GroupTable() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { listGroup, isLoading, params } = useSelector((state) => state.group);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [groupId, setGroupId] = React.useState();
  React.useEffect(() => {
    dispatch(getListGroup());
  }, [dispatch]);
  React.useEffect(() => {
    const callGetLocalstorage = async () => {
      const Groups = await DATA.GROUPS();
      setRows(Groups);
    };
    callGetLocalstorage();
  }, [listGroup, params]);

  const [groupInForm, setGroupInForm] = React.useState(() => {
    return {
      data: {},
      groupIDForm: 0,
    };
  });
  const [openForms, setOpenForms] = React.useState(false);
  const handleClickOpenForms = () => {
    setOpenForms(true);
  };
  const handleClickCloseForms = () => {
    setOpenForms(false);
  };

  const editGroup = React.useCallback(
    (id) => async () => {
      try {
        const action = getGroupDetail(id);
        const groupDetail = await dispatch(action);
        const groupResult = unwrapResult(groupDetail);
        // console.log(`Group Detail id ${id}: `, groupResult);
        setGroupInForm({ data: groupResult, groupIDForm: id });
        dispatch(actionsGroup.setGroup_ID(id));
      } catch (error) {
        console.log('ERROR EDIT STUDENT: ', error);
      }
      setGroupId(id);
      handleClickOpenForms();
    },
    []
  );
  React.useEffect(() => {
    dispatch(actionsGroup.setGroupItem(groupInForm.data));
  }, []);
  const handleDelete = React.useCallback((id) => {
    setTimeout(async () => {
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      try {
        console.log(id);
        const action = destroyGroup(id);
        const destroy = await dispatch(action);
        const groupResult = unwrapResult(destroy);
        dispatch(getListGroup());
        dispatch(countStudyGroup());
        enqueueSnackbar(groupResult.message, { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    });
    handleClose();
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteGroup = React.useCallback(
    (id) => () => {
      setGroupId(id);
      handleClickOpen();
    },
    []
  );
  const fieldAction = TABLE.COL_GROUP[TABLE.COL_GROUP.length - 1];
  const newFieldAction = {
    ...fieldAction,
    getActions: (params) => [
      <GridActionsCellItem
        title="Edit"
        icon={<EditIcon />}
        label="Edit"
        onClick={editGroup(params.id)}
      />,
      <GridActionsCellItem
        title="Delete"
        icon={<DeleteIcon />}
        label="Delete"
        onClick={deleteGroup(params.id)}
      />,
    ],
  };
  TABLE.COL_GROUP.pop();
  TABLE.COL_GROUP.push(newFieldAction);

  return (
    <>
      {isLoading && <LoadingTable />}
      {!isLoading && (
        <Box style={{ height: 375, width: '100%' }}>
          <DialogNotify
            open={open}
            handleClose={handleClose}
            title="Delete a group"
            content={`Are you sure you want to delete the group whose id is ${groupId}?`}
            id={groupId}
            handleDelete={handleDelete}
          />
          <Forms
            openForms={openForms}
            handleCloseForms={handleClickCloseForms}
            componentForms={<GroupProcessEditForm closeDialog={handleClickCloseForms} />}
          />
          <DataGrid
            components={{
              BaseCheckbox: CheckboxInput,
            }}
            rows={rows}
            columns={TABLE.COL_GROUP}
            checkboxSelection
            pageSize={SIZE.ROWS}
            rowsPerPageOptions={[SIZE.ROWS]}
          />
        </Box>
      )}
    </>
  );
}
export default GroupTable;
