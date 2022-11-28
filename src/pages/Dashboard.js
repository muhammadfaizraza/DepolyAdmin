import React,{useEffect} from 'react'
import '../Components/CSS/home.css'
import { fetchrace, STATUSES } from "../redux/getReducer/getRaceSlice";
import { fetchtobePublishRace } from "../redux/getReducer/getToBePublishRace";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import HorseAnimation from "../assets/horselottie.json";


const Dashboard = () => {

  const dispatch = useDispatch();
  const { data: race, status } = useSelector((state) => state.race);
  const { data: tobePublishRace } = useSelector((state) => state.tobePublishRace);

  useEffect(() => {
    dispatch(fetchrace());
    dispatch(fetchtobePublishRace());
  }, [dispatch]);
  if (status === STATUSES.LOADING) {
        return <Lottie animationData={HorseAnimation} loop={true}  className='Lottie'/>

  }

  if (status === STATUSES.ERROR) {
    return (
      <h2
        style={{
          margin: "100px",
        }}
      >
        Something went wrong!
      </h2>
    );
  }

  return (
    <>

    <div className='page'>
  
      <div className='rightsidedata'>
        <div className='dashboardheader'>
          <h2>Dashboard</h2>
        </div>
       <div className='DashboardCard'>
        <div className='OngoingRaces'>
          <p>Ongoing Races </p>
          <h3>0{race.length}</h3>
        </div>
        <div className='ResultAwaited'>
        <p>Result Awaited</p>
        <h3>0{tobePublishRace.length}</h3>
        </div>
        <div className='CompetitionsRaces'>
        <p>Competitions</p>
        </div>
        <div className='TeamsRace'>
        <p>Teams</p>
        </div>
        <div className='GenerateReports'>
        <p>Generate Reports</p>
        </div>
       </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard
