import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import DateTimePicker from "react-datetime-picker";

const NewsForm = () => {
  const history = useNavigate();
  const { state } = useLocation();

  const { fullraceid } = state;
  console.log( fullraceid)
  const [DayNTime, setDayNTime] = useState("");

  const [state1, setState] = useState({
		MeetingCode: '',
    DescriptionEn:'',
		DescriptionAr: '',
    WeatherDegree: '',
    
	});
  const [image,setImage] = useState();

  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image, image);
  };
  

  useEffect(() => {
		if (fullraceid) {
			setState({
				MeetingCode: fullraceid.MeetingCode,
        DescriptionEn: fullraceid.DescriptionEn,
				DescriptionAr: fullraceid.DescriptionAr,
        WeatherDegree: fullraceid.WeatherDegree,
			});
		} else {
		}
	}, [fullraceid]);


  const submit = async (event) => {
    event.preventDefault();
    try {
      
      const formData = new FormData();
      formData.append("image", image);
      formData.append("MeetingCode", state1.MeetingCode);
      formData.append("DescriptionEn", state1.DescriptionEn);
      formData.append("DescriptionAr", state1.DescriptionAr);
      formData.append("WeatherDegree", state1.WeatherDegree);
      formData.append("DayNTime", DayNTime);

      const response = await axios.put(`${window.env.API_URL}/updaterace/${fullraceid._id}`, formData);
      history("/races");
      swal({
        title: "Success!",
        text: "Data has been Updated successfully ",
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

  var today = new Date();
  return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Edit Race</div>
            <div className="form">
              <form onSubmit={submit}>
              <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Meeting Code"
                      className="mb-3"
                      
                      onChange={(e) =>
                        setState({ ...state1, MeetingCode: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text" placeholder="Details"  value={state1.MeetingCode}/>
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="ملاحظات"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, MeetingCode: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="ملاحظات"   value={state1.MeetingCode}/>
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Description"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, DescriptionEn: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text" placeholder="Details"   value={state1.DescriptionEn}/>
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="ملاحظات"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, DescriptionAr: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="ملاحظات"   value={state1.DescriptionAr}/>
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Weather Degree"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, WeatherDegree: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number" placeholder="Weather Degree"   value={state1.WeatherDegree}/>
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="ملاحظات"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, WeatherDegree: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="ملاحظات"   value={state1.WeatherDegree}/>
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <DateTimePicker
                      onChange={setDayNTime}
                      value={DayNTime}
                      monthPlaceholder="Date "
                      dayPlaceholder="&"
                      minDate={today}
                      maxDate={new Date("02-29-2023")}
                      yearPlaceholder="Time"
                    />
                    <span className="spanForm"> |</span>
                  </div>
                  <div className="col-sm"  style={{ direction: "rtl" }}>
                    <DateTimePicker
                      onChange={setDayNTime}
                      value={DayNTime}
                      monthPlaceholder="Date "
                      dayPlaceholder="&"
                      minDate={today}
                      maxDate={new Date("02-29-2023")}
                      yearPlaceholder="Time"
                     
                    />
                  </div>
                </div>
                
                <div className="ButtonSection">
                  <input type="file" size="60" onChange={fileSelected} />
                  <button type="submit" className="SubmitButton">
                  Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsForm;
