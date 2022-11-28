import axios from 'axios'
const {createSlice} = require('@reduxjs/toolkit');

const postJockey = createSlice({
    name: 'postjockey',
    initialState : [],
//https://mksbackend.herokuapp.com/api/v1/uploadJockey
    reducers:{
        add(state,action){
          const response = axios.post(`http://3.90.189.40:4000/api/v1/uploadJockey`,action.payload)
          return response;
        },
//https://mksbackend.herokuapp.com/api/v1/deleteJockey/:id
        remove(state, action){
            const response = axios.delete(`http://3.90.189.40:4000/api/v1/deleteJockey/${action.payload}`)
           return response; 
        },
        edit(state, action){
            const response = axios.put(`http://3.90.189.40:4000/api/v1/updateJockey/${action.payload}`)
           return response; 
        }
    }
})

export const {add , remove, edit} = postJockey.actions;
export default postJockey.reducer;