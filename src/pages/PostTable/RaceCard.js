import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DateTimePicker from "react-datetime-picker";
import { fetchracecourse } from "../../redux/getReducer/getRaceCourseSlice";
import { useSelector, useDispatch } from "react-redux";
import makeAnimated from "react-select/animated";
import dateFormat, { masks } from "dateformat";

const Nationality = () => {
  const [Race, setRace] = useState("");
  const [DayNTime, setDayNTime] = useState("");
  const [FetchData, setFetchData] = useState('')
  
  const history = useNavigate();
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();

  const { data: racecourse } = useSelector((state) => state.racecourse);

  const FormaredDate =   dateFormat(DayNTime, "isoDateTime");
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

  useEffect(() => {
    dispatch(fetchracecourse());
  }, []);
  const submit = async (event) => {
    event.preventDefault();
        const response = axios.post(`http://3.90.189.40:4000/api/v1/getracesthroughracecourseandtime/${Race.id}/${FormaredDate}`);
    setFetchData(response);
  }

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
                  value={DayNTime}
                />
              </div>
            </div>
            <div className="ButtonSection " style={{ justifyContent: "end" }}>
              <button Name="submit" className="SubmitButton" onClick={submit}>
                Fetch Races
              </button>
            </div>
            <div className="row mainrow">
              <div className="col-sm">
                <Select
                  closeMenuOnSelect={false}
                  placeholder={<div>Select Multiple Races</div>}
                  components={animatedComponents}
                  isMulti
                  // options={Racenameoptions}
                  // value={Race}
                  // onChange={setRace}
                />
                <span className="spanForm"> |</span>
              </div>

              <div className="col-sm">
                <Select
                  required
                  placeholder={<div>حدد نوع الجنس</div>}
                  className="selectdir"
                  components={animatedComponents}
                  isMulti
                  // options={Racenameoptions}
                  // value={Race}
                  // onChange={setRace}
                />
              </div>
            </div>
            <div className="ButtonSection " style={{ justifyContent: "end" }}>
              <button Name="submit" className="SubmitButton">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nationality;
