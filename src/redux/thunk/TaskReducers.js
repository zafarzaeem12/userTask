import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetFunction } from '../../Functions/GetFunction';
import { PostFunction } from '../../Functions/PostFunction';
import { api } from '../../Apis';

const AddTask = createAsyncThunk('task/add', async ({data , tc}) => {
  const link = api?.CreateTask;
  const response = await PostFunction(link, data , tc);
  if (response && response.status === 200) {
    return response;
  } 
    return response;
});

const GetTask = createAsyncThunk('task/get', async (arg) => {
  const link = api?.GetTask;
  const response = await GetFunction(link, arg);
  if (response) {
    return response.data
    ;
  } 
    return response;
});

// const RemoveUser = createAsyncThunk('user/logout', async (data) => {
//   const link = api?.Logout;
//   const response = await PostFunction(link, data);
//   return response;
// });

export { AddTask , GetTask };
