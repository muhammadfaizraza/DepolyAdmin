import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { fetchrace } from "../../../redux/getReducer/getRaceSlice";
import { useSelector, useDispatch } from "react-redux";
import makeAnimated from "react-select/animated";
import dateFormat from "dateformat";
import { fetchcompetition } from "../../../redux/getReducer/getCompetition";

const LocalItem = () => {
  const list = localStorage.getItem("competition");
  if (list) {
    return JSON.parse(localStorage.getItem("competition"));
  } else {
    return [];
  }
};

const Nationality = () => {
  const [Competition, setCompetition] = useState("");

  const { data: race } = useSelector((state) => state.race);
  const { data: competition } = useSelector((state) => state.competition);

  const { state } = useLocation();
  const { competitionId } = state;

  console.log(competitionId._id, "id is this");

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
  const history = useNavigate();
  const [selectedValue, setSelectedValue] = useState([]);
  const [RaceModelId, SetRaceModelId] = useState("");
  // const [BonusPoints, SetBonusPoints] = useState("");
  // const [Points, SetPoints] = useState("");
  const [items, setitems] = useState(LocalItem());

  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.id) : []);
  };

  useEffect(() => {
    dispatch(fetchrace());
    dispatch(fetchcompetition());
  }, [dispatch]);
  useEffect(() => {
    localStorage.setItem("competition", JSON.stringify(items));
  }, [items]);

  const id = competitionId._id;

  const addItem = (e) => {
    e.preventDefault();
    let CastRaces = [`${RaceModelId.id},${"34"},${"534"}`];

    setitems([...items, CastRaces]);
  };
  const Publish = async (event) => {
    event.preventDefault();
    try {
      console.log({ RaceEntry: items }, "selectedValue");
      const response = await axios.post(
        `${window.env.API_URL}/addraceincompetition/${id}`,
        { CastRaces: items }
      );
      const msgdata = response.data.msg;
      // history('/competitionlisting')
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
            <div className="cast">
              <h4 className="pickCountstyle">Add Races for Cast</h4>
              {competitionId.pickCount > 0 ? (
                <>
                  <div className="row mainrow">
                    {/* <div className="col-sm">
                      <Select
                        placeholder={<div>Select Comprtition</div>}
                        defaultValue={Competition}
                        onChange={setCompetition}
                        options={AllFetchCompetition}
                        isClearable={true}
                        isSearchable={true}
                      />
                      <span className="spanForm">|</span>
                    </div> */}
                    <div className="col-sm">
                      <Select
                        defaultValue={RaceModelId}
                        onChange={SetRaceModelId}
                        options={AllFetchData}
                        isClearable={false}
                        isSearchable={true}
                      />
                      {/* <Select
                        defaultValue={RaceModelId}
                        onChange={SetRaceModelId}
                        options={AllFetchData}
                        isClearable={false}
                        isSearchable={true}
                      /> */}
                    </div>
                  </div>
                  {items.map((data, i) => {
                    return (
                      <div className="row mainrow">
                    <div className="col-sm">
                      <Select
                        defaultValue={RaceModelId}
                        onChange={SetRaceModelId}
                        options={AllFetchData}
                        isClearable={false}
                        isSearchable={true}
                      />
                    </div>
                  </div>
                    );
                  })}
                  <div className="addbtn">
                    <button className="AddAnother" onClick={addItem}>
                      Save & Add Another
                    </button>
                  </div>
                </>
              ) : (
                <h4 className="pickCountstyle">
                  No {competitionId.pickCount}Cast
                </h4>
              )}
            </div>
            <div className="tricomp">
              <h4 className="pickCountstyle">Add Races for PickSix</h4>
              {competitionId.TriCount > 0 ? (
                <>
                  <div className="row mainrow">
                    <div className="col-sm">
                      <Select
                        defaultValue={RaceModelId}
                        onChange={SetRaceModelId}
                        options={AllFetchData}
                        isClearable={false}
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
                  {/* {items.map((data, i) => {
                    return (
                      <div className="row mainrow">
                        <Select
                          className="dropdown multidropdown"
                          placeholder="Select Option"
                          value={AllFetchData.filter((obj) =>
                            selectedValue.includes(obj.id)
                          )} // set selected values
                          options={AllFetchData} // set list of the data
                          onChange={handleChange} // assign onChange function
                          isMulti
                          isClearable
                        />
                      </div>
                    );
                  })} */}
                </>
              ) : (
                <h4 className="pickCountstyle">
                  No Pick{competitionId.TriCount}
                </h4>
              )}
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
