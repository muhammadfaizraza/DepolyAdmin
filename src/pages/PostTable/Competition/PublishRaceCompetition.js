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
import { toast } from 'react-toastify';

const LocalItem = () => {
  const list = localStorage.getItem("competition");
  if (list) {
    return JSON.parse(localStorage.getItem("competition"));
  } else {
    return [];
  }
};

const LocalItemTri = () => {
  const listtri = localStorage.getItem("competitiontri");
  if (listtri) {
    return JSON.parse(localStorage.getItem("competitiontri"));
  } else {
    return [];
  }
};

const Nationality = () => {

  const { data: race } = useSelector((state) => state.race);
  const { data: competition } = useSelector((state) => state.competition);

  const { state } = useLocation();
  const { competitionId } = state;

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
  const [Points, SetPoints] = useState("");
  const [BonusPoints, SetBonusPoints] = useState("");

  const [RaceModelIdTri, SetRaceModelIdTri] = useState("");
  const [PointsTri, SetPointsTri] = useState("");
  const [BonusPointsTri, SetBonusPointsTri] = useState("");

  const [Rank, setRank] = useState(1);
  const [items, setitems] = useState(LocalItem());
  const [itemsTri, setitemsTri] = useState(LocalItemTri());

  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.id) : []);
  };

  useEffect(() => {
    dispatch(fetchrace());
    dispatch(fetchcompetition());
  }, [dispatch]);
  useEffect(() => {
    localStorage.setItem("competition", JSON.stringify(items));
    localStorage.setItem("competitiontri", JSON.stringify(itemsTri));
  }, [items,itemsTri]);

  const id = competitionId._id;

  const addItem = (e) => {
    e.preventDefault();
    if (RaceModelId === "" || Points === "" || BonusPoints === "") {
      toast('Select Values ')
    }
    else if(competitionId.pickCount > items.length){
      let CastRaces = [`${RaceModelId.id},${Points},${BonusPoints}`];
      setitems([...items, CastRaces]);
    }
    else{
      console.log('No More Count')
    }
   
  };

  console.log(competitionId.pickCount,'pickCount');
  console.log(competitionId.TriCount,'TriCount')


  const addItemTri = (e) => {
    e.preventDefault();
    if (RaceModelIdTri === "" || PointsTri === "" || BonusPointsTri === "") {
      toast('Select Values ')
    }
    else if(competitionId.TriCount > itemsTri.length){
      let PickRaces = [`${RaceModelIdTri.id},${PointsTri},${BonusPointsTri}`];
      setitemsTri([...itemsTri, PickRaces]);
    }
    else{
      toast('No More Count')
    }
  };

  const Publish = async (event) => {
    event.preventDefault();
    try {
      console.log({ CastRaces: items },
                  { PickRaces: itemsTri }, "selectedValue");
      const response = await axios.post(
        `${window.env.API_URL}/addraceincompetition/${id}`,
        { CastRaces: items, PickRaces: itemsTri },
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

  const Remove = () => {
    setitems([]);
    SetBonusPoints("");
    SetPoints("");
    SetRaceModelId("");
    setRank(1);
  };
  const RemoveTri = () => {
    setitemsTri([]);
    SetBonusPointsTri("");
    SetPointsTri("");
    SetRaceModelIdTri("");
    setRank(1);
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
          <div className="myselecthorse">
            <div className="myselecthorsedata">
              <span>Number #</span>
              <span>Race Name</span>
              <span>Points</span>
              <span>BonusPoints</span>
            </div>
          </div>
          <div className="form">
            <div className="cast">
              <h4 className="pickCountstyle">Add Races for Cast</h4>
              {competitionId.pickCount > 0 ? (
                <>
                  <div className="myselectiondata">
                    <span onChange={setRank} value={1}>
                      1
                    </span>
                    <span>
                      <Select
                        className="dropdown multidropdown"
                        defaultValue={RaceModelId}
                        onChange={SetRaceModelId}
                        options={AllFetchData}
                        isClearable={false}
                        isSearchable={true}
                      />
                    </span>

                    <span>
                      <input
                        type="number"
                        value={Points}
                        onChange={(e) => SetPoints(e.target.value)}
                        placeholder="Points"
                        className="resultforminput"
                      />
                    </span>
                    <span>
                      <input
                        type="number"
                        value={BonusPoints}
                        onChange={(e) => SetBonusPoints(e.target.value)}
                        placeholder="BonusPoints"
                        className="resultforminput"
                      />
                    </span>
                  </div>
                  {items.map((item, i) => {
                    return (
                      <div className="myselectdata" key={i}>
                  <div className="myselectiondata">
                    <span onChange={setRank} value={i+1}>{i + 2}</span>
                    <span>
                      <Select
                        defaultValue={RaceModelId}
                        onChange={SetRaceModelId}
                        options={AllFetchData}
                        isClearable={false}
                        isSearchable={true}
                      />
                    </span>

                    <span>
                    <input type='number'  value={i[1]}  placeholder="Points"  className="resultforminput"/>
                    </span>
                    <span>
                    <input type='number'  value={i[2]} placeholder="BonusPoints"  className="resultforminput"/>
                    </span>
    
                    
                  </div>
                  
                </div>
                    );
                  })}
                  <div className="addbtn">
                    <button className="AddAnother" onClick={addItem}>
                      Save & Add Another
                    </button>
                    <button className="updateButton" onClick={Remove}>
                      Remove
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
                  <div className="myselectiondata">
                    <span onChange={setRank} value={1}>
                      1
                    </span>
                    <span>
                      <Select
                        className="dropdown multidropdown"
                        defaultValue={RaceModelIdTri}
                        onChange={SetRaceModelIdTri}
                        options={AllFetchData}
                        isClearable={false}
                        isSearchable={true}
                      />
                    </span>

                    <span>
                      <input
                        type="number"
                        value={PointsTri}
                        onChange={(e) => SetPointsTri(e.target.value)}
                        placeholder="Points"
                        className="resultforminput"
                      />
                    </span>
                    <span>
                      <input
                        type="number"
                        value={BonusPointsTri}
                        onChange={(e) => SetBonusPointsTri(e.target.value)}
                        placeholder="BonusPoints"
                        className="resultforminput"
                      />
                    </span>
                  </div>
                  {itemsTri.map((item, index) => {
                    return (
                      <span key={index}>
                        <div className="myselectiondata">
                          <span onChange={setRank} value={1}>
                            1
                          </span>
                          <span>
                            <Select
                              className="dropdown multidropdown"
                              defaultValue={RaceModelIdTri}
                              onChange={SetRaceModelIdTri}
                              options={AllFetchData}
                              isClearable={false}
                              isSearchable={true}
                            />
                          </span>

                          <span>
                            <input
                              type="number"
                              value={PointsTri}
                              onChange={(e) => SetPointsTri(e.target.value)}
                              placeholder="Points"
                              className="resultforminput"
                            />
                          </span>
                          <span>
                            <input
                              type="number"
                              value={BonusPointsTri}
                              onChange={(e) => SetBonusPointsTri(e.target.value)}
                              placeholder="BonusPoints"
                              className="resultforminput"
                            />
                          </span>
                        </div>
                      </span>
                    );
                  })}
                  <div className="addbtn">
                    <button className="AddAnother" onClick={addItemTri}>
                      Save & Add Another
                    </button>
                    <button className="updateButton" onClick={RemoveTri}>
                      Remove
                    </button>
                  </div>
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
