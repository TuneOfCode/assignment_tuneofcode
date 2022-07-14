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
import { PARAMS, SIZE, TABLE } from '../../../../constants/common.constant';
import {
  actions,
  countStudentRegistered,
  destroyStudent,
  getListStudent,
  getStudentDetail,
} from '../../studentSlice';
import StudentProcessEditForm from '../studentForm/StudentProcessEditForm';
import './studentTable.css';

function StudentTable() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { listStudent, isLoading } = useSelector((state) => state.student);

  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [studentId, setStudentId] = React.useState();
  React.useEffect(() => {
    setRows(listStudent);
  }, [listStudent]);

  const [studentInForm, setStudentInForm] = React.useState(() => {
    return {
      data: {},
      studentIDForm: 0,
    };
  });
  const [openForms, setOpenForms] = React.useState(false);
  const handleClickOpenForms = () => {
    setOpenForms(true);
  };
  const handleClickCloseForms = () => {
    setOpenForms(false);
  };

  const editUser = React.useCallback(
    (id) => async () => {
      try {
        const action = getStudentDetail(id);
        const studentDetail = await dispatch(action);
        const studentResult = unwrapResult(studentDetail);
        // console.log(`Student Detail id ${id}: `, studentResult);
        setStudentInForm({ data: studentResult, studentIDForm: id });
        dispatch(actions.setStudent_ID(id));
      } catch (error) {
        console.log('ERROR EDIT STUDENT: ', error);
      }
      setStudentId(id);
      handleClickOpenForms();
    },
    []
  );
  React.useEffect(() => {
    dispatch(actions.setStudentItem(studentInForm.data));
  }, []);
  const handleDelete = React.useCallback((id) => {
    setTimeout(async () => {
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      try {
        console.log(id);
        const action = destroyStudent(id);
        const destroy = await dispatch(action);
        const studentResult = unwrapResult(destroy);
        dispatch(countStudentRegistered());
        enqueueSnackbar(studentResult.message, { variant: 'success' });
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
  const deleteUser = React.useCallback(
    (id) => () => {
      setStudentId(id);
      handleClickOpen();
    },
    []
  );
  const fieldAction = TABLE.COL_STUDENT[TABLE.COL_STUDENT.length - 1];
  const newFieldAction = {
    ...fieldAction,
    getActions: (params) => [
      <GridActionsCellItem
        title="Edit"
        icon={<EditIcon />}
        label="Edit"
        onClick={editUser(params.id)}
      />,
      <GridActionsCellItem
        title="Delete"
        icon={<DeleteIcon />}
        label="Delete"
        onClick={deleteUser(params.id)}
      />,
    ],
  };
  TABLE.COL_STUDENT.pop();
  TABLE.COL_STUDENT.push(newFieldAction);
  const [selectedRows, setSelectedRows] = React.useState([]);
  return (
    <>
      {isLoading && <LoadingTable />}
      {!isLoading && (
        <Box
          sx={{
            height: SIZE.HEIGHT_TABLE,
            width: '100%',
          }}
        >
          <DialogNotify
            open={open}
            handleClose={handleClose}
            title="Delete a student"
            content={`Are you sure you want to delete the student whose id is ${studentId}?`}
            id={studentId}
            handleDelete={handleDelete}
          />
          <Forms
            openForms={openForms}
            handleCloseForms={handleClickCloseForms}
            componentForms={
              <StudentProcessEditForm closeDialog={handleClickCloseForms} />
            }
          />
          {/* <pre style={{ fontSize: 10 }}>{JSON.stringify(selectedRows, null, 4)}</pre> */}
          <DataGrid
            className="scrollbar"
            components={{
              BaseCheckbox: CheckboxInput,
            }}
            rows={rows}
            columns={TABLE.COL_STUDENT}
            checkboxSelection
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = rows.filter((row) => selectedIDs.has(row.id));

              setSelectedRows(selectedRows);
            }}
            pageSize={PARAMS.LIMIT || SIZE.ROWS}
            rowsPerPageOptions={[PARAMS.LIMIT || SIZE.ROWS]}
          />
        </Box>
      )}
    </>
  );
}
export default StudentTable;
