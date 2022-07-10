import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../features/students/studentSlice";
import groupReducer from "../features/groups/groupSlice";
const rootReducer = {
  student: studentReducer,
  group: groupReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
