import axios from 'axios'
const {createSlice} = require('@reduxjs/toolkit');

const PostAds = createSlice({
    name: 'PostAds',
    initialState : [],
    reducers:{
        add(state,action){
          const response = axios.post(`${window.env.API_URL}/uploadAds`,action.payload);
          return response;
        },

        remove(state, action){
            const response = axios.delete(`${window.env.API_URL}/deleteAds/${action.payload}`)
           return response;
        },
       edit(state, action){
        //https://mksbackend.herokuapp.com/api/v1/updateAds/:id
            const response = axios.put(`${window.env.API_URL}/updateAds/${action.payload}`)
           return response;
        
        }
    }
})

export const {add , remove,edit} = PostAds.actions;
export default PostAds.reducer;