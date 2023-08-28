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

const SearchUser = createAsyncThunk('user/search', async (arg) => {
  const link = api?.SearchUser;
  const response = await GetFunction(link, arg);
  console.log("responsesearched",response)
  if (response) {
    return response.data
    ;
  } 
    return response;
});



const RemoveUser = createAsyncThunk('user/logout', async (data) => {
  const link = api?.Logout;
  const response = await PostFunction(link, data);
  return response;
});

export { AddUser,SearchUser ,RemoveUser };
