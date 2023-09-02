import { createSlice } from '@reduxjs/toolkit';
import { AddUser, RemoveUser, SearchUser } from '../thunk/UserReducers';

const UserSlice = createSlice({
  name: 'User',
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(AddUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(AddUser.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload !== null && action.payload !== undefined) {
        state.data.push(action.payload);
      }
    });
    builder.addCase(AddUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // ----------------------------------------------------------------------------------
    builder.addCase(RemoveUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(RemoveUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.pop(action.payload);
    });
    builder.addCase(RemoveUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // ----------------------------------------------------------------------------------
    builder.addCase(SearchUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(SearchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(SearchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const UserReducers = UserSlice.reducer;
