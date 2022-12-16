import "./App.css";
import { useEffect,useState } from "react";
import '.././src/Components/CSS/mediaquery.css'
import "./Components/CSS/home.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Dashboard from "./pages/Dashboard";
import Races from "./pages/GetTable/Races";
import Competition from "./pages/GetTable/Competation";
import Statistic from "./pages/GetTable/Statistic";
import Horse from "./pages/GetTable/Horse";
import Jockey from "./pages/GetTable/Jockey";
import News from "./pages/GetTable/News";
import Ads from "./pages/GetTable/Ads";
import Sponsor from "./pages/GetTable/Sponsor";
import FormData from "./pages/PostTable/NewsForm";
import AdsForm from "./pages/PostTable/AdsForm";
import SponsorForm from "./pages/PostTable/SponsorForm";
import PostTrainer from "./pages/PostTable/PostTrainer";
import PostHorse from "./pages/PostTable/HorseForm";
import Trainer from "./pages/GetTable/Trainer";
import Login from "./Components/Login";
import RaceCourse from "./pages/GetTable/RaceCourse";
import RaceCourseForm from "./pages/PostTable/RaceCourseForm";
import JockeyForm from "./pages/PostTable/JockeyForm";
import RaceForm from "./pages/PostTable/RaceForm/RaceForm";
import ProtectedRoute from "./Components/Common/ProtectedRoute";
import SelectHorse from "./pages/PostTable/SelectHorse";
import Owner from "./pages/GetTable/Owner";
import OwnerForm from "./pages/PostTable/OwnerForm";
import SliderForm from "./pages/PostTable/SliderForm";
import Slider from "./pages/GetTable/Slider";
import Header from "./Components/Common/Header";
import Sidebar from "./Components/Common/Sidebar";
import EditJockey from './pages/UpdateTable/EditJockey'
import EditRacecourse from "./pages/UpdateTable/EditRacecourse";
import EditOwner from "./pages/UpdateTable/EditOwner";
import EditSlider from "./pages/UpdateTable/EditSlider";
import EditSponsor from "./pages/UpdateTable/EditSponsor";
import EditColor from "./pages/UpdateTable/EditColor";
import EditBreeder from "./pages/UpdateTable/EditBreeder";
import EditCurrency from "./pages/UpdateTable/EditCurrency";
import EditEquipment from "./pages/UpdateTable/EditEquipment";
import EditGender from "./pages/UpdateTable/EditGender";
import EditNationality from "./pages/UpdateTable/EditNationality";
import EditAds from "./pages/UpdateTable/EditAds";
import EditNews from "./pages/UpdateTable/EditNews";
import EditTrainer from "./pages/UpdateTable/EditTrainer";
import EditHorse from "./pages/UpdateTable/EditHorse";
import EditGroundType from "./pages/UpdateTable/EditGroundType";
import EditTrack from "./pages/UpdateTable/EditTrack";
import EditRaceName from "./pages/UpdateTable/EditRaceName";
import EditRaceType from "./pages/UpdateTable/EditRaceType";
import EditRaceKind from "./pages/UpdateTable/EditRaceKind";
import EditMeetingType from "./pages/UpdateTable/EditMeetingType";
import EditVerdict from "./pages/UpdateTable/EditVerdict";
import EditHorseKind from "./pages/UpdateTable/EditHorseKind";
import EditRace from "./pages/UpdateTable/EditRace";
import EditCategory from "./pages/UpdateTable/EditCategory";
import EditCompetition from "./pages/UpdateTable/EditCompetition";
import EditRaceCard from "./pages/UpdateTable/EditRaceCard";
import EditSeo from "./pages/UpdateTable/EditSeo";

import ResultForm from "./pages/PostTable/Result/ResultForm";
import RacesResult from "./pages/PostTable/Result/ResultRaces";
import Color from "./pages/PostTable/Color";
import Nationality from "./pages/PostTable/Nationality";
import Currency from "./pages/PostTable/Currency";
import Breeder from "./pages/PostTable/Breeder";
import HorseData from './pages/PostTable/RaceForm/AddHorse'
import NationalityTable from "./pages/GetTable/NationalityTable";
import ColorTable from "./pages/GetTable/ColorTable";
import BreederTable from "./pages/GetTable/BreederTable";
import CurrencyTable from "./pages/GetTable/CurrencyTable";
import Gender from "./pages/PostTable/Gender";
import GenderTable from "./pages/GetTable/GenderTable";
import RaceCardListing from "./pages/GetTable/RaceCardListing";
import HorseKind from "./pages/GetTable/HorseKind";
import Horsekindform from "./pages/PostTable/Horsekindform";
import Racetype from "./pages/GetTable/Racetype";
import Racetypeform from "./pages/PostTable/Racetypeform";
import Tracklengthform from "./pages/PostTable/Tracklengthform";
import Tracklength from "./pages/GetTable/Tracklength";
import Racename from "./pages/GetTable/Racename";
import Racenameform from "./pages/PostTable/Racenameform";
import MeetingType from "./pages/PostTable/MeetingType";
import GetMeetingType from "./pages/GetTable/GetMeetingType";
import Verdict from "./pages/PostTable/Verdict";
import Setting from "./pages/GetTable/Setting";
import AdminProfile from "./pages/Setting/AdminProfile";
import AdminListing from "./pages/Setting/AdminList";

