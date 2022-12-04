import React, { useEffect } from "react";
import Moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchjockey,
  setjockey,
} from "../../../redux/getReducer/getJockeySlice";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchHorse } from "../../../redux/getReducer/getHorseSlice";
import {
  fetchequipment,
  setequipment,
} from "../../../redux/getReducer/getEquipment";
import { toast } from "react-toastify";

import Select from "react-select";
import swal from "sweetalert";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

const Gelted = [
  { id: "0", value: "false", label: "false" },
  { id: "1", value: "true", label: "true" },
];
const HorseStatusAll = [
  { id: "0", value: "false", label: "false" },
  { id: "1", value: "true", label: "true" },
];
const Foals = [
  { id: "0", value: "1", label: "1" },
  { id: "1", value: "2", label: "2" },
  { id: "2", value: "3", label: "3" },
  { id: "3", value: "4", label: "4" },
  { id: "4", value: "5", label: "5" },
  { id: "5", value: "6", label: "6" },
  { id: "6", value: "7", label: "7" },
  { id: "7", value: "8", label: "8" },
  { id: "8", value: "9", label: "9" },
  { id: "9", value: "10", label: "10" },
];
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
  const [Gate, setGate] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);

  const [EquipmentData, SetEquipmentData] = useState("");
  const [JockeyData, SetJockeyData] = useState("");
  const [items, setitems] = useState(LocalItem());
  const { data: jockey } = useSelector((state) => state.jockey);
  const { data: horse } = useSelector((state) => state.horse);
  const { data: equipment } = useSelector((state) => state.equipment);

  const history = useNavigate();
  const { state } = useLocation();
  const { RaceId } = "state";

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
  }, [items, InputData]);

  const addItem = (e) => {
    e.preventDefault();
    let HorseEntry = [
      `${Gate},${InputData.value},${JockeyData.value},${EquipmentData.value}`,
    ];
    if (InputData === "" || JockeyData === "" || EquipmentData === "") {
      alert("do");
    } else {
      setitems([...items, HorseEntry]);
      setGate(Gate + 1);
    }
    SetinputData("");
    SetJockeyData("");
    SetEquipmentData("");
  };
  const Remove = () => {
    setitems([]);
    setGate(1);
  };
  
  // const deleteBook=(isbn)=>{
  //   const filteredBooks=books.filter((element,index)=>{
  //     return element.isbn !== isbn
  //   })
  //   setbooks(filteredBooks);
  // }

  const submit = (event) => {
    console.log({ HorseEntry: items });
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
                <span>Jockey Weight</span>
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
                    defaultValue={InputData}
                    onChange={SetinputData}
                    options={Gelted}
                    isClearable={false}
                    isSearchable={true}
                  />
                </span>
                <span>
                  <Select
                    defaultValue={JockeyData}
                    onChange={SetJockeyData}
                    options={Foals}
                    isClearable={false}
                    isDisabled={isDisabled}
                    isSearchable={true}
                  />
                </span>

                <span>
                  <Select
                    defaultValue={EquipmentData}
                    onChange={SetEquipmentData}
                    options={HorseStatusAll}
                    isClearable={false}
                    isSearchable={true}
                  />
                </span>
              </div>
              {items.map((e, i) => {
                return (
                  <div className="myselectiondata">
                    <span onChange={setGate} value={i + 1}>
                      {i + 2}
                    </span>
                    <span>
                      <Select
                        defaultValue={InputData}
                        onChange={SetinputData}
                        options={Gelted}
                        isClearable={false}
                        isSearchable={true}
                      />
                    </span>
                    <span>
                      <Select
                        defaultValue={JockeyData}
                        onChange={SetJockeyData}
                        options={Foals}
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
                        options={HorseStatusAll}
                        isClearable={false}
                        isSearchable={true}
                      />
                    </span>
                  </div>
                );
              })}

              <div className="addbtn">
                <button className="AddAnother" onClick={addItem}>
                 {/* Save <AiOutlinePlus /> Add Another{" "} */}
                 Save & Add Another{" "}

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
                    Save & Next
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
