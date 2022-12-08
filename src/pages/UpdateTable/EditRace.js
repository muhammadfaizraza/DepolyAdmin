import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import DateTimePicker from "react-datetime-picker";
import Select from "react-select";
import { fetchracecourse } from "../../redux/getReducer/getRaceCourseSlice";
import { useSelector , useDispatch } from "react-redux";

const RaceStatuss = [
  { id: "1", value: "Cancel", label: "Cancel" },
  { id: "2", value: "Due", label: "Due" },
  { id: "2", value: "Live", label: "Live" },
  { id: "2", value: "End", label: "End" },
];

const NewsForm = () => {
  const history = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { data: racecourse } = useSelector((state) => state.racecourse);

  const { fullraceid } = state;
  const [DayNTime, setDayNTime] = useState("");
  const [RaceStatus, setRaceStatus] = useState("");
  const [RaceCourse, setRaceCourse] = useState("");
  console.log(fullraceid)

  let racecourses =
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


  const [state1, setState] = useState({
		MeetingCode: '',
    DescriptionEn:'',
		DescriptionAr: '',
    WeatherDegree: '',
    RaceStatus:'',
    FirstPrice:'',
    SecondPrice:'',
    ThirdPrice:'',
    FourthPrice:'',
    FifthPrice:'',
    SixthPrice:'',
    DayNTime:'',
    RaceCourse:''
    
	});
  const [image,setImage] = useState();
  const [preview,setPreview] = useState();

  
  

  useEffect(() => {
		if (fullraceid) {
			setState({
				MeetingCode: fullraceid.MeetingCode,
        DescriptionEn: fullraceid.DescriptionEn,
				DescriptionAr: fullraceid.DescriptionAr,
        WeatherDegree: fullraceid.WeatherDegree,
        FirstPrice: fullraceid.FirstPrice,
        SecondPrice: fullraceid.SecondPrice,
        ThirdPrice: fullraceid.ThirdPrice,
        FourthPrice: fullraceid.FourthPrice,
        FifthPrice: fullraceid.FifthPrice,
        SixthPrice: fullraceid.SixthPrice,
        RaceStatus: fullraceid.RaceStatus,
        RaceStatus:fullraceid.RaceStatus,
        DayNTime:fullraceid.DayNTime,
        RaceCourse:fullraceid.RaceCourse,
        image:fullraceid.image
			});

		} else {
		}
	}, [fullraceid]);
  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image, image);
  };
  useEffect(() => {
    dispatch(fetchracecourse());
    if (image === undefined) {
      setPreview(fullraceid.image)
      return
  }  
    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
}, [image])

  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image",  (image ===  undefined ? state1.image : image));
      formData.append("MeetingCode", state1.MeetingCode);
      formData.append("DescriptionEn", state1.DescriptionEn);
      formData.append("DescriptionAr", state1.DescriptionAr + ' ');
      formData.append("WeatherDegree", state1.WeatherDegree);
      formData.append("FirstPrice", state1.FirstPrice);
      formData.append("RaceStatus", (RaceStatus.value ===  undefined ? state1.RaceStatus : RaceStatus.value));
      formData.append("RaceCourse", RaceCourse.id === undefined ? state1.RaceCourse : RaceCourse.id);
      formData.append("SecondPrice", state1.SecondPrice);
      formData.append("ThirdPrice", state1.ThirdPrice);
      formData.append("FourthPrice", state1.FourthPrice);
      formData.append("FifthPrice", state1.FifthPrice);
      formData.append("SixthPrice", state1.SixthPrice);
      formData.append("DayNTime", (DayNTime ===  '' ? state1.DayNTime : DayNTime));

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
                      label="رمز الاجتماع"
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
                      label="وصف"
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
                      label="درجة الطقس"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, WeatherDegree: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="درجة الطقس"   value={state1.WeatherDegree}/>
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
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Race Status</div>}
                      defaultValue={RaceStatus}
                      onChange={setRaceStatus}
                      options={RaceStatuss}
                      isClearable={true}
                      isSearchable={true}
                    />{" "}
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>حالة السباق</div>}
                      className="selectdir"
                      options={RaceStatuss}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Race Course</div>}
                      defaultValue={RaceCourse}
                      onChange={setRaceCourse}
                      options={racecourses}
                      isClearable={true}
                      isSearchable={true}
                    />
                   <span className="spanForm">|</span>
                  </div>

                  <div className="col-sm">
                    <Select
                      placeholder={<div>دورة السباق</div>}
                      className="selectdir"
                      options={racecourses}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="First Prize"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, FirstPrice: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number" placeholder="Weather Degree"   value={state1.FirstPrice}/>
                    </FloatingLabel>

                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="السعر الأول"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, FirstPrice: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="ملاحظات"   value={state1.FirstPrice}/>
                    </FloatingLabel>
                  </div> */}
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Second Prize"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, SecondPrice: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number" placeholder="Weather Degree"   value={state1.SecondPrice}/>
                    </FloatingLabel>

                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="الجائزة الثانية"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, SecondPrice: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="ملاحظات"   value={state1.SecondPrice}/>
                    </FloatingLabel>
                  </div> */}
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Third Prize"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, ThirdPrice: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number" placeholder="Weather Degree"   value={state1.ThirdPrice}/>
                    </FloatingLabel>

                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="الجائزة الثالثة"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, ThirdPrice: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="ملاحظات"   value={state1.ThirdPrice}/>
                    </FloatingLabel>
                  </div> */}
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Fourth Prize"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, FourthPrice: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number" placeholder="Weather Degree"   value={state1.FourthPrice}/>
                    </FloatingLabel>

                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="الجائزة الرابعة"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, FourthPrice: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="ملاحظات"   value={state1.FourthPrice}/>
                    </FloatingLabel>
                  </div> */}
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Fifth Prize"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, FifthPrice: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number" placeholder="Prize"   value={state1.FifthPrice}/>
                    </FloatingLabel>

                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="الجائزة الخامسة"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, FifthPrice: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="الجائزة الخامسة"   value={state1.FifthPrice}/>
                    </FloatingLabel>
                  </div> */}
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Sixth Prize"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, SixthPrice: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number" placeholder="Weather Degree"   value={state1.SixthPrice}/>
                    </FloatingLabel>

                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="الجائزة السادسة"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, SixthPrice: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="ملاحظات"   value={state1.SixthPrice}/>
                    </FloatingLabel>
                  </div> */}
                </div>
                <div className="ButtonSection">
                <div>
                <input type='file' onChange={fileSelected} className="formInput"/>
                <img src={preview}  className="PreviewImage" alt=""/>

                </div>
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
