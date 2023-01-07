import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchrace } from "../../../redux/getReducer/getRaceSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchcompetition } from "../../../redux/getReducer/getCompetition";
import { toast } from "react-toastify";



  const Nationality = () => {
  const { data: race } = useSelector((state) => state.race);

  const { state } = useLocation();
  const { CompetitionId  } = state;

  const [SearchCode, setSearchCode] = useState('');
  const [SearchTitle, setSearchTitle] = useState('');
  const [Value, setValue] = useState(false);
  const [checked, setChecked] = useState([]);
  const [isLoading, setisLoading] = useState(false);
 
  const dispatch = useDispatch();
  const history = useNavigate();

 

  useEffect(() => {
    dispatch(fetchrace({SearchTitle,SearchCode}));
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

  const Publish = async (event) => {
    event.preventDefault();
    setisLoading(true)
    try {
      const response = await axios.post(
        `${window.env.API_URL}/addraceincompetition/${CompetitionId._id}`,
        { CastRaces: CastCountValue, PickRaces: TriCountValue }
      );

      const msgdata = response.data.msg;
      setisLoading(false)

      history("/competitionlisting");
      swal({
        title: "Success!",
        text: msgdata,
        icon: "success",
        button: "OK",
      });
      setisLoading(false)
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



 
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      if(checked.length == CompetitionId.CategoryCount){
        return toast('limit exceed');
         
      }
      updatedList = [...checked, event.target.value];
      
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };


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
                  <div className="myselectiondata" id={index}>
              <span>
              <label class="checkbox-label">
                  <input type="checkbox" id={index} onChange={handleCheck}
                   name="selectrace" 
                  
                  value={item._id}/>
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
              <button Name="submit" className="SubmitButton" onClick={Publish} disabled={isLoading}>
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
