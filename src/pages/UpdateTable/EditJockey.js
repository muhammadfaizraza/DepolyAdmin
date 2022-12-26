import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchSinglejockey } from "../../redux/getReducer/getSingleJockey";
import swal from "sweetalert";
import axios from "axios";
import DatePicker from "react-date-picker";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
const NewsForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { state } = useLocation();

  const { jockeyid } = state;

  console.log(jockeyid)
  const [state1, setState] = useState({
		NameEn: '',
    NameAr:'',
    ShortNameEn:"",
    ShortNameAr:"",
    DOB:"",
    RemarksEn:"",
    JockeyAllowance:"",
		MaximumJockeyWeight: '',
    MiniumumJockeyWeight: '',
    image:'',
    RemarksAr:"",
    Rating:"",
    JockeyLicenseDate:"",
	});
  const [image,setImage] = useState();
  const [preview,setPreview] = useState();

  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image, image);
  };
  
  useEffect(() => {
    dispatch(fetchSinglejockey());
  }, []);


  useEffect(() => {
		if (jockeyid) {
			setState({
				NameEn: jockeyid.NameEn,
        NameAr: jockeyid.NameAr,
        ShortNameEn:jockeyid.ShortNameEn,
        ShortNameAr:jockeyid.ShortNameAr,
        RemarksEn:jockeyid.RemarksEn,
        RemarksAr:jockeyid.RemarksAr,
				MaximumJockeyWeight: jockeyid.MaximumJockeyWeight,
        MiniumumJockeyWeight: jockeyid.MiniumumJockeyWeight,
        Rating:jockeyid.Rating,
				JockeyLicenseDate: jockeyid.JockeyLicenseDate,
        DOB:jockeyid.DOB
  
			});
		} else {
			dispatch(fetchSinglejockey({ jockeyid }));
		}
	}, [jockeyid]);

  useEffect(() => {
    if (image === undefined) {
      setPreview(jockeyid.image)
      return
  }  
    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
}, [image])

console.log(preview,'preview')
  const submit = async (event) => {
    event.preventDefault();
    try {
      
      const formData = new FormData();
      formData.append("image", image);
      formData.append("NameEn", state1.NameEn);
      formData.append("NameAr", state1.NameAr + ' ');
      formData.append("ShortNameEn", state1.ShortNameEn);
      formData.append("ShortNameAr", state1.ShortNameAr);
      formData.append("RemarksEn", state1.RemarksEn);
      formData.append("RemarksAr", state1.RemarksAr);
      formData.append("MaximumJockeyWeight", state1.MaximumJockeyWeight);
      formData.append("MiniumumJockeyWeight", state1.MiniumumJockeyWeight);
      formData.append("Rating", state1.Rating);
      formData.append("JockeyLicenseDate", state1.JockeyLicenseDate);
      formData.append("DOB", state1.DOB);
     

      const response = await axios.put(`${window.env.API_URL}/updateJockey/${jockeyid._id}`, formData);
      history("/jockey");
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
  return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Edit Jockey</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Name"
                      className="mb-3 "
                      onChange={(e) =>
                        setState({ ...state1, NameEn: e.target.value })
                      }
                     
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.NameEn}/>
                    </FloatingLabel>
                  
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="اسم"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, NameAr: e.target.value })
                      }
                     
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.NameAr}/>
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Short Name"
                      className="mb-3 "
                      onChange={(e) =>
                        setState({ ...state1, ShortNameEn: e.target.value })
                      }
                     
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.ShortNameEn}/>
                    </FloatingLabel>
                  
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="اسم قصير"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, ShortNameAr: e.target.value })
                      }
                     
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.ShortNameAr}/>
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Remarks"
                      className="mb-3 "
                      onChange={(e) =>
                        setState({ ...state1, RemarksEn: e.target.value })
                      }
                     
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.RemarksEn}/>
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
                        setState({ ...state1, RemarksAr: e.target.value })
                      }
                     
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.RemarksAr}/>
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Rating"
                      className="mb-3 "
                      onChange={(e) =>
                        setState({ ...state1, Rating: e.target.value })
                      }
                     
                    >
                      <Form.Control type="number" placeholder="Description" value={state1.Rating}/>
                    </FloatingLabel>
                  
                  
                  </div>
                  </div>
                  <div className="row mainrow">
                  <div className="col-sm">
                    <DatePicker
                       onChange={(e) =>
                        setState({ ...state1, JockeyLicenseDate: e.target.value })
                      }
                      defaultValue={state1.JockeyLicenseDate}
                      value={state1.JockeyLicenseDate}
                      dayPlaceholder="  "
                    
                      monthPlaceholder="License Date"
                      yearPlaceholder=""
                      
                    />

                 
                  
                  </div>

                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <DatePicker
                       onChange={(e) =>
                        setState({ ...state1, DOB: e.target.value })
                      }
                      defaultValue={state1.DOB}
                      value={state1.DOB}
                      dayPlaceholder="  "
                    
                      monthPlaceholder="License Date"
                      yearPlaceholder=""
                      
                    />

                 
                  
                  </div>

                </div>
                
                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Miniumum Jockey Weight"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, MiniumumJockeyWeight: e.target.value })
                      }
                     
                    >
                      <Form.Control type="number" placeholder="Description" value={state1.MiniumumJockeyWeight}/>
                    </FloatingLabel>
                 
                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="الحد الأدنى من وزن الجوكي"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, MiniumumJockeyWeight: e.target.value })
                      }
                     
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.MiniumumJockeyWeight}/>
                    </FloatingLabel>
                  </div> */}
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Maximum Jockey Weight"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, MaximumJockeyWeight: e.target.value })
                      }
                     
                    >
                      <Form.Control type="number" placeholder="Description" value={state1.MaximumJockeyWeight}/>
                    </FloatingLabel>
                  
                    {/* <span className="spanForm"> |</span> */}
                  </div>

                  {/* <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="أقصى وزن للجوكي"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, MaximumJockeyWeight: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="Description" value={state1.MaximumJockeyWeight}/>
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
