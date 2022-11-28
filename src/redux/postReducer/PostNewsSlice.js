import axios from 'axios'
const {createSlice} = require('@reduxjs/toolkit');

const PostNewsSlice = createSlice({
    name: 'PostNews',
    initialState : [],
    reducers:{
        add(state,action){
          const response = axios.post(`${window.env.API_URL}/uploadnews`,action.payload)
          return response;
        },

        remove(state, action){
            const response = axios.delete(`${window.env.API_URL}/deletenews/${action.payload}`)
            return response;
        }
    }
})

export const {add , remove} = PostNewsSlice.actions;
export default PostNewsSlice.reducer;