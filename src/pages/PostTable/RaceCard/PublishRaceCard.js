import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate ,useLocation} from "react-router-dom";
import Select from "react-select";
import DateTimePicker from "react-datetime-picker";
import { fetchracecourse } from "../../../redux/getReducer/getRaceCourseSlice";
import { useSelector, useDispatch } from "react-redux";
import makeAnimated from "react-select/animated";
import dateFormat from "dateformat";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const LocalItem = () => {
  const list = localStorage.getItem("cards");
  if (list) {
    return JSON.parse(localStorage.getItem("cards"));
  } else {
    return [];
  }
};

const Nationality = () => {
  const [Race, setRace] = useState("");
  const [DayNTime, setDayNTime] = useState("");
  const [FetchData, setFetchData] = useState([]);

  const [RaceData, setRaceData] = useState([]);
  const { data: racecourse } = useSelector((state) => state.racecourse);
  const {state} = useLocation();
  const {CardId ,RaceCourseId} = state;
  console.log(CardId,'id is this')
  console.log(RaceCourseId,'RaceCourseId is this')

  console.log(FetchData)
  let AllFetchData =
    FetchData === undefined ? (
      <></>
    ) : (
      FetchData.map(function (item) {
        return {
          id: item._id,
          value: item._id,
          label: item.MeetingCode,
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
    dispatch(fetchracecourse());
  }, [dispatch]);


  const FatchRace = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${window.env.API_URL}/getracesthroughracecourseandtime/${RaceCourseId}/${FormaredDate}`
      );
      setFetchData(response.data.data);
      const msg = response.data.data.length;
      swal({
        // title: "Success!",
        text: `${msg} Data Found`,
        icon: "success",
        button: "OK",
      });
    } catch (error) {
      console.log(error);
      const err = error.response.data.message;
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
    }
  };
  const Publish = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${window.env.API_URL}/addracesinracecard/${CardId}`,{RaceEntry:selectedValue});
        const msgdata = response.data.msg
        history('/racecardlisting')
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
          <div className="Headers">Create Race Card</div>
          <div className="form">
          
            <div className="row mainrow">
              <div className="col-sm">
                <DateTimePicker
                  monthPlaceholder="Date "
                  dayPlaceholder="&"
                  yearPlaceholder="Time"
                  dateFormat="dd MMMM yyyy"
                  onChange={setDayNTime}
                  // minDate={today}
                  // maxDate={new Date("02-29-2023")}
                  value={DayNTime}
                />
              </div>
            </div>
            <div className="ButtonSection " style={{ justifyContent: "end" }}>
              <button Name="submit" className="SubmitButton" onClick={FatchRace}>
                Fetch Races
              </button>
            </div>

            <div className="row mainrow">
              {/* <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={AllFetchData}
                onChange={setRaceData}
                value={RaceData.id}
               '
              /> */}
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
