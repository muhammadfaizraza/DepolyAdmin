import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";

function HorseData() {
 

  const { state } = useLocation();

  const { RaceKind,
    raceName,
    Description,
    DayNTime,
   Weather,
   RaceStatus} = state;

   


(RaceKind,raceName,Description,'DescriptionDescription')
  return (
    <div className="HorseData">
      
      <ToastContainer />
      <h2>Data</h2>
    </div>
  );
}

export default HorseData;
