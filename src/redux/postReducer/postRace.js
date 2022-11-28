import axios from 'axios'
const {createSlice} = require('@reduxjs/toolkit');

const postRace = createSlice({
    name: 'postrace',
    initialState : [],
    //https:mksbackend.herokuapp.com/api/v1/createrace
    reducers:{
        add(state,action){
          const response = axios.post(`http://3.90.189.40:4000/api/v1/createrace`,action.payload)
          return response;
        },
//https://mksbackend.herokuapp.com/api/v1/deleterace/:id
        remove(state, action){
            const response = axios.delete(`http://3.90.189.40:4000/api/v1/deleterace/${action.payload}`)
           return response; 
        }
    }
})

export const {add , remove} = postRace.actions;
export default postRace.reducer;