import React, { useEffect,Fragment } from "react";
import Moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchHorse ,STATUSES } from "../../../redux/getReducer/getHorseSlice";
import { fetchpointTable } from "../../../redux/getReducer/getPointTable";
import Select from "react-select";
import swal from "sweetalert";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { toast } from 'react-toastify';


const LocalItem = () => {

  const list = localStorage.getItem("Point");
  if (list) {
    return JSON.parse(localStorage.getItem("Point"));
  } else {
    return [];
  }
};

const PublishRace = () => {
  const [InputData, SetinputData] = useState("");
  const [PointName, SetPointName] = useState('');
  const [Gate , setGate] = useState(1)
  const [items, setitems] = useState(LocalItem());
  const { data: jockey } = useSelector((state) => state.jockey);
  const { data: horse } = useSelector((state) => state.horse);
  const { data: pointTable, status } = useSelector((state) => state.pointTable);

  const history = useNavigate();
  const { state } = useLocation();
  const { RaceId } = state;



  let AllPoint = pointTable.map(function (item) {
    return {
      id: item._id,
      value: item._id,
      label: item.Group_Name,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHorse());
    dispatch(fetchpointTable());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("Point", JSON.stringify(items));
  }, [items]);

  const PointLength = pointTable.length;
  const ItemLength = items.length;


  const addItem = (e) => {
    e.preventDefault();
    let PointEntry = `${PointName.id}`;
    if(PointLength === ItemLength){
      toast('No Point ')
    }
    else  if (PointName === "") {
      toast('Select Values ')
    }
    else {
      setitems([...items, PointEntry]);
      setGate(Gate + 1)
    }
    SetPointName("");
    SetinputData("");
  
  };
  const Remove = () => {
    setitems([]);
    setGate(1)
  };
  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${window.env.API_URL}AddPointTable/${RaceId}`, {Points:items});
      localStorage.removeItem('Point')
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
      localStorage.removeItem('Point')
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
              <h4>Add Point</h4>
            </div>
            <div className="myselecthorse">
              <div className="myselecthorsedata">
                   <span>Rank #</span>
                    <span>Point Table</span>
              </div>
            </div>
            <div className="myselectdata">
            <div className="myselectiondata">
                    <span onChange={setGate} value={1}>1</span>
                    
                     <span>
                      <Select
                        defaultValue={PointName}
                        onChange={SetPointName}
                        options={AllPoint}
                        isClearable={false}
                        isSearchable={true}
                      />
                    </span>
                    
               
                  </div>
              {items.map((e, i) => {
                return (
                  <div className="myselectiondata">
                    <span onChange={setGate} value={i+1}>{i + 2}</span>
                    
                     <span>
                      <Select
                        defaultValue={PointName}
                        onChange={SetPointName}
                        options={AllPoint}
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
