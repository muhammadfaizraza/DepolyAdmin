import React, { useEffect, Fragment } from "react";
import Moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { fetchjockey } from "../../../redux/getReducer/getJockeySlice";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchHorse, STATUSES } from "../../../redux/getReducer/getHorseSlice";
import { fetchverdict } from '../../../redux/getReducer/getVerdict'
import Select from "react-select";
import swal from "sweetalert";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { toast } from 'react-toastify';


const LocalItem = () => {

  const list = localStorage.getItem("verdict");
  if (list) {
    return JSON.parse(localStorage.getItem("verdict"));
  } else {
    return [];
  }
};

const PublishRace = () => {
  const [SearchTitle, setSearchTitle] = useState('')
  const [shortCode, setSearchCode] = useState('')
  const [InputData, SetinputData] = useState("");
  const [VerdictName, SetVerdictName] = useState('');
  const [SearchAge, setSearchAge] = useState('')
  const [NameEn, setNameEn] = useState('')

  const [Gate, setGate] = useState(1)
  const [items, setitems] = useState(LocalItem());
  const { data: jockey } = useSelector((state) => state.jockey);
  const { data: horse } = useSelector((state) => state.horse);
  const { data: verdict } = useSelector((state) => state.verdict);

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


  let AllVerdict = verdict.map(function (item) {
    return {
      id: item._id,
      value: item.NameEn,
      label: item.NameEn,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHorse({SearchTitle,shortCode,SearchAge}));
    dispatch(fetchjockey({ shortCode, SearchTitle }));
    dispatch(fetchverdict({NameEn ,shortCode}));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("verdict", JSON.stringify(items));
  }, [items]);

  const verdictLength = verdict.length;
  const ItemLength = items.length;


  const addItem = (e) => {
    e.preventDefault();
    let VerdictEntry = [`${VerdictName.id},${Gate},${InputData.id}`];
    if (verdictLength === ItemLength) {
      toast('No Verdict ')
    }
    else if (InputData === "" || VerdictName === "") {
      toast('Select Values ')
    }
    else {
      setitems([...items, VerdictEntry]);
      setGate(Gate + 1)
    }
    SetVerdictName("");
    SetinputData("");

  };
  const Remove = () => {
    setitems([]);
    setGate(1)
  };
  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${window.env.API_URL}addverdicts/${RaceId}`, { VerdictEntry: items });
      const response1 = await axios.put(`${window.env.API_URL}/publishrace/${RaceId}`);
      localStorage.removeItem('verdict')
      setGate(1)
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
    <Fragment>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Header ">
              <h4>Add Verdict</h4>
            </div>
            <div className="myselecthorse">
              <div className="myselecthorsedata">
                <span>Rank #</span>
                <span>Verdict Name</span>
                <span>Horse Name</span>
              </div>
            </div>
            <div className="myselectdata">
              <div className="myselectiondata">
                <span onChange={setGate} value={1}>1</span>

                <span>
                  <Select
                    defaultValue={VerdictName}
                    onChange={SetVerdictName}
                    options={AllVerdict}
                    isClearable={false}
                    isSearchable={true}
                  />
                </span>
                <span>
                  <Select
                    defaultValue={InputData}
                    onChange={SetinputData}
                    options={horseoptions}
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
                        defaultValue={VerdictName}
                        onChange={SetVerdictName}
                        options={AllVerdict}
                        isClearable={false}
                        isSearchable={true}
                      />
                    </span>
                    <span>
                      <Select
                        defaultValue={InputData}
                        onChange={SetinputData}
                        options={horseoptions}
                        isClearable={false}
                        isSearchable={true}
                      />
                    </span>
                    {/* <span>
                      <Select
                        defaultValue={JockeyData}
                        onChange={SetJockeyData}
                        options={AllJockey}
                        isClearable={false}
                        isSearchable={true}
                      />
                    </span> */}
                    {/* <span>
                      <Select
                        defaultValue={InputData}
                        onChange={SetinputData}
                        options={horseoptions}
                        isClearable={false}
                        isSearchable={true}
                      />
                    </span> */}
                  </div>
                );
              })}

              <div className="addbtn">
                <button className="AddAnother" onClick={addItem}>
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
                    Publish Race
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Fragment>
  );
};

export default PublishRace;
