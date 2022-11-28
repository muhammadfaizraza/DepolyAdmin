import axios from 'axios'
const {createSlice} = require('@reduxjs/toolkit');

const postJockey = createSlice({
    name: 'postjockey',
    initialState : [],
//https://mksbackend.herokuapp.com/api/v1/uploadJockey
    reducers:{
        add(state,action){
          const response = axios.post(`${window.env.API_URL}/uploadJockey`,action.payload)
          return response;
        },
//https://mksbackend.herokuapp.com/api/v1/deleteJockey/:id
        remove(state, action){
            const response = axios.delete(`${window.env.API_URL}/deleteJockey/${action.payload}`)
           return response; 
        },
        edit(state, action){
            const response = axios.put(`${window.env.API_URL}/updateJockey/${action.payload}`)
           return response; 
        }
    }
})

export const {add , remove, edit} = postJockey.actions;
export default postJockey.reducer;