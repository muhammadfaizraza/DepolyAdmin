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



  const Nationality = () => {
  const { data: race } = useSelector((state) => state.race);

  const { state } = useLocation();
  const { CompetitionId  } = state;


  const [checked, setChecked] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  console.log(state,'state')
 
  const dispatch = useDispatch();
  const history = useNavigate();
  console.log(CompetitionId,'CompetitionId')

 

  useEffect(() => {
    dispatch(fetchrace());
    dispatch(fetchcompetition());
  }, [dispatch]);
 

  const [TriCountValue, setTriCountValue] = useState([])
  const [CastCountValue, setCastCountValue] = useState([])

  useEffect(() => {
    if(CompetitionId.CompetitionCategory === 'pick'){
      setTriCountValue(checked)
    }
    else{
      setCastCountValue(checked)
    }
  });

  console.log(TriCountValue,'TriCountValue');

  const Publish = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${window.env.API_URL}/addraceincompetition/${CompetitionId._id}`,
        { CastRaces: CastCountValue, PickRaces: TriCountValue }
      );

      const msgdata = response.data.msg;
      console.log(response,'response')
      history("/competitionlisting");
      swal({
        title: "Success!",
        text: msgdata,
        icon: "success",
        button: "OK",
      });
    } catch (error) {
      console.log(error,'response')
      const err = error.response.data.message;
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
    }
  };


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
              <span>
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
