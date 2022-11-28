import axios from 'axios'
const {createSlice} = require('@reduxjs/toolkit');

const postRaceCourse = createSlice({
    name: 'postracecourse',
    initialState : [],
//https://mksbackend.herokuapp.com/api/v1/createcourse
    reducers:{
        add(state,action){
          const response = axios.post(`http://3.90.189.40:4000/api/v1/createcourse`,action.payload)
          return response;
        },
//https://mksbackend.herokuapp.com/api/v1/deletecourse/:id
        remove(state, action){
            const response = axios.delete(`http://3.90.189.40:4000/api/v1/deletecourse/${action.payload}`)
           return response; 
        },
        edit(state, action){
            const response = axios.put(`http://3.90.189.40:4000/api/v1/singleracecourse/${action.payload}`)
           return response; 
        }
    }
})

export const {add , remove, edit} = postRaceCourse.actions;
export default postRaceCourse.reducer;