import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../apis/user.api';
import { PARAMS } from '../../constants/common.constant';
import StorageKey from '../../constants/storage.key';

export const createStudent = createAsyncThunk('students/create', async (payload) => {
  const response = await userApi.create(payload);
  return response;
});
export const getListStudent = createAsyncThunk(
  'students/getListStudent',
  async (params = {}) => {
    const students = await userApi.getListStudent(params);
    const newStudentArray = await students.data.map((student) => {
      const { id, avatar, name, sex, birth_place, birth_date, groups } = student;
      const groupsName = groups.map((item) => item.name).join(', ');
      return {
        id,
        avatar,
        name,
        sex,
        placeAndDatebirth: `${birth_place}, ${birth_date}`,
        groups: groupsName,
      };
    });
    localStorage.setItem(StorageKey.STUDENTS, JSON.stringify(newStudentArray));
    return newStudentArray;
  }
);
export const getListLeaderBox = createAsyncThunk(
  'students/getListLeaderBox',
  async () => {
    const leaders = await userApi.getListLeaders();
    const leaderIdAndName = await leaders.data.map((leader) => {
      return {
        id: leader.id,
        name: leader.name,
      };
    });
    return leaderIdAndName;
  }
);
export const countStudentRegistered = createAsyncThunk(
  'students/registered',
  async () => {
    const studentRegistered = await userApi.getStudentRegistered();
    return studentRegistered.data;
  }
);
export const getStudentDetail = createAsyncThunk('students/detail', async (id) => {
  const student = await userApi.getStudentDetail(id);
  const newStudentArray = await student.data.map((student) => {
    const { id, avatar, email, name, sex, birth_place, birth_date, groups } = student;
    const groupsId = groups.map((item) => item.id);
    return {
      id,
      avatar,
      name,
      email,
      sex,
      placeAndDatebirth: `${birth_place}, ${birth_date}`,
      birth_place,
      birth_date,
      group_ids: groupsId,
    };
  });
  const data = newStudentArray[0];
  return data;
});
export const editStudent = createAsyncThunk('students/edit', async ({ payload, id }) => {
  const student = await userApi.update(payload, id);
  return student;
});
export const destroyStudent = createAsyncThunk('students/destroy', async (id) => {
  const student = await userApi.destroy(id);
  return student;
});
export const filtersStudent = createAsyncThunk('students/filters', async (params) => {
  const students = await userApi.getListStudent(params);
  const newStudentArray = await students.data.map((student) => {
    const { id, avatar, name, sex, birth_place, birth_date, groups } = student;
    const groupsName = groups.map((item) => item.name).join(', ');
    return {
      id,
      avatar,
      name,
      sex,
      placeAndDatebirth: `${birth_place}, ${birth_date}`,
      groups: groupsName,
    };
  });
  localStorage.setItem(StorageKey.STUDENTS, JSON.stringify(newStudentArray));
  return newStudentArray;
});

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    studentItem: {},
    student_ID: 0,
    listStudent: [],
    listLeaderBox: [],
    isLoading: false,
    status: '',
    params: {
      search: '',
      filter: '',
      page: PARAMS.PAGE,
      limit: PARAMS.LIMIT,
    },
    count_student_registered: 0,
  },
  reducers: {
    setStudent_ID: (state, action) => {
      state.student_ID = action.payload;
    },
    setStudentItem: (state, action) => {
      state.studentItem = action.payload;
    },
    setSearch: (state, action) => {
      state.params.search = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setStudentSearch: (state, action) => {
      state.studentSearch = action.payload;
    },
  },
  extraReducers: {
    [createStudent.pending]: (state) => {
      state.isLoading = true;
      state.status = 'pending';
    },
    [createStudent.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.isLoading = true;
      state.studentItem = data;
      state.listStudent = [data];
      state.status = 'success';
    },
    [createStudent.rejected]: (state) => {
      state.isLoading = false;
      state.status = 'failure';
    },
    [getListStudent.pending]: (state, action) => {
      const meta = action.meta.arg;
      if (meta) state.isLoading = true;
      state.status = 'pending';
    },
    [getListStudent.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.listStudent = action.payload;
      state.status = 'success';
    },
    [getListStudent.rejected]: (state) => {
      state.isLoading = false;
      state.status = 'failure';
    },
    [getListLeaderBox.fulfilled]: (state, action) => {
      state.listLeaderBox = action.payload;
    },
    [countStudentRegistered.pending]: (state) => {
      state.isLoading = true;
      state.status = 'pending';
    },
    [countStudentRegistered.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.count_student_registered = action.payload;
      state.status = 'success';
    },
    [countStudentRegistered.rejected]: (state) => {
      state.isLoading = false;
      state.status = 'failure';
    },
    [getStudentDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.studentItem = action.payload;
      state.status = 'success';
    },
    [getStudentDetail.rejected]: (state) => {
      state.isLoading = false;
      state.status = 'failure';
    },
    [editStudent.pending]: (state) => {
      state.isLoading = true;
      state.status = 'pending';
    },
    [editStudent.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { data } = action.payload;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.listStudent = state.listStudent.map((item) =>
          item.id === id ? data : item
        );
      }
      state.status = 'success';
    },
    [editStudent.rejected]: (state) => {
      state.isLoading = false;
      state.status = 'failure';
    },
    [destroyStudent.pending]: (state) => {
      state.isLoading = true;
      state.status = 'pending';
    },
    [destroyStudent.fulfilled]: (state, action) => {
      const {
        arg: { id },
      } = action.meta;
      state.listStudent.filter((item) => item.id !== id);
      state.isLoading = false;
      state.status = 'success';
    },
    [destroyStudent.rejected]: (state) => {
      state.isLoading = false;
      state.status = 'failure';
    },
    [filtersStudent.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.isLoading = false;
      state.listStudent = data;
      state.status = 'success';
    },
    [filtersStudent.rejected]: (state) => {
      state.isLoading = false;
      state.status = 'failure';
    },
  },
});
export const { actions, reducer } = studentSlice;
export default reducer;
