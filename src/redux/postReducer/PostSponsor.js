import axios from 'axios'
const {createSlice} = require('@reduxjs/toolkit');

const postSponsor = createSlice({
    name: 'PostSponsor',
    initialState : [],
    reducers:{
        add(state,action){
          const response = axios.post(`http://3.90.189.40:4000/api/v1/uploadSponsor`,action.payload)
          return response;
        },

        remove(state, action){
            const response = axios.delete(`http://3.90.189.40:4000/api/v1/deleteSponsor/${action.payload}`)
           return response;
        },
        edit(state, action){
            const response = axios.put(`http://3.90.189.40:4000/api/v1/updateSponsor/${action.payload}`)
           return response; 
        }
    }
})

export const {add , remove} = postSponsor.actions;
export default postSponsor.reducer;