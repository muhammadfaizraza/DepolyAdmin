import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DateTimePicker from "react-datetime-picker";
import { fetchracecourse } from "../../../redux/getReducer/getRaceCourseSlice";
import { useSelector, useDispatch } from "react-redux";
import makeAnimated from "react-select/animated";
import dateFormat from "dateformat";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";


const Nationality = () => {
  const [Race, setRace] = useState("");
  const [DayNTime, setDayNTime] = useState("");
  const [FetchData, setFetchData] = useState([]);
  const [NameEn, setNameEn] = useState('');
  const [NameAr, setNameAr] = useState('');

  const [RaceData, setRaceData] = useState("");
  const { data: racecourse } = useSelector((state) => state.racecourse);

  let AllFetchData =
    FetchData === undefined ? (
      <></>
    ) : (
      FetchData.map(function (item) {
        return {
          id: item._id,
          value: item.RaceNameModelData.shortCode,
          label: item.RaceNameModelData.NameEn,
        };
      })
    );
    
    let Racenameoptions =
    racecourse === undefined ? (
      <></>
    ) : (
      racecourse.map(function (item) {
        return {
          id: item._id,
          value: item.TrackNameEn,
          label: item.TrackNameEn,
        };
      })
    );
  // const history = useNavigate();
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const FormaredDate = dateFormat(DayNTime, "isoDateTime");
  var today = new Date();

  useEffect(() => {
    dispatch(fetchracecourse());
  }, [dispatch]);
  const FatchRace = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${window.env.API_URL}/getracesthroughracecourseandtime/${Race.id}/${FormaredDate}`
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

  
  const Submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("RaceCardNameEn", NameEn);
      formData.append("RaceCardNameAr", NameAr);
      formData.append("RaceCardCourse", Race.id);
      const response = await axios.post(
        `${window.env.API_URL}/uploadRaceCard`,formData
      );
      // setFetchData(response.data.data);
      // const msg = response.data.data.length;
      swal({
        title: "Success!",
        text: "Data has been added successfully ",
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
  console.log(RaceData)
  const Publish = async (event) => {
    event.preventDefault();
    try {

      const response = await axios.post(
        `${window.env.API_URL}/addracesinracecard/${'be9704d5-a531-4a6b-974e-29297c384cb2'}`,[RaceData[0].id]
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
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Race Card Name"
                    className="mb-3"
                    onChange={(e) => setNameEn(e.target.value)}
                    value={NameEn}
                  >
                    <Form.Control type="text" placeholder="Race Card Name" />
                  </FloatingLabel>

                  <span className="spanForm"> |</span>
                </div>
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="رمز قصير"
                    onChange={(e) => setNameAr(e.target.value)}
                    value={NameAr}
                    className="mb-3 floatingInputAr "
                    style={{ direction: "rtl", left: "initial", right: 0 }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="اسم"
                      style={{ left: "%" }}
                    />
                  </FloatingLabel>
                </div>
              </div>

              <div className="row mainrow">
              <div className="col-sm">
                <Select
                  placeholder={<div>Select Race Course</div>}
                  isClearable={true}
                  isSearchable={true}
                  defaultValue={Race}
                  value={Race}
                  onChange={setRace}
                  options={Racenameoptions}
                />
                <span className="spanForm"> |</span>
              </div>

              <div className="col-sm">
                <Select
                  required
                  placeholder={<div>حدد نوع الجنس</div>}
                  className="selectdir"
                  isClearable={true}
                  isSearchable={true}
                />
              </div>
            </div>
            
            
            <div className="ButtonSection " style={{ justifyContent: "end" }}>
              <button Name="submit" className="SubmitButton" onClick={Submit}>
                Submit
              </button>
            </div>

            <div className="row mainrow">
              <div className="col-sm">
                <Select
                  placeholder={<div>Select Race Course</div>}
                  isClearable={true}
                  isSearchable={true}
                  defaultValue={Race}
                  value={Race}
                  onChange={setRace}
                  options={Racenameoptions}
                />
                <span className="spanForm"> |</span>
              </div>

              <div className="col-sm">
                <Select
                  required
                  placeholder={<div>حدد نوع الجنس</div>}
                  className="selectdir"
                  isClearable={true}
                  isSearchable={true}
                />
              </div>
            </div>
            <div className="row mainrow">
              <div className="col-sm">
                <DateTimePicker
                  monthPlaceholder="Date "
                  dayPlaceholder="&"
                  yearPlaceholder="Time"
                  dateFormat="dd MMMM yyyy"
                  onChange={setDayNTime}
                  minDate={today}
                  maxDate={new Date("02-29-2023")}
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
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={AllFetchData}
                onChange={setRaceData}
                value={RaceData}
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
