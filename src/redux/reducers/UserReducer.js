import { createSlice } from '@reduxjs/toolkit'
import { AddUser } from '../thunk/UserReducers'

const UserSlice = createSlice({
    name:'User',
    initialState: {
        isLoading: false,
        data : [],
        error : null
    },
    extraReducers(builder){
        builder.addCase(AddUser.pending , (state,action) => {
            state.isLoading = true;
         })
        builder.addCase(AddUser.fulfilled , (state,action) => {
            state.isLoading = false;
            state.data.push(action.payload)
            
         })
        builder.addCase(AddUser.rejected , (state,action) => {
            state.isLoading = false;
            state.error = action.error
         })
        
      
    }
})


export const UserReducers =  UserSlice.reducer;