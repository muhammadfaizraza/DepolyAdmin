import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import DatePicker from "react-date-picker";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
const NewsForm = () => {
  const history = useNavigate();
  const { state } = useLocation();
  var today = new Date();

  const { trainerid } = state;
  console.log(trainerid,'id')

  const [state1, setState] = useState({
		NameEn: '',
    NameAr:'',
		TitleEn:'',
    TitleAr:'',
    ShortNameEn:'',
    ShortNameAr:'',
    Remarks:'',
    TrainerLicenseDate:'',
    Detail:''
	});
  const [image,setImage] = useState();
  const [TrainerLicenseDate,setTrainerLicenseDate] = useState();


  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };
  


  useEffect(() => {
		if (trainerid) {
			setState({
				NameEn: trainerid.NameEn,
        NameAr: trainerid.NameAr,
				TitleEn: trainerid.TitleEn,
        TitleAr: trainerid.TitleAr,
        ShortNameEn: trainerid.ShortNameEn,
        ShortNameAr: trainerid.ShortNameAr,
        Remarks: trainerid.Remarks,
        Detail: trainerid.Detail,
        
			});
		} else {
		}
	}, [trainerid]);


  const submit = async (event) => {
    event.preventDefault();
    try {
      
      const formData = new FormData();
      formData.append("image", image);
      formData.append("NameEn", state1.NameEn);
      formData.append("NameAr", state1.NameAr);
      formData.append("TitleEn", state1.TitleEn);
      formData.append("TitleAr", state1.TitleAr);
      formData.append("ShortNameEn", state1.ShortNameEn);
      formData.append("ShortNameAr", state1.ShortNameAr);
      formData.append("Detail", state1.Detail);
      formData.append("TrainerLicenseDate", TrainerLicenseDate);


      const response = await axios.put(`${window.env.API_URL}/updatetrainer/${trainerid._id}`, formData);
      history("/trainer");
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
            <div className="Headers">Edit Trainer</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                  <input
										type='text'
										name='NameEn'
										id='NameEn'
										className='group__control'
										placeholder='Name'
										value={state1.NameEn}
										onChange={(e) =>
											setState({ ...state1, NameEn: e.target.value })
										}
									/>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="اسم "
                      type='text'
										name='NameAr'
										id='NameAr'
										className='group__control'
										value={state1.NameAr}
										onChange={(e) =>
											setState({ ...state1, NameAr: e.target.value })
										}
                    ></input>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                  <input
										type='text'
										name='NameEn'
										id='NameEn'
										className='group__control'
										placeholder='Remarks'
										value={state1.Remarks}
										onChange={(e) =>
											setState({ ...state1, Remarks: e.target.value })
										}
									/>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="اسم "
                      type='text'
										name='NameAr'
										id='NameAr'
										className='group__control'
										value={state1.NameAr}
										onChange={(e) =>
											setState({ ...state1, NameAr: e.target.value })
										}
                    ></input>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                  <input
										type='text'
										name='NameEn'
										id='NameEn'
										className='group__control'
										placeholder='Detail'
										value={state1.Detail}
										onChange={(e) =>
											setState({ ...state1, Detail: e.target.value })
										}
									/>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="اسم "
                      type='text'
										name='NameAr'
										id='NameAr'
										className='group__control'
										value={state1.Detail}
										onChange={(e) =>
											setState({ ...state1, Detail: e.target.value })
										}
                    ></input>
                  </div>
                </div>
                
                <div className="row mainrow">
                  <div className="col-sm">
                  <input
										type='text'
										name='NameEn'
										id='NameEn'
										className='group__control'
										placeholder='Title English'
										value={state1.TitleEn}
										onChange={(e) =>
											setState({ ...state1, TitleEn: e.target.value })
										}
									/>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="اسم "
                      type='text'
										name='NameAr'
										id='NameAr'
										className='group__control'
										value={state1.TitleAr}
										onChange={(e) =>
											setState({ ...state1, TitleAr: e.target.value })
										}
                    ></input>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                  <input
										type='text'
										name='NameEn'
										id='NameEn'
										className='group__control'
										placeholder='Remarks'
										value={state1.Remarks}
										onChange={(e) =>
											setState({ ...state1, Remarks: e.target.value })
										}
									/>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="اسم "
                      type='text'
										name='NameAr'
										id='NameAr'
										className='group__control'
										value={state1.NameAr}
										onChange={(e) =>
											setState({ ...state1, NameAr: e.target.value })
										}
                    ></input>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                  <input
										type='text'
										name='NameEn'
										id='NameEn'
										className='group__control'
										placeholder='Short Name'
										value={state1.ShortNameEn}
										onChange={(e) =>
											setState({ ...state1, ShortNameEn: e.target.value })
										}
									/>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="اسم "
                      type='text'
										name='NameAr'
										id='NameAr'
										className='group__control'
										value={state1.ShortNameAr}
										onChange={(e) =>
											setState({ ...state1, ShortNameAr: e.target.value })
										}
                    ></input>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <DatePicker
                      onChange={setTrainerLicenseDate}
                      value={TrainerLicenseDate}
                      dayPlaceholder="  "
                      maxDate={today}
                      monthPlaceholder="License Date"
                      yearPlaceholder=""
                    />

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm" style={{ direction: "rtl" }}>
                    <input
                      
                      placeholder="تاريخ الولادة"
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
