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
  const [InputData2, SetinputData2] = useState("");
  const [Gate, setGate] = useState("");
  const [JockeyData, SetJockeyData] = useState("");
  const [items, setitems] = useState(LocalItem());
  const { data: jockey } = useSelector((state) => state.jockey);
  const { data: horse } = useSelector((state) => state.horse);

  const history = useNavigate();
  const { state } = useLocation();
  // const { RaceId } = state;

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

  const dispatch = useDispatch();
  const HorseEntry = [
    `1,${InputData.id},${JockeyData.id},${JockeyData.weight}`,
  ];

  useEffect(() => {
    dispatch(fetchHorse());
    dispatch(fetchjockey());
  }, [dispatch]);
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);
  const addItem = () => {
    setitems([...items, HorseEntry]);
    SetinputData("");
  };
  const Remove = () => {
    setitems([]);
  };
  const submit = async (event) => {
    event.preventDefault();
    try {
      
      // const response = await axios.post(`http://3.90.189.40:4000/api/v1addracehorses/${RaceId}`, {HorseEntry:items});
      // const response1 = await axios.put(`http://3.90.189.40:4000/api/v1/publishrace/${RaceId}`);
      // history("/fullpublishrace", {
      //   state: {
      //     RaceId: RaceId
      //   },
      // });
      // history("/races");
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
                <span>Position #</span>
                <span>Horse Name</span>
                <span>Prize</span>
              </div>
            </div>
            <div className="myselectdata">
              <div className="myselectiondata">
                <span>1</span>
                <span>
                  <Select
                    defaultValue={InputData2}
                    onChange={SetinputData2}
                    options={horseoptions[0]}
                    isClearable={false}
                    isSearchable={true}
                  />
                </span>

                <span>
                  {JockeyData.weight === undefined ? (
                    <></>
                  ) : (
                    <>{JockeyData.weight} KG</>
                  )}{" "}
                </span>
              </div>
              <div className="sbmtbtndiv">
                <div className="RaceButtonDiv">
                  <button className="updateButton">Back</button>

                  <button className="SubmitButton" type="submit">
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
