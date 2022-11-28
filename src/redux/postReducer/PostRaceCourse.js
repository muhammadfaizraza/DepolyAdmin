import axios from 'axios'
const {createSlice} = require('@reduxjs/toolkit');

const postRaceCourse = createSlice({
    name: 'postracecourse',
    initialState : [],
//https://mksbackend.herokuapp.com/api/v1/createcourse
    reducers:{
        add(state,action){
          const response = axios.post(`${window.env.API_URL}/createcourse`,action.payload)
          return response;
        },
//https://mksbackend.herokuapp.com/api/v1/deletecourse/:id
        remove(state, action){
            const response = axios.delete(`${window.env.API_URL}/deletecourse/${action.payload}`)
           return response; 
        },
        edit(state, action){
            const response = axios.put(`${window.env.API_URL}/singleracecourse/${action.payload}`)
           return response; 
        }
    }
})

export const {add , remove, edit} = postRaceCourse.actions;
export default postRaceCourse.reducer;