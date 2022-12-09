import React, { useEffect } from "react";
import Moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { fetchjockey } from "../../../redux/getReducer/getJockeySlice";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchHorse } from "../../../redux/getReducer/getHorseSlice";
import Select from "react-select";
import swal from "sweetalert";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { toast } from 'react-toastify';

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

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
  const [Rank, setRank] = useState(1 + 1);

  const [items, setitems] = useState(LocalItem());
  const { data: horse } = useSelector((state) => state.horse);

  const history = useNavigate();
  const { state } = useLocation();
  const { fullresultid } = state;

  console.log(fullresultid,'fullresultid');

  let horseoptions = horse.map(function (item) {
    return {
      id: item._id,
      value: item.NameEn,
      label: item.NameEn,
    };
  });
  const dispatch = useDispatch();
  const ResultEntry = [
    `${Rank},${HorseID.id},${Prize},${Points},${BonusPoints}`,
  ];
  
  
  useEffect(() => {
    dispatch(fetchHorse());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("results", JSON.stringify(items));
  }, [items]);


  const addItem = (e) => {
    e.preventDefault();
     let ResultEntry = [
      `${Rank},${HorseID.id},${Prize},${Points},${BonusPoints}`,
    ];
    setitems([...items, ResultEntry]);
    setRank(Rank + 1);
    // SetinputData("");
    // SetJockeyData("");
    // SetEquipmentData("");
  };
  const HorseId = HorseID.id
 
  const Remove = () => {
    setitems([]);
  };

  const submit = async (event) => {
    event.preventDefault();
    try { 
      const response = await axios.post(`${window.env.API_URL}createraceresult/${fullresultid},${HorseId}`);
      
      history("/races");
      swal({
        title: "Success",
        text: "Data has been added successfully ",
        icon: "success",
        button: "OK",
      });
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
              </div>

            </div>
            <div className="myselectdata">
              <div className="myselectiondata">
                <span>1</span>
                <span>
                  <Select
                    defaultValue={HorseID}
                    onChange={SetHorseID}
                    options={horseoptions}
                    isClearable={false}
                    isSearchable={true}
                  />
                </span>
                <span>
                  <input type='number' value={Prize} onChange={(e) => SetPrize(e.target.value)} placeholder="Prize" className="resultforminput"/>
                </span>
                <span>
                <input type='number'  value={Points} onChange={(e) => SetPoints(e.target.value)} placeholder="Points"  className="resultforminput"/>
                </span>
                <span>
                <input type='number'  value={BonusPoints} onChange={(e) => SetBonusPoints(e.target.value)} placeholder="BonusPoints"  className="resultforminput"/>
                </span>

                
              </div>
              {/* {items.map((e, i) => {
                return (
                  <div className="myselectiondata">
                  <span  onChange={setRank} value={i + 1}>{i + 2}</span>
                  <span>
                    <Select
                      defaultValue={HorseID}
                      onChange={SetHorseID}
                      options={horseoptions}
                      isClearable={false}
                      isSearchable={true}
                    />
                  </span>
                  <span>
                    <input type='number'  onChange={(e) => SetPrize(e.target.value)} placeholder="Prize" className="resultforminput"/>
                  </span>
                  <span>
                  <input type='number'  onChange={(e) => SetPoints(e.target.value)} placeholder="Points"  className="resultforminput"/>
                  </span>
                  <span>
                  <input type='number'   onChange={(e) => SetBonusPoints(e.target.value)} placeholder="BonusPoints"  className="resultforminput"/>
                  </span>
  
                  
                </div>
                );
              })} */}
              <div className="addbtn">
                <button className="AddAnother" onClick={addItem}>
                Save & Add Another
                </button>
              </div>
              <div className="sbmtbtndiv">
                <div className="RaceButtonDiv">
                <button className="updateButton" onClick={Remove}>
                    Remove
                  </button>
                  <button className="updateButton">Back</button>

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
