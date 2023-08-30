 import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetFunction } from '../../Functions/GetFunction';
import { PostFunction } from '../../Functions/PostFunction';
import { PutFunction } from '../../Functions/PutFunction';
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

const TaskAssigned = createAsyncThunk('user/task-assign' , async ({paramsid , data , tc}) => {
    const link = api?.TaskAssigned+paramsid;
  const response = await PutFunction(link, data , tc);
  console.log(response)
  return response;
})

const UserAssignTask  = createAsyncThunk('user/get-user-task' , async (tc) => {
  const link = api?.UserTaskAssigned;
  const response = await GetFunction(link , tc);
  return response;
})

const CompletedByAssigner  = createAsyncThunk('user/get-assigner-task' , async ({paramsid,data,tc  }) => {
  const link = api?.CompletedAssigner+paramsid;
  const response = await PutFunction(link ,data , tc);
  return response;
})


const CompletedByProvider  = createAsyncThunk('user/get-completed-task' , async ({paramsid,data,tc  }) => {
  const link = api?.TaskCompleted+paramsid;
  console.log("response",link , tc)
  const response = await PutFunction(link ,data , tc);
  return response;
})


// const RemoveUser = createAsyncThunk('user/logout', async (data) => {
//   const link = api?.Logout;
//   const response = await PostFunction(link, data);
//   return response;
// });

export { 
  AddTask , 
  GetTask  , 
  TaskAssigned , 
  UserAssignTask , 
  CompletedByAssigner ,
  CompletedByProvider
};