import SubscriberList from "./pages/Setting/SubscriberList";
import AdminRole from "./pages/Setting/AdminRole";
import RaceKind from "./pages/GetTable/RaceKind";
import RaceKindForm from "./pages/PostTable/RaceKind";
import PublishRace from "./pages/PostTable/RaceForm/AddVerdict";
import Equipment from "./pages/PostTable/Equipment";
import EquiptmentTable from "./pages/GetTable/EquiptmentTable";
import Verdicts from "./pages/PostTable/Verdicts";
import VerdictTable from "./pages/GetTable/VerdictTable";
import RaceToBePublish from "./pages/GetTable/RacesToPublish";
import GroundType from "./pages/PostTable/GroundType";
import GroundTypeTable from "./pages/GetTable/GroundTypeTable";
import TestTable from './pages/PostTable/RaceForm/RaceTwo'
import RaceCard from './pages/PostTable/RaceCard/RaceCard'
import { ToastContainer } from 'react-toastify';
import NotFound from "./Components/Common/NotFound";
import AddCompetition from "./pages/PostTable/Competition/AddCompetition";
import AddCategory from "./pages/PostTable/Competition/AddCategory";
import CompetitionCategory from "./pages/GetTable/CompetitionCategory";
import PublishRaceCard from "./pages/PostTable/RaceCard/PublishRaceCard";
import Seolisting from "./pages/GetTable/Seolisting";
import SEOForm from "./pages/PostTable/SEOForm";
import PublishRaceCompetition from "./pages/PostTable/Competition/PublishRaceCompetition";
import NewsLetter from "./pages/GetTable/NewsLetter";
import Forgetpage from "./pages/GetTable/Forgetpage";


