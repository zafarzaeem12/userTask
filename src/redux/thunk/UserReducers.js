import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostFunction } from '../../Functions/PostFunction'
import { api } from '../../Apis'



const AddUser = createAsyncThunk('user/login', async (data) => {
        const link = api?.Login
        const response = await PostFunction(link , data);
        return response 
})



export {
    AddUser,
   
}