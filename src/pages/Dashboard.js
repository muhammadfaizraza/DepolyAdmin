import React,{useEffect} from 'react'
import '../Components/CSS/home.css'
import { fetchrace, STATUSES } from "../redux/getReducer/getRaceSlice";
import { fetchResult } from "../redux/getReducer/getResultSlice";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import HorseAnimation from "../assets/horselottie.json";


const Dashboard = () => {

  const dispatch = useDispatch();
  const { data: race, status } = useSelector((state) => state.race);
  const { data: tobeRaceResult } = useSelector((state) => state.tobeRaceResult);
  console.log(tobeRaceResult)
  useEffect(() => {
    dispatch(fetchrace());
    dispatch(fetchResult());
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
          <h4 className='topheading'>Dashboard</h4>
        </div>
       <div className='DashboardCard'>
        <div className='OngoingRaces'>
          <p>Ongoing Races </p>
          <h3>{race.length < 10 ? <>0</> : <></>}{race.length}</h3>
        </div>
        <div className='ResultAwaited'>
        <p>Result Awaited</p>
        <h3>{tobeRaceResult ===  undefined ? <>00</> : <>00</>}</h3>
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
