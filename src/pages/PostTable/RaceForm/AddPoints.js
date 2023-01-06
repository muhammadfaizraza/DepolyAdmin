import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchpointTable } from "../../../redux/getReducer/getPointTable";


  const Nationality = () => {
  const { data: pointTable, status } = useSelector((state) => state.pointTable);

  const { state } = useLocation();
  const { RaceId } = state;


  const [checked, setChecked] = useState([]);
  const [isLoading, setisLoading] = useState(false);

 
  const dispatch = useDispatch();
  const history = useNavigate();

 

  useEffect(() => {
    dispatch(fetchpointTable());
  }, [dispatch]);
  

  const Publish = async (event) => {
    event.preventDefault();
    setisLoading(true)
    try {
      const response = await axios.post(
        `${window.env.API_URL}/AddPointTable/${RaceId}`,
        { Points: checked }
      );
      setisLoading(true)
      const msgdata = response.data.msg;
      history("/fullpublishrace", {
        state: {
          RaceId: RaceId
        },
      });
      swal({
        title: "Success!",
        text: msgdata,
        icon: "success",
        button: "OK",
      });
      setisLoading(false)
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



 
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      
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
          <div className="Headers">Select Point for Race</div>
          <div className="myselecthorse">
            <div className="myselectioncompetition">
              <span>Selection</span>
              <span>Race Name</span>
            </div>
          </div>
          <div className="form">
            {
              pointTable.map((item,index) => {
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
                  item.Group_Name === null ? <>N/A</> : item.Group_Name
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
