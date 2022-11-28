import axios from 'axios'
const {createSlice} = require('@reduxjs/toolkit');

const postTrainer = createSlice({
    name: 'postTrainer',
    initialState : [],
    reducers:{
        add(state,action){
          const response = axios.post(`${window.env.API_URL}/uploadtrainer`,action.payload)
          return response;
        },

        remove(state, action){
            const response = axios.delete(`${window.env.API_URL}/deletetrainer/${action.payload}`)
            state.filter((item) => item._id !== action.payload);
            return response;
        }
    }
})

export const {add , remove} = postTrainer.actions;
export default postTrainer.reducer;

