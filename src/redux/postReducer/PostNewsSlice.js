import axios from 'axios'
const {createSlice} = require('@reduxjs/toolkit');

const PostNewsSlice = createSlice({
    name: 'PostNews',
    initialState : [],
    reducers:{
        add(state,action){
          const response = axios.post(`http://3.90.189.40:4000/api/v1/uploadnews`,action.payload)
          return response;
        },

        remove(state, action){
            const response = axios.delete(`http://3.90.189.40:4000/api/v1/deletenews/${action.payload}`)
            return response;
        }
    }
})

export const {add , remove} = PostNewsSlice.actions;
export default PostNewsSlice.reducer;