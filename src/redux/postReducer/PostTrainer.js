import axios from 'axios'
const {createSlice} = require('@reduxjs/toolkit');

const postTrainer = createSlice({
    name: 'postTrainer',
    initialState : [],
    reducers:{
        add(state,action){
          const response = axios.post(`http://3.90.189.40:4000/api/v1/uploadtrainer`,action.payload)
          return response;
        },

        remove(state, action){
            const response = axios.delete(`http://3.90.189.40:4000/api/v1/deletetrainer/${action.payload}`)
            state.filter((item) => item._id !== action.payload);
            return response;
        }
    }
})

export const {add , remove} = postTrainer.actions;
export default postTrainer.reducer;

