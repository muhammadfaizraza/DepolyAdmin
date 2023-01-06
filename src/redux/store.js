import { configureStore } from "@reduxjs/toolkit";
import getAdsSlice from "./getReducer/getAdsSlice";
import getHorseSlice from "./getReducer/getHorseSlice";
import getNewsSlice from "./getReducer/getNewsSlice";
import getSponsorSlice from "./getReducer/getSponsorSlice";
import getTrainerSlice from "./getReducer/getTrainerSlice";
import getRaceCourseSlice from "./getReducer/getRaceCourseSlice";
import getJockeySlice from "./getReducer/getJockeySlice";
import getRaceSlice from "./getReducer/getRaceSlice";
import PostAds from "./postReducer/PostAds";
import PostNewsSlice from "./postReducer/PostNewsSlice";
import PostSponsor from "./postReducer/PostSponsor";
import PostTrainer from "./postReducer/PostTrainer";
import PostRaceCourse from "./postReducer/PostRaceCourse";
import PostJockey from "./postReducer/PostJockey";
import PostHorse from "./postReducer/PostHorse";
import postRace from "./postReducer/postRace";
import userReducer from "./getReducer/UserSlice";
import { getUserDetails } from "./postReducer/UserPost";
import PostOwner from "./postReducer/PostOwner";
import getOwnerSlice from "./getReducer/getOwnerSlice";
import PostSlider from "./postReducer/PostSlider";
import getSliderSlice from "./getReducer/getSliderSlice";
import getSingleJockey from "./getReducer/getSingleJockey";
import getSingleOwner from "./getReducer/getSingleOwner";
import getSingleRacecourse from "./getReducer/getSingleRacecourse";
import getColor from "./getReducer/getColor";
import getNationality from "./getReducer/getNationality";
import getBreeder from "./getReducer/getBreeder";
import getCurrency from "./getReducer/getCurrency";
import getGenderSlice from "./getReducer/getGenderSlice";
import getTracklength from "./getReducer/getTracklength";
import getMeeting from "./getReducer/getMeeting";
import getRacetype from "./getReducer/getRacetype";
import getRaceName from "./getReducer/getRaceName";
import getSubscriber from "./getReducer/getSubscriber";
import getSingleSlider from "./getReducer/getSingleSlider";
import getRaceKind from "./getReducer/getRaceKind";
import getHorseKind from "./getReducer/getHorseKind";
import getToBePublishRace from "./getReducer/getToBePublishRace";
import { fetchtobeRaceResult } from "./getReducer/getRaceToBeAwait";
import getGroundType from "./getReducer/getGroundType";
import getEquipment from "./getReducer/getEquipment";
import getResultSlice from "./getReducer/getResultSlice";
import getVerdict from "./getReducer/getVerdict";
import getCategory from "./getReducer/getCategory";
import getCompetition from "./getReducer/getCompetition";
import getRaceCard from "./getReducer/getRaceCard";
import getSeo from "./getReducer/getSeo";
import getDeletedEquipment from "./getDeletedreducer/DeletedEquipmentSlice";
import getAdminList from "./getReducer/getAdminList";
import getDeletedColor from "./getDeletedreducer/DeletedColorSlice";
import getDeletedGender from "./getDeletedreducer/DeletedGenderSlice";
import getDeletedNationality from "./getDeletedreducer/DeletedNationalitSlice";
import getDeletedBreeder from "./getDeletedreducer/DeletedBreederSlice";
import getDeletedCurrency from "./getDeletedreducer/DeletedCurrencySlice";
import getDeletedAds from "./getDeletedreducer/DeletedAdsSlice";
import getDeletedSeo from "./getDeletedreducer/DeletedSeoSlice";
import getDeletedSlider from "./getDeletedreducer/DeletedSliderSlice";
import getDeletedSponsor from "./getDeletedreducer/DeletedSponsorSlice";
import getDeletedNews from "./getDeletedreducer/DeletedNewsSlice";
import getDeletedOwner from "./getDeletedreducer/DeletedOwnerSlice";
import getDeletedTrainer from "./getDeletedreducer/DeletedTrainerSlice";
import getDeletedJockey from "./getDeletedreducer/DeletedJockeySlice";
import getDeletedHorseKind from "./getDeletedreducer/DeltedHorseKindSlice";
import getDeletedHorse from "./getDeletedreducer/DeletedHorseSlice";
import getDeleteGroundType from "./getDeletedreducer/DeletedGroundTypeSlice";
import getDeletedTrackLength from "./getDeletedreducer/DeletedTrackLengthSlice";
import getDeletedRaceCourse from "./getDeletedreducer/DeletedRaceCourseSlice";
import getDeletedRace from "./getDeletedreducer/DeletedRaceSlice";
import getDeletedRaceCard from "./getDeletedreducer/DeletedRaceCardSlice";
import getDeletedRaceName from "./getDeletedreducer/DeletedRaceNameSlice";
import getDeletedRaceType from "./getDeletedreducer/DeletedRaceTypeSlice";
import getDeletedRaceKind from "./getDeletedreducer/DeletedRaceKindSlice";
import getDeletedMeeting from "./getDeletedreducer/DeletedMeetingSlice";
import getDeletedVerdict from "./getDeletedreducer/DeletedVerdictSlice";
import getDeletedCategory from "./getDeletedreducer/DeletedCategorySlice";
import getDeletedCompetition from "./getDeletedreducer/DeletedCompetitionSlice";

