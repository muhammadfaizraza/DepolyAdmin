import { configureStore } from '@reduxjs/toolkit';
import getAdsSlice from './getReducer/getAdsSlice';
import getHorseSlice from './getReducer/getHorseSlice';
import getNewsSlice from './getReducer/getNewsSlice';
import getSponsorSlice from './getReducer/getSponsorSlice';
import getTrainerSlice from './getReducer/getTrainerSlice';
import getRaceCourseSlice from './getReducer/getRaceCourseSlice';
import getJockeySlice from './getReducer/getJockeySlice';
import getRaceSlice from './getReducer/getRaceSlice'
import PostAds from './postReducer/PostAds';
import PostNewsSlice from './postReducer/PostNewsSlice';
import PostSponsor from './postReducer/PostSponsor';
import PostTrainer from './postReducer/PostTrainer';
import PostRaceCourse from './postReducer/PostRaceCourse';
import PostJockey from './postReducer/PostJockey';
import PostHorse from './postReducer/PostHorse';
import postRace from './postReducer/postRace';
import userReducer from './getReducer/UserSlice'
import { getUserDetails } from './postReducer/UserPost';
import PostOwner from './postReducer/PostOwner';
import getOwnerSlice from './getReducer/getOwnerSlice';
import PostSlider from './postReducer/PostSlider';
import getSliderSlice from './getReducer/getSliderSlice';
import getSingleJockey from './getReducer/getSingleJockey';
import getSingleOwner from './getReducer/getSingleOwner';
import getSingleRacecourse from './getReducer/getSingleRacecourse';
import getColor from './getReducer/getColor';
import getNationality from './getReducer/getNationality';
import getBreeder from './getReducer/getBreeder';
import getCurrency from './getReducer/getCurrency';
import getGenderSlice from './getReducer/getGenderSlice';
import getTracklength from './getReducer/getTracklength';
import getMeeting from './getReducer/getMeeting';
import getRacetype from './getReducer/getRacetype';
import getRaceName from './getReducer/getRaceName';
import getSubscriber from './getReducer/getSubscriber';
import getSingleSlider from './getReducer/getSingleSlider';
import getRaceKind from './getReducer/getRaceKind';
import getHorseKind from './getReducer/getHorseKind';
import getToBePublishRace from './getReducer/getToBePublishRace';
import { fetchtobeRaceResult } from './getReducer/getRaceToBeAwait';
import getGroundType from './getReducer/getGroundType';
import getEquipment from './getReducer/getEquipment';
import getResultSlice from './getReducer/getResultSlice';
import getVerdict from './getReducer/getVerdict';

const store = configureStore({
    reducer: {
        news: getNewsSlice,
        ads: getAdsSlice,
        sponsor: getSponsorSlice,
        PostNews: PostNewsSlice,
        PostSponsor: PostSponsor,
        PostAds: PostAds,
        horse: getHorseSlice,
        trainer: getTrainerSlice,
        race: getRaceSlice,
        postTrainer: PostTrainer,
        racecourse: getRaceCourseSlice,
        postracecourse: PostRaceCourse,
        jockey: getJockeySlice,
        postjockey: PostJockey,
        postHorse: PostHorse,
        postrace: postRace,
        user: userReducer,
        owner: getOwnerSlice,
        postowner: PostOwner,
        slider: getSliderSlice,
        postslider: PostSlider,
        singleSlider:getSingleSlider,
        userProfile: getUserDetails,
        singlejockey: getSingleJockey,
        singleowner: getSingleOwner,
        singleracecourse: getSingleRacecourse,
        color: getColor,
        nationality: getNationality,
        breeder: getBreeder,
        currency: getCurrency,
        gender:getGenderSlice,
        trackLength : getTracklength,
        meeting: getMeeting,
        RaceType: getRacetype,
        RaceName: getRaceName,
        subscriber: getSubscriber,
        raceKinds:getRaceKind,
        HorseKind:getHorseKind,
        tobePublishRace:getToBePublishRace,
        tobeRaceResult:fetchtobeRaceResult,
        groundtype:getGroundType,
        equipment:getEquipment,
        Result:getResultSlice,
        verdict:getVerdict
        
    },
});

export default store;