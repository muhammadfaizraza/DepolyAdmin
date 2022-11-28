import React, { useEffect,Fragment } from "react";
import Moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { fetchjockey } from "../../../redux/getReducer/getJockeySlice";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchHorse ,STATUSES } from "../../../redux/getReducer/getHorseSlice";
import { fetchverdict } from '../../../redux/getReducer/getVerdict'
import Select from "react-select";
import swal from "sweetalert";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";


const LocalItem = () => {

  const list = localStorage.getItem("verdict");
  if (list) {
    return JSON.parse(localStorage.getItem("verdict"));
  } else {
    return [];
  }
};

const PublishRace = () => {
  const [InputData, SetinputData] = useState("");
  const [InputData2, SetinputData2] = useState("");
  const [VerdictName, SetVerdictName] = useState('');
  const [Gate , setGate] = useState(1)
  const [JockeyData, SetJockeyData] = useState("");
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
  let AllJockey = jockey.map(function (item) {
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
  const VerdictEntry = [`${VerdictName.id},${Gate},${InputData.id}`];

  useEffect(() => {
    dispatch(fetchHorse());
    dispatch(fetchjockey());
    dispatch(fetchverdict());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("verdict", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    setitems([...items, VerdictEntry]);
    setGate(Gate + 1)
  };
  const Remove = () => {
    setitems([]);
    setGate(1)
  };
  const submit = async (event) => {
    event.preventDefault();
    try {
      


(items, "VerdictEntry");
      const response = await axios.post(`http://3.90.189.40:4000/api/v1addverdicts/${RaceId}`, {VerdictEntry:items});
      const response1 = await axios.put(`http://3.90.189.40:4000/api/v1/publishrace/${RaceId}`);
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
            className="Header"
            style={{ marginTop: "2px", marginLeft: "12px" }}
          >
            <h4>Verdict Selection</h4>
            <button onClick={addItem}>Add Verdict</button>
          </div>

          <Tabs defaultActiveKey="0" id="justify-tab-example" className="mb-3">

           {
            items.map((data,index) => {
              return(
                <Tab eventKey={index} title={`Verdict # ${index + 1 }`} className="Verdicttab">
                <div className="myselecthorse">
                  <div className="myselecthorsedata">
                    <span>Rank #</span>
                    <span>Verdict Name</span>
                    <span>Horse Name</span>
                    {/* <span>Jockey Name</span> */}
                  </div>
                </div>
                {items.map((e, i) => {
                return (
                  <div className="myselectiondata">
                    <span >{i + 1}</span>
                    {/* <span>
                      <input type='text' value={VerdictName} onChange={() => SetVerdictName(e.target.value)} placeholder='Verdict Name' className='textverdict' />
                    </span> */}
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

                </Tab> 
              )
            })
           }

          </Tabs>
          <button
                    className="SubmitButton"
                    type="submit"
                    onClick={submit}
                  >
                    Publish
                  </button>
                  <button
                    className="SubmitButton"
                   
                    onClick={Remove}
                  >
                    Remove
                  </button>
        </div>
      </div>
    </Fragment>
  );
};

export default PublishRace;
