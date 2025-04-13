import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const fetchProjects = createAsyncThunk('projects/fetchProjectsStatus', async () => {
  const response = await axios.get('/projects/');
  return response.data.projects;
});

const initialState = {
  projects: [],
  status: 'loading',
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.projects = [];
      state.status = 'loading';
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchProjects.rejected, (state) => {
      state.projects = [];
      state.status = 'error';
    });
  },
});

export const selectProjects = (state) => state.projects;

export default projectsSlice.reducer;
