import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostFunction } from '../../Functions/PostFunction';
import { GetFunction } from '../../Functions/GetFunction';
import { api } from '../../Apis';

const AddUser = createAsyncThunk('user/login', async (data) => {
  const link = api?.Login;
  const response = await PostFunction(link, data);
  if (response && response.status === 200) {
    return response;
  } 
    return response;
});

const RemoveUser = createAsyncThunk('user/logout', async (data) => {
  const link = api?.Logout;
  const response = await PostFunction(link, data);
  return response;
});

export { AddUser ,RemoveUser };