import getcolorshortcode from "./getShortCode/getcolorshortcode";
import getbreedershortcode from "./getShortCode/getbreedershortcode";
import getcurrencyshortcode from "./getShortCode/getcurrencyshortcode";
import getsexshortcode from "./getShortCode/getsexshortcode";
import getgroundshortcode from "./getShortCode/getgroundtypeshortcode";
import getmeetingshortcode from "./getShortCode/getmeetingtypeshortcode";
import getracekindshortcode from "./getShortCode/getracekindshortcode";
import getverdictshortcode from "./getShortCode/getverdictshortcode";
import getnationalityshortcode from "./getShortCode/getnationalityshortcode";
import getequipmentshortcode from "./getShortCode/getequipmentshortcode";
import getracenameshortcode from "./getShortCode/getracenameshortcode";
import getracetypeshortcode from "./getShortCode/getracetypeshortcode";
import getNewLetter from "./getReducer/getNewLetter";
import getPointTable from "./getReducer/getPointTable";
import gethorsekindshortcode from "./getShortCode/gethorsekindshortcode";
import getFinalPosition from "./getReducer/getFinalPosition";

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
    singleSlider: getSingleSlider,
    userProfile: getUserDetails,
    singlejockey: getSingleJockey,
    singleowner: getSingleOwner,
    singleracecourse: getSingleRacecourse,
    color: getColor,
    nationality: getNationality,
    breeder: getBreeder,
    currency: getCurrency,
    gender: getGenderSlice,
    trackLength: getTracklength,
    meeting: getMeeting,
    RaceType: getRacetype,
    RaceName: getRaceName,
    subscriber: getSubscriber,
    raceKinds: getRaceKind,
    HorseKind: getHorseKind,
    tobePublishRace: getToBePublishRace,
    tobeRaceResult: fetchtobeRaceResult,
    groundtype: getGroundType,
    equipment: getEquipment,
    Result: getResultSlice,
    verdict: getVerdict,
    category: getCategory,
    competition: getCompetition,
    raceCard: getRaceCard,
    Seo: getSeo,
    AdminList: getAdminList,
    deletedequipment: getDeletedEquipment,
    deletedcolor: getDeletedColor,
    deletedgender: getDeletedGender,
    deletednationality: getDeletedNationality,
    deletedbreeder: getDeletedBreeder,
    deletedcurrency: getDeletedCurrency,
    deletedads: getDeletedAds,
    deletedseo: getDeletedSeo,
    deletedslider: getDeletedSlider,
    deletedsponsor: getDeletedSponsor,
    deletednews: getDeletedNews,
    deletedowner: getDeletedOwner,
    deletedtrainer: getDeletedTrainer,
    deletedjockey: getDeletedJockey,
    deletedhorsekind: getDeletedHorseKind,
    deletedhorse: getDeletedHorse,
    deletedgroundtype: getDeleteGroundType,
    deletedtracklength: getDeletedTrackLength,
    deletedracecourse: getDeletedRaceCourse,
    deletedrace: getDeletedRace,
    deletedracecard: getDeletedRaceCard,
    deletedracename: getDeletedRaceName,
    deletedracetype: getDeletedRaceType,
    deletedracekind: getDeletedRaceKind,
    deletedmeeting: getDeletedMeeting,
    deletedverdict: getDeletedVerdict,
    deletedcategory: getDeletedCategory,
    deletedCompetition:getDeletedCompetition,
    colorshortcode:getcolorshortcode,
    breedershortcode:getbreedershortcode,
    currencyshortcode:getcurrencyshortcode,
    equipmentshortcode:getequipmentshortcode,
    groundshortcode:getgroundshortcode,
    meetingshortcode:getmeetingshortcode,
    nationalityshortcode:getnationalityshortcode,
    racekindshortcode:getracekindshortcode,
    racenameshortcode:getracenameshortcode,
    racetypeshortcode:getracetypeshortcode,
    sexshortcode:getsexshortcode,
    verdictshortcode:getverdictshortcode,
    newsletter:getNewLetter,
    pointTable:getPointTable,
    horsekindshortcode:gethorsekindshortcode,
    finalposition:getFinalPosition,
   

  },
});

export default store;
