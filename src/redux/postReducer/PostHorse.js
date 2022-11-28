import axios from 'axios'
const {createSlice} = require('@reduxjs/toolkit');

const postHorse = createSlice({
    name: 'postHorse',
    initialState : [],
    reducers:{
        add(state,action){
          const response = axios.post(`${window.env.API_URL}createhorse`,action.payload)
          return response;
        },

        remove(state, action){
            const response = axios.delete(`${window.env.API_URL}/deletehorse/${action.payload}`)
           return response;
        }
        
    }
})

export const {add , remove} = postHorse.actions;
export default postHorse.reducer;