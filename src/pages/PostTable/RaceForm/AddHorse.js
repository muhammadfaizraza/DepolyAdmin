import React, { useEffect } from "react";
import Moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { fetchjockey } from "../../../redux/getReducer/getJockeySlice";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchHorse } from "../../../redux/getReducer/getHorseSlice";
import { fetchequipment } from "../../../redux/getReducer/getEquipment";
import { toast } from 'react-toastify';

import Select from "react-select";
import swal from "sweetalert";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

const LocalItem = () => {
  const list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const RaceForm = () => {
  const [InputData, SetinputData] = useState("");
  const [Gate , setGate] = useState(1)
  const [EquipmentData, SetEquipmentData] = useState("");
  const [JockeyData, SetJockeyData] = useState("");
  const [items, setitems] = useState(LocalItem());
  const { data: jockey } = useSelector((state) => state.jockey);
  const { data: horse } = useSelector((state) => state.horse);
  const { data: equipment } = useSelector((state) => state.equipment);

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
  let AllJockey = jockey.map(function (item) {
    return {
      id: item._id,
      value: item.NameEn,
      label: item.NameEn,
      weight: item.MaximumJockeyWeight,
    };
  });
  let AllEquipment = equipment.map(function (item) {
    return {
      id: item._id,
      value: item.NameEn,
      label: item.NameEn,
     
    };
  });
  const dispatch = useDispatch();

const HorseLength = horse.length;
const ItemLength = items.length;


  useEffect(() => {
    dispatch(fetchHorse());
    dispatch(fetchjockey());
    dispatch(fetchequipment());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items ,InputData]);
  
  const addItem = (e) => {
    e.preventDefault();
     let HorseEntry = [
      `${Gate},${InputData.id},${JockeyData.id},${JockeyData.weight},${EquipmentData.id}`,
    ];
    if(HorseLength === ItemLength){
      toast('No Horse ')
    }
    else  if (InputData === "" || JockeyData === "" || EquipmentData === "") {
      toast('Select Values ')
    }
    else {
      setitems([...items, HorseEntry]);
      setGate(Gate + 1);
    }
    SetinputData("");
    SetJockeyData("");
    SetEquipmentData("");
  };
  const Remove = () => {
    setitems([]);
    setGate(1)
    SetinputData("");
    SetJockeyData("");
    SetEquipmentData("");
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${window.env.API_URL}addracehorses/${RaceId}`, {HorseEntry:items});
      localStorage.removeItem('lists')
      setGate(1)
      history("/fullpublishrace", {
        state: {
          RaceId: RaceId
        },
      });
     
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
    setitems([]);
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
              <h4>Add Horse</h4>
            </div>
            <div className="myselecthorse">
              <div className="myselecthorsedata">
                <span>Gate #</span>
                <span>Horse Name</span>
                <span>Jockey Name</span>
                {/* <span>Jockey Weight</span> */}
                <span>Equipment</span>
              </div>
            </div>
            <div className="myselectdata">
            <div className="myselectiondata">
                <span onChange={setGate} value={1}>
                  1
                </span>
                <span>
                      <Select
                        className="dropdown multidropdown"
                        defaultValue={InputData}
                        onChange={SetinputData}
                        options={horseoptions}
                        isClearable={false}
                        isSearchable={true}
                      />
                    </span>
                    <span>
                      <Select
                        className="dropdown multidropdown"
                        defaultValue={JockeyData}
                        onChange={SetJockeyData}
                        options={AllJockey}
                        isClearable={false}
                        isSearchable={true}
                      />
                    </span>
                    {/* <span>
                      {JockeyData.weight === undefined ? (
                        <></>
                      ) : (
                        <>{JockeyData.weight} KG</>
                      )}{" "}
                    </span> */}
                    <span>
                  <Select
                    className="dropdown multidropdown"
                    defaultValue={EquipmentData}
                    onChange={SetEquipmentData}
                    options={AllEquipment}
                    isClearable={false}
                    isSearchable={true}
                  />
                   </span>
              </div>
              {items.map((e, i) => {
                return (
                  <div className="myselectiondata">
                    <span onChange={setGate} value={i + 1}>{i + 2}</span>
                    <span>
                      <Select
                        defaultValue={InputData}
                        onChange={SetinputData}
                        options={horseoptions}
                        isClearable={false}
                        isSearchable={true}
                      />
                    </span>
                    <span>
                      <Select
                        defaultValue={JockeyData}
                        onChange={SetJockeyData}
                        options={AllJockey}
                        isClearable={false}
                        isSearchable={true}
                      />
                    </span>
                    {/* <span>
                      {JockeyData.weight === undefined ? (
                        <></>
                      ) : (
                        <>{JockeyData.weight} KG</>
                      )}{" "}
                    </span> */}
                    <span>
                  <Select
                    defaultValue={EquipmentData}
                    onChange={SetEquipmentData}
                    options={AllEquipment}
                    isClearable={false}
                    isSearchable={true}
                  />
                   </span>
                  </div>
                );
              })}

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

                  <button
                    className="SubmitButton"
                    type="submit"
                    onClick={submit}
                   
                  >
                    Next & Add Verdict
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