function App() {
  // useEffect(() => {
  //   const unloadCallback = (event) => {
  //     event.preventDefault();
  //     event.returnValue = "";
  //     return "";
  //   };

  //   window.addEventListener("beforeunload", unloadCallback);
  //   return () => window.removeEventListener("beforeunload", unloadCallback);
  // }, []);

  const [userIsDesktop, setUserIsDesktop] = useState(true);
  useEffect(() => {
    window.innerWidth > 1024 ? setUserIsDesktop(true) : setUserIsDesktop(false);
  }, [userIsDesktop]);

  return (
    <>
    {
     userIsDesktop ?  <Provider store={store}>
     <div className="App">
       <ToastContainer />
       <BrowserRouter>
         <Header />
         <div className='mainhomescreen'>
         <Sidebar />
         <Routes>
             <Route exact path="/" element={<Login />} />
             <Route element={<ProtectedRoute />}>
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path='/setting' element={<Setting/>} />
             <Route path='/AdminProfile' element={<AdminProfile />} />
             <Route path='/AdminListing' element={<AdminListing />} />
             <Route path='/subscriberlist' element={<SubscriberList />} />
             <Route path='/AddRole' element={<AdminRole />} />
             <Route path="/racecourse" element={<RaceCourse />} />
             <Route path="/races" element={<Races />} />
             <Route path="/competitionlisting" element={<Competition />} />
             <Route path="/statistics" element={<Statistic />} />
             <Route path="/horse" element={<Horse />} />
             <Route path="/jockey" element={<Jockey />} />
             <Route path="/trainer" element={<Trainer />} />
             <Route path="/news" element={<News />} />
             <Route path="/ads" element={<Ads />} />
             <Route path="/sponsor" element={<Sponsor />} />
             <Route path="/newsform" element={<FormData />} />
             <Route path="/adsform" element={<AdsForm />} />
             <Route path="/sponsorform" element={<SponsorForm />} />
             <Route path="/trainerform" element={<PostTrainer />} />
             <Route path="/horseform" element={<PostHorse />} />
             <Route path="/publishrace" element={<HorseData />} />
             <Route path="/racecourseform" element={<RaceCourseForm />} />
             <Route path="/jockeyform" element={<JockeyForm />} />
             <Route path="/raceform" element={<RaceForm />} />
             <Route path="/addhorse" element={<SelectHorse />} />
             <Route path="/owner" element={<Owner />} />
             <Route path="/ownerform" element={<OwnerForm />} />
             <Route path="/sliderform" element={<SliderForm />} />
             <Route path="/resultform" element={<ResultForm/>}/>
             <Route path="/resultrace" element={<RacesResult/>}/>
             <Route path="/color" element={<Color/>}/>
             <Route path="/Nationalitylist"element={<NationalityTable/>} />
             <Route path="/colorlist"element={<ColorTable/>} />
             <Route path="/breederlist"element={<BreederTable/>} />
             <Route path="/currencylist"element={<CurrencyTable/>} />
             <Route path="/racetype" element={<Racetype/>}/>
             <Route path="/racetypeform" element={<Racetypeform/>}/>
             <Route path='/gender' element={<Gender/>} />
             <Route path='/racename' element={<Racename/>} />
             <Route path="racenameform" element={<Racenameform/>}/>
             <Route path='/horsekindform' element={<Horsekindform/>}/>
             <Route path='/ground' element={<GroundType/>}/>
             <Route path='/groundlist' element={<GroundTypeTable/>}/>
             <Route path="tracklength" element={<Tracklength/>} />
             <Route path='/tracklengthform' element={<Tracklengthform/>}/>
             <Route path='/horsekind' element={<HorseKind/>}/>
             <Route path='/genderlist' element={<GenderTable/>} />
             <Route path="/nationality" element={<Nationality/>}/>
             <Route path="/currency" element={<Currency/>}/>
             <Route path="/meeting" element={<MeetingType/>}/>
             <Route path="/equipment" element={<Equipment/>}/>
             <Route path="/equipmentlist" element={<EquiptmentTable/>}/>
             <Route path="/breeder" element={<Breeder/>}/>
             <Route path="/getmeeting" element={<GetMeetingType/>}/>
             <Route path="/meeting" element={<MeetingType/>}/>
             <Route path="/slider" element={<Slider />} />
             <Route path="/addverdict" element={<Verdict />} />
             <Route path="/verdict" element={<Verdicts />} />
             <Route path="/verdictlist" element={<VerdictTable />} />
             <Route path="/racekindform" element={<RaceKindForm />} />
             <Route path="/racekind" element={<RaceKind />} />
             <Route path="/fullpublishrace" element={<PublishRace />} />
             <Route path="/testTable" element={<TestTable />} />
             <Route path="/racecard" element={<RaceCard />} />
             <Route path="/addcompetition" element={<AddCompetition />} />
             <Route path="/addCategory" element={<AddCategory />} />
             <Route path="/CategoryListing" element={<CompetitionCategory />} />
             <Route path="/publishracecard" element={<PublishRaceCard />} />
             <Route path="/racecardlisting" element={<RaceCardListing />} />
             <Route path="/racesPublish" element={<RaceToBePublish />} />
             <Route path="/seolisting" element={<Seolisting />} />
             <Route path="/seoform" element={<SEOForm />} />
             <Route path="/competitionrace" element={<PublishRaceCompetition />} />
             <Route path="/newsletter" element={<NewsLetter />} />
             <Route path="/password/reset/:token" element={<Forgetpage />} />

             <Route path="*" element={<NotFound />} />

             {/* Edit Pages */}
             <Route path="/editjockey" element={<EditJockey />} />
             <Route path="/editracecourse" element={<EditRacecourse/>}/>
             <Route path="/editowner" element={<EditOwner/>}/>
             <Route path="/editslider" element={<EditSlider/>}/>
             <Route path="/editsponsor" element={<EditSponsor/>}/>
             <Route path="/editcolor" element={<EditColor />}/>
             <Route path="/editbreeder" element={<EditBreeder />}/>
             <Route path="/editcurrency" element={<EditCurrency />}/>
             <Route path="/editgender" element={<EditGender/>}/>
             <Route path="/editequipment" element={<EditEquipment/>}/>
             <Route path="/editads" element={<EditAds/>}/>
             <Route path="/editnationality" element={<EditNationality/>}/>
             <Route path="/editnews" element={<EditNews />}/>
             <Route path="/edittrainer" element={<EditTrainer/>}/>
             <Route path="/edithorse" element={<EditHorse />}/>
             <Route path="/editgroundtype" element={<EditGroundType />}/>
             <Route path="/edittrack" element={<EditTrack />}/>
             <Route path="/editracename" element={<EditRaceName />}/>
             <Route path="/editracetype" element={<EditRaceType />}/>
             <Route path="/editracekind" element={<EditRaceKind />}/>
             <Route path="/editmeetingtype" element={<EditMeetingType />}/>
             <Route path="/editverdict" element={<EditVerdict />}/>
             <Route path="/edithorsekind" element={<EditHorseKind />}/>
             <Route path="/editrace" element={<EditRace />}/>
             <Route path="/editcategory" element={<EditCategory />}/>
             <Route path="/editcompetition" element={<EditCompetition />}/>
             <Route path="/editraceCard" element={<EditRaceCard />}/>
             <Route path="/editseo" element={<EditSeo />}/>

           </Route>
         </Routes>
         </div>
        
       </BrowserRouter>
     </div>
   </Provider>:<h1 style={{
      display:'flex',
      justifyContent:'center',
      alignItem:'center'    }}>Not Available in this device</h1>
    }
     
    </>
  );
}

export default App;
