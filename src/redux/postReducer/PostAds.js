import axios from 'axios'
const {createSlice} = require('@reduxjs/toolkit');

const PostAds = createSlice({
    name: 'PostAds',
    initialState : [],
    reducers:{
        add(state,action){
          const response = axios.post(`http://3.90.189.40:4000/api/v1/uploadAds`,action.payload);
          return response;
        },

        remove(state, action){
            const response = axios.delete(`http://3.90.189.40:4000/api/v1/deleteAds/${action.payload}`)
           return response;
        },
       edit(state, action){
        //https://mksbackend.herokuapp.com/api/v1/updateAds/:id
            const response = axios.put(`http://3.90.189.40:4000/api/v1/updateAds/${action.payload}`)
           return response;
        
        }
    }
})

export const {add , remove,edit} = PostAds.actions;
export default PostAds.reducer;