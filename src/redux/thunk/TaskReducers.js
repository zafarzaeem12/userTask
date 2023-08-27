import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostFunction } from '../../Functions/PostFunction';
import { api } from '../../Apis';

const AddTask = createAsyncThunk('task/add', async ({data , token}) => {
  const link = api?.CreateTask;
  const response = await PostFunction(link, data , token);
  if (response && response.status === 200) {
    return response;
  } 
    return response;
});

// const RemoveUser = createAsyncThunk('user/logout', async (data) => {
//   const link = api?.Logout;
//   const response = await PostFunction(link, data);
//   return response;
// });

export { AddTask };
