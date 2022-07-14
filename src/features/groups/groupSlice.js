import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import groupApi from '../../apis/group.api';
import StorageKey from '../../constants/storage.key';
export const getListGroupBox = createAsyncThunk('groups/getListGroupBox', async () => {
  const groups = await groupApi.getAll();
  const groupsIdAndName = groups.data.map((group) => {
    return {
      id: group.id,
      name: group.name,
    };
  });
  return groupsIdAndName;
});
export const getListGroup = createAsyncThunk(
  'groups/getListGroup',
  async (params = {}) => {
    const groups = await groupApi.getAll(params);
    const newGroupArray = await groups.data.map((group) => {
      const { id, name, subject, leader } = group;
      return {
        id,
        name,
        subject,
        leader: leader.name,
      };
    });
    localStorage.setItem(StorageKey.GROUPS, JSON.stringify(newGroupArray));
    return newGroupArray;
  }
);
export const countStudyGroup = createAsyncThunk('groups/countStudyGroups', async () => {
  const count_study_groups = await groupApi.getCountGroupsAndCountStudentsStudying();
  return count_study_groups.data;
});
export const createGroup = createAsyncThunk('groups/create', async (payload) => {
  const response = await groupApi.create(payload);
  return response;
});
export const getGroupDetail = createAsyncThunk('groups/getGroupDetail', async (id) => {
  const groups = await groupApi.getGroupDetail(id);
  const newGroupArray = await groups.data.map((group) => {
    const { id, name, subject, leader } = group;
    // const leadersId = leader.map((item) => item.id);
    return {
      id,
      name,
      subject,
      leader: leader.id,
    };
  });
  const data = newGroupArray[0];
  return data;
});
export const editGroup = createAsyncThunk('groups/edit', async ({ payload, id }) => {
  const group = await groupApi.update(payload, id);
  return group;
});
export const destroyGroup = createAsyncThunk('groups/destroy', async (id) => {
  const group = await groupApi.destroy(id);
  return group;
});
const groupSlice = createSlice({
  name: 'groups',
  initialState: {
    isLoading: false,
    status: '',
    groupItem: {},
    group_ID: 0,
    groupBox: [],
    listGroup: [],
    params: {
      search: '',
    },
    count_study_groups: 0,
  },
  reducers: {
    setGroup_ID: (state, action) => {
      state.group_ID = action.payload;
    },
    setGroupItem: (state, action) => {
      state.groupItem = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [getListGroupBox.fulfilled]: (state, action) => {
      state.groupBox = action.payload;
    },
    [getListGroup.pending]: (state, action) => {
      const meta = action.meta.arg;
      if (meta) state.isLoading = true;
      state.status = 'pending';
    },
    [getListGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.listGroup = action.payload;
      state.status = 'success';
    },
    [getListGroup.rejected]: (state) => {
      state.isLoading = false;
      state.status = 'failure';
    },
    [countStudyGroup.pending]: (state) => {
      state.isLoading = true;
      state.status = 'pending';
    },
    [countStudyGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.count_study_groups = action.payload;
      state.status = 'success';
    },
    [countStudyGroup.rejected]: (state) => {
      state.isLoading = false;
      state.status = 'failure';
    },
    [createGroup.pending]: (state) => {
      state.isLoading = true;
      state.status = 'pending';
    },
    [createGroup.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.isLoading = true;
      state.listGroup = [data];
      state.status = 'success';
    },
    [createGroup.rejected]: (state) => {
      state.isLoading = false;
      state.status = 'failure';
    },
    [getGroupDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.groupItem = action.payload;
      state.status = 'success';
    },
    [getGroupDetail.rejected]: (state) => {
      state.isLoading = false;
      state.status = 'failure';
    },
    [editGroup.pending]: (state) => {
      state.isLoading = true;
      state.status = 'pending';
    },
    [editGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { data } = action.payload;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.listGroup = state.listGroup.map((item) => (item.id === id ? data : item));
      }
      state.status = 'success';
    },
    [editGroup.rejected]: (state) => {
      state.isLoading = false;
      state.status = 'failure';
    },
    [destroyGroup.pending]: (state) => {
      state.isLoading = true;
      state.status = 'pending';
    },
    [destroyGroup.fulfilled]: (state, action) => {
      const {
        arg: { id },
      } = action.meta;
      state.listGroup.filter((item) => item.id !== id);
      state.isLoading = false;
      state.status = 'success';
    },
    [destroyGroup.rejected]: (state) => {
      state.isLoading = false;
      state.status = 'failure';
    },
  },
});

export const { reducer } = groupSlice;
export const actionsGroup = groupSlice.actions;
export default reducer;
