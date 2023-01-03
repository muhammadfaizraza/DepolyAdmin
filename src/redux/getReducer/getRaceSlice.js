import axios from "axios";
import env from "react-dotenv";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getRaceSlice = createSlice({
  name: "race",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchrace.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchrace.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchrace.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setRace, setStatus } = getRaceSlice.actions;
export default getRaceSlice.reducer;
export const fetchrace = createAsyncThunk(
  "SearchRace/fetch",
  async ({
    MeetingType,
    MeetingCode,
    RaceName,
    TrackLength,
    Ground,
    DescriptionAr,
    DescriptionEn,
    RaceStatus,
    Sponsor,
    RaceCourse,
    RaceType,
    WeatherType,
    WeatherDegree,
    Competition,
  }) => {
    const res = await axios.get(
      `${window.env.API_URL}SearchRace?MeetingType=${MeetingType}&MeetingCode=${MeetingCode}&RaceName=${RaceName}&TrackLength=${TrackLength}&Ground=${Ground}&DescriptionAr=${DescriptionAr}&DescriptionEn=${DescriptionEn}&RaceStatus=${RaceStatus}&RaceCourse=${RaceCourse}&WeatherType=${WeatherType}&WeatherDegree=${WeatherDegree}&RaceType=${RaceType}&Competition=${Competition}&Sponsor=${Sponsor}   `
    );
    const data = res.data;
    return data.data;
  }
);
