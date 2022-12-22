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
import { toast } from "react-toastify";

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

  const { state } = useLocation();
  // const { competitionId } = state;


 
  
  // const history = useNavigate();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [selectedValue, setSelectedValue] = useState([]);

  console.log(selectedValue,'sadasdsadsadsad')

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
  }, [items, itemsTri]);

  
  // const id = competitionId._id;

  
  // const Publish = async (event) => {
  //   event.preventDefault();
  //   try {
  //     console.log(
  //       { CastRaces: items },
  //       { PickRaces: itemsTri },
  //       "selectedValue"
  //     );
  //     const response = await axios.post(
  //       `${window.env.API_URL}/addraceincompetition/${id}`,
  //       { CastRaces: items, PickRaces: itemsTri }
  //     );
  //     localStorage.removeItem("competition");
  //     localStorage.removeItem("competitiontri");

  //     const msgdata = response.data.msg;
  //     history("/competitionlisting");
  //     swal({
  //       title: "Success!",
  //       text: msgdata,
  //       icon: "success",
  //       button: "OK",
  //     });
  //   } catch (error) {
  //     const err = error.response.data.message;
  //     swal({
  //       title: "Error!",
  //       text: err,
  //       icon: "error",
  //       button: "OK",
  //     });
  //   }
  // };

  const saved1 = 1;
  const [checked, setChecked] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  // useEffect(() => {
  //   if(checked.length === saved1){
  //     setIsDisabled(true)
  //   }
  // })

 
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  console.log(checked,'checked')

  return (
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Select Races for Competition</div>
          <div className="myselecthorse">
            <div className="myselectioncompetition">
              <span>Selection</span>
              <span>Race Name</span>
            </div>
          </div>
          <div className="form">
            {
              race.map((item,index) => {
                return(
                  <div className="myselectiondata">
              <span onChange={setRank} value={1}>
              <label class="checkbox-label">
                  <input type="checkbox" id={item._id} onChange={handleCheck}
                   name="selectrace" disabled={isDisabled}  value={item._id}/>
                  <span class="checkbox-custom rectangular"></span>
              </label>
              {/* <input type="checkbox" id="selectrace" onChange={(e) => setSelectedValue(e.target.value)} name="selectrace" value={item._id}/> */}
              </span>
              <span>
               <p className="competitionrace1">
               {
                  item.RaceNameModelData === null ? <>N/A</> : item.RaceNameModelData.NameEn
                }
               </p>
              </span>
            </div>
                )
              })
            }
            

            <div className="ButtonSection " style={{ justifyContent: "end" }}>
              <button Name="submit" className="SubmitButton" >
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
