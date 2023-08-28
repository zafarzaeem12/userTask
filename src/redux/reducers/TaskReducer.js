import { createSlice } from '@reduxjs/toolkit'
import { AddTask , GetTask  } from '../thunk/TaskReducers'

const TaskSlice = createSlice({
    name:'Task',
    initialState: {
        isLoading: false,
        data : [],
        error : null
    },
    extraReducers(builder){

        builder.addCase(AddTask.pending , (state,action) => {
            state.isLoading = true;
         })
        builder.addCase(AddTask.fulfilled , (state,action) => {
            state.isLoading = false;
            console.log(action.payload)
            if(action.payload !== null && action.payload !== undefined){
                state.data.push(action.payload)   
           }
            
         })
        builder.addCase(AddTask.rejected , (state,action) => {
            state.isLoading = false;
            state.error = action.error
         })

        // ---------------------------------------------------------------------

        builder.addCase(GetTask.pending , (state,action) => {
            state.isLoading = true;
         })
        builder.addCase(GetTask.fulfilled , (state,action) => {
            console.log(action.payload)
            state.isLoading = false;
            state.data = action.payload
            
         })
        builder.addCase(GetTask.rejected , (state,action) => {
            state.isLoading = false;
            state.error = action.error
         })
      
    }
})


export const TaskReducers =  TaskSlice.reducer;