import axios from 'axios'
const {createSlice} = require('@reduxjs/toolkit');

const postSponsor = createSlice({
    name: 'PostSponsor',
    initialState : [],
    reducers:{
        add(state,action){
          const response = axios.post(`${window.env.API_URL}/uploadSponsor`,action.payload)
          return response;
        },

        remove(state, action){
            const response = axios.delete(`${window.env.API_URL}/deleteSponsor/${action.payload}`)
           return response;
        },
        edit(state, action){
            const response = axios.put(`${window.env.API_URL}/updateSponsor/${action.payload}`)
           return response; 
        }
    }
})

export const {add , remove} = postSponsor.actions;
export default postSponsor.reducer;