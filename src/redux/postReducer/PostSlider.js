import axios from 'axios'
const {createSlice} = require('@reduxjs/toolkit');

const postslider = createSlice({
    name: 'postslider',
    initialState : [],
//https://mksbackend.herokuapp.com/api/v1/uploadSlider
    reducers:{
        add(state,action){
          const response = axios.post(`${window.env.API_URL}/uploadSlider`,action.payload)
          return response;
        },

        remove(state, action){
            const response = axios.delete(`${window.env.API_URL}/deleteSlider/${action.payload}`)
            return response; 
         }
    },
    edit(state, action){
        const response = axios.put(`${window.env.API_URL}/updateOwner/${action.payload}`)
       return response; 
    }

    
})

export const {add , remove ,edit} = postslider.actions;
export default postslider.reducer;