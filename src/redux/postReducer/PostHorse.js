import axios from 'axios'
const {createSlice} = require('@reduxjs/toolkit');

const postHorse = createSlice({
    name: 'postHorse',
    initialState : [],
    reducers:{
        add(state,action){
          const response = axios.post(`http://3.90.189.40:4000/api/v1createhorse`,action.payload)
          return response;
        },

        remove(state, action){
            const response = axios.delete(`http://3.90.189.40:4000/api/v1/deletehorse/${action.payload}`)
           return response;
        }
        
    }
})

export const {add , remove} = postHorse.actions;
export default postHorse.reducer;