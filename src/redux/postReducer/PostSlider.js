import axios from 'axios'
const {createSlice} = require('@reduxjs/toolkit');

const postslider = createSlice({
    name: 'postslider',
    initialState : [],
//https://mksbackend.herokuapp.com/api/v1/uploadSlider
    reducers:{
        add(state,action){
          const response = axios.post(`http://3.90.189.40:4000/api/v1/uploadSlider`,action.payload)
          return response;
        },

        remove(state, action){
            const response = axios.delete(`http://3.90.189.40:4000/api/v1/deleteSlider/${action.payload}`)
            return response; 
         }
    },
    edit(state, action){
        const response = axios.put(`http://3.90.189.40:4000/api/v1/updateOwner/${action.payload}`)
       return response; 
    }

    
})

export const {add , remove ,edit} = postslider.actions;
export default postslider.reducer;