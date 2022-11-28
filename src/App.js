import "./App.css";
import { useEffect } from "react";
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
import EditOwner from "./pages/UpdateTable/EditOwner"
import EditSlider from "./pages/UpdateTable/EditSlider"
import EditSponsor from "./pages/UpdateTable/EditSponsor"
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
// import Racetype from "./pages/GetTable/Racetype";
import Verdict from "./pages/PostTable/Verdict";
import Setting from "./pages/GetTable/Setting";
import AdminProfile from "./pages/Setting/AdminProfile";
import SubscriberList from "./pages/Setting/SubscriberList";
import AdminRole from "./pages/Setting/AdminRole";
import RaceKind from "./pages/GetTable/RaceKind";
import RaceKindForm from "./pages/PostTable/RaceKind";
import PublishRace from "./pages/PostTable/RaceForm/AddVerdict";
import Equipment from "./pages/PostTable/Equipment";
import EquiptmentTable from "./pages/GetTable/EquiptmentTable";
import Verdicts from "./pages/PostTable/Verdicts";
import VerdictTable from "./pages/GetTable/VerdictTable";
import GroundType from "./pages/PostTable/GroundType";
import GroundTypeTable from "./pages/GetTable/GroundTypeTable";
import TestTable from './pages/PostTable/RaceForm/RaceTwo'
import RaceCard from './pages/PostTable/RaceCard'
import { ToastContainer } from 'react-toastify';

function App() {
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);
  return (
    <>
      <Provider store={store}>
        <div className="App">
          <ToastContainer />
          <BrowserRouter>
            <Header />
            <div style={{display: "flex"}}>
            <Sidebar />
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path='/setting' element={<Setting/>} />
                <Route path='/AdminProfile' element={<AdminProfile />} />
                <Route path='/subscriberlist' element={<SubscriberList />} />
                <Route path='/AddRole' element={<AdminRole />} />
                <Route path="/racecourse" element={<RaceCourse />} />
                <Route path="/races" element={<Races />} />
                <Route path="/competition" element={<Competition />} />
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

                {/* Edit Pages */}
                <Route path="/editjockey" element={<EditJockey />} />
                <Route path="/editracecourse" element={<EditRacecourse/>}/>
                <Route path="/editowner" element={<EditOwner/>}/>
                <Route path="/editslider" element={<EditSlider/>}/>
                <Route path="/editsponsor" element={<EditSponsor/>}/>
             
              </Route>
            </Routes>
            </div>
           
          </BrowserRouter>
        </div>
      </Provider>
    </>
  );
}

export default App;
