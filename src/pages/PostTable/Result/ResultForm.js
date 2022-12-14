import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchHorse } from "../../../redux/getReducer/getHorseSlice";
import { fetchfinalposition } from "../../../redux/getReducer/getFinalPosition";

import Select from "react-select";
import swal from "sweetalert";
import axios from "axios";
import { toast } from 'react-toastify';

const LocalItem = () => {
  const list = localStorage.getItem("results");
  if (list) {
    return JSON.parse(localStorage.getItem("results"));
  } else {
    return [];
  }
};

const RaceForm = () => {

  const [HorseID, SetHorseID] = useState("");
  const [Prize, SetPrize] = useState("");
  const [Points, SetPoints] = useState("");
  const [BonusPoints, SetBonusPoints] = useState("");
  const [Rank, setRank] = useState(1);
  const [FinalPosition, setFinalPosition] = useState('');
  const [VideoLink, setVideoLink] = useState('');
  const [SearchAge, setSearchAge] = useState('');
  const [SearchCode, setSearchCode] = useState('');
  const [SearchTitle, setSearchTitle] = useState('');
  const [items, setitems] = useState(LocalItem());
  const { data: horse } = useSelector((state) => state.horse);
  const { data: finalposition } = useSelector((state) => state.finalposition);

  const history = useNavigate();
  const { state } = useLocation();
  const { RaceId } = state;

  let horseoptions = horse.map(function (item) {
    return {
      id: item._id,
      value: item.NameEn,
      label: item.NameEn,
    };
  });

  let finalposition1 = finalposition.map(function (item) {
    return {
      id: item._id,
      value: item.NameEn,
      label: item.NameEn,
    };
  });

  const horseLength = horse.length;
  const ItemLength = items.length;
  
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    dispatch(fetchHorse({SearchCode,SearchTitle,SearchAge}));
    dispatch(fetchfinalposition({SearchCode,SearchTitle}));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("results", JSON.stringify(items));
  }, [items]);

  const addItem = (e) => {
    e.preventDefault();
     let ResultEntry = [
      `${Rank},${HorseID.id},${Prize},${Points},${BonusPoints},${VideoLink},${FinalPosition.id}`,
    ];

    if(horseLength === ItemLength){
      toast('No Horse ')
    }
    else  if (HorseID === "" || BonusPoints === "") {
      toast('Select Values ')
    }
    else {
    setitems([...items, ResultEntry]);
    setRank(Rank + 1);
    }
    //   
  };
 
  const Remove = () => {
    setitems([]);
    SetBonusPoints("");
    SetPoints("");
    SetPrize("");
    SetHorseID("");
    setRank(1);
    setFinalPosition('');
    setVideoLink('')
  };

  const submit = async (event) => {
    event.preventDefault();
    try { 
      const response = await axios.post(`${window.env.API_URL}createraceresult/${RaceId}`,{ResultEntry:items});
      
      swal({
        title: "Success",
        text: "Data has been added successfully ",
        icon: "success",
        button: "OK",
      });
      const Raceresult = response.data.data._id;
      history("/resultannounced", {
        state: {
          Raceresult: Raceresult,
        },
      });
      localStorage.removeItem('results')
    } catch (error) {
      const err = error.response.data.message;
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
    }
  };
 
  return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Header ">
              <h4>Add Result</h4>
            </div>
            <div className="myselecthorse">
              <div className="myselecthorsedata">
                <span>Rank #</span>
                <span>Horse Name</span>
                <span>Prize</span>
                <span>Points</span>
                <span>BonusPoints</span>
                <span>FinalPosition</span>
                <span>VideoLink</span>
                {/* <span>Action</span> */}
              </div>

            </div>
            <div className="myselectdata">
              <div className="myselectiondata">
                <span onChange={setRank} value={1}>1</span>
                <span>
                  <Select
                   className="dropdown multidropdown"
                    defaultValue={HorseID}
                    onChange={SetHorseID}
                    options={horseoptions}
                    isClearable={true}
                    isSearchable={true}
                  />
                </span>
                <span>
                  <input type='number'  onChange={(e) => SetPrize(e.target.value)} placeholder="Prize" className="resultforminput"/>
                </span>
                <span>
                <input type='number'   onChange={(e) => SetPoints(e.target.value)} placeholder="Points"  className="resultforminput"/>
                </span>
                <span>
                <input type='number'  onChange={(e) => SetBonusPoints(e.target.value)} placeholder="BonusPoints"  className="resultforminput"/>
                </span>
                <span>
                  <Select
                   className="dropdown multidropdown"
                    defaultValue={FinalPosition}
                    onChange={setFinalPosition}
                    options={finalposition1}
                    isClearable={true}
                    isSearchable={true}
                  />
                </span>
                <span>
                <input type='text'  onChange={(e) => setVideoLink(e.target.value)} placeholder="VideoLink"  className="resultforminput"/>
                </span>

                <button className="AddAnother1" onClick={addItem}>
                  Save
                </button>
              </div>
            {
              items.map((data,i) => {
                return(
                  <div className="myselectdata" key={i}>
                  <div className="myselectiondata">
                    <span onChange={setRank} value={i+1}>{i + 2}</span>
                    <span>
                  <Select
                   className="dropdown multidropdown"
                    defaultValue={HorseID}
                    onChange={SetHorseID}
                    options={horseoptions}
                    isClearable={true}
                    isSearchable={true}
                  />
                </span>
                    <span>
                      <input type='number'  onChange={(e) => SetPrize(e.target.value)} placeholder="Prize" className="resultforminput"/>
                    </span>
                    <span>
                    <input type='number' onChange={(e) => SetPoints(e.target.value)} placeholder="Points"  className="resultforminput"/>
                    </span>
                    <span>
                    <input type='number' onChange={(e) => SetBonusPoints(e.target.value)}   placeholder="BonusPoints"  className="resultforminput"/>
                    </span>
                    <span>
                  <Select
                   className="dropdown multidropdown"
                    defaultValue={FinalPosition}
                    onChange={setFinalPosition}
                    options={finalposition1}
                    isClearable={true}
                    isSearchable={true}
                    
                  />
                </span>
                <span>
                <input type='text'  onChange={(e) => setVideoLink(e.target.value)} placeholder="VideoLink"  className="resultforminput"/>
                </span>
                <button className="AddAnother1" onClick={addItem}>
                  Save
                </button>
                  </div>
                  
                </div>
                )
              })
            }
            <div className="addbtn">
                    {/* <button className="AddAnother" onClick={addItem}>
                    Save & Add Another
                    </button> */}
                  </div>
                  <div className="sbmtbtndiv">
                    <div className="RaceButtonDiv">
                    <button className="updateButton" onClick={Remove}>
                        Remove
                      </button>    
                      <button className="SubmitButton" type="submit" onClick={submit}>
                        Save
                      </button>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RaceForm;
