import { createSlice } from "@reduxjs/toolkit";

// Initial state for students
const initialState = {
  students: [], // Array to hold student data
};

// Create the student slice
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    // Reducer to set all students
    setAllStudents: (state, action) => {
      state.students = action.payload;
    },
    // Add additional reducers as needed
  },
});

// Export actions
export const { setAllStudents } = studentSlice.actions;

// Export the reducer to be included in the Redux store
export default studentSlice.reducer;
