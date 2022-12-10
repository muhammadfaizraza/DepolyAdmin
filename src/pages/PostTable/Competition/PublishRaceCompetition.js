import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate ,useLocation} from "react-router-dom";
import Select from "react-select";
import { fetchrace } from "../../../redux/getReducer/getRaceSlice";
import { useSelector, useDispatch } from "react-redux";
import makeAnimated from "react-select/animated";
import dateFormat from "dateformat";
import { fetchcompetition } from "../../../redux/getReducer/getCompetition";


const LocalItem = () => {
  const list = localStorage.getItem("cards");
  if (list) {
    return JSON.parse(localStorage.getItem("cards"));
  } else {
    return [];
  }
};

const Nationality = () => {
  const [Competition, setCompetition] = useState("");
  const [DayNTime, setDayNTime] = useState("");

  const { data: race } = useSelector((state) => state.race);
  const { data: competition } = useSelector((state) => state.competition);

  const {state} = useLocation();
  const {competitionId} = state;

  console.log(competitionId._id,'id is this')

  let AllFetchData =
    race === undefined ? (
      <></>
    ) : (
      race.map(function (item) {
        return {
          id: item._id,
          value: item.RaceNameModelData.NameEn,
          label: item.RaceNameModelData.NameEn,
        };
      })
    );
    
console.log(competitionId,'competitionId');


    let AllFetchCompetition =
    competition === undefined ? (
      <></>
    ) : (
      competition.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
        };
      })
    );

    let AllFetchCompetitionAr =
    competition === undefined ? (
      <></>
    ) : (
      competition.map(function (item) {
        return {
          id: item._id,
          value: item.NameAr,
          label: item.NameAr,
        };
      })
    );
    
    
  // const history = useNavigate();
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const FormaredDate = dateFormat(DayNTime, "isoDateTime");
  const history = useNavigate();
  const [selectedValue, setSelectedValue] = useState([]);
 
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.id) : []);
  }
  
  useEffect(() => {
    dispatch(fetchrace());
    dispatch(fetchcompetition())
  }, [dispatch]);

  const Publish = async (event) => {
    event.preventDefault();
    try {

      console.log({RaceEntry:selectedValue},'selectedValue')
      const response = await axios.post(
        `${window.env.API_URL}/addraceincompetition/${competitionId._id}`,{RaceEntry:selectedValue});
        const msgdata = response.data.msg
        history('/competitionlisting')
      swal({
        title: "Success!",
        text: msgdata,
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
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Create Competition</div>
          <div className="form">
          <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Comprtition</div>}
                      defaultValue={Competition}
                      onChange={setCompetition}
                      options={AllFetchCompetition}
                      isClearable={true}
                      isSearchable={true}
                    />
                  <span className="spanForm">|</span>
                  </div>
                  <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد نوع الجنس</div>}
                      className="selectdir"
                      defaultValue={Competition}
                      onChange={setCompetition}
                      options={AllFetchCompetitionAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>

            <div className="row mainrow">
               <Select
                className="dropdown multidropdown"
                placeholder="Select Option"
                value={AllFetchData.filter(obj => selectedValue.includes(obj.id))} // set selected values
                options={AllFetchData} // set list of the data
                onChange={handleChange} // assign onChange function
                isMulti
                isClearable   
              />
            </div>

            <div className="ButtonSection " style={{ justifyContent: "end" }}>
              <button Name="submit" className="SubmitButton" onClick={Publish}>
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nationality;
