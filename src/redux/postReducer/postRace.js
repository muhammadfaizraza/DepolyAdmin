import axios from 'axios'
const {createSlice} = require('@reduxjs/toolkit');

const postRace = createSlice({
    name: 'postrace',
    initialState : [],
    //https:mksbackend.herokuapp.com/api/v1/createrace
    reducers:{
        add(state,action){
          const response = axios.post(`${window.env.API_URL}/createrace`,action.payload)
          return response;
        },
//https://mksbackend.herokuapp.com/api/v1/deleterace/:id
        remove(state, action){
            const response = axios.delete(`${window.env.API_URL}/deleterace/${action.payload}`)
           return response; 
        }
    }
})

export const {add , remove} = postRace.actions;
export default postRace.reducer;