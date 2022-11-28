import axios from 'axios';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const getOwnerSlice = createSlice({
    name: 'owner',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
 
    extraReducers: (builder) => {
        builder
            .addCase(fetchOwner.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchOwner.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchOwner.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});

export const { setOwner, setStatus } = getOwnerSlice.actions;
export default getOwnerSlice.reducer;

export const fetchOwner = createAsyncThunk('Ownerget/fetch', async () => {
    const res = await axios.get(`${window.env.API_URL}/Ownerget?keyword=&page=`)
    const data =  res.data;
    return data.data;
});

