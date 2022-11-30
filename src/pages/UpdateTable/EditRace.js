import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchSinglejockey } from "../../redux/getReducer/getSingleJockey";
import swal from "sweetalert";
import axios from "axios";

const NewsForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { state } = useLocation();

  const { jockeyid } = state;
  const { data: singlejockey } = useSelector((state) => state.singlejockey);
  
  const [state1, setState] = useState({
		NameEn: '',
    NameAr:'',
		MaximumJockeyWeight: '',
    MiniumumJockeyWeight: ''
    
	});
  const [image,setImage] = useState();

  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(singlejockey.image, image);
  };
  
  useEffect(() => {
    dispatch(fetchSinglejockey({ jockeyid }));
  }, []);


  useEffect(() => {
		if (singlejockey) {
			setState({
				NameEn: singlejockey.NameEn,
        NameAr: singlejockey.NameAr,
				MaximumJockeyWeight: singlejockey.MaximumJockeyWeight,
        MiniumumJockeyWeight: singlejockey.MiniumumJockeyWeight
			});
		} else {
			dispatch(fetchSinglejockey({ jockeyid }));
		}
	}, [singlejockey]);


  const submit = async (event) => {
    event.preventDefault();
    try {
      
      const formData = new FormData();
      formData.append("image", image);
      formData.append("NameEn", state1.NameEn);
      formData.append("NameAr", state1.NameAr);
      formData.append("MaximumJockeyWeight", state1.MaximumJockeyWeight);
      formData.append("MiniumumJockeyWeight", state1.MiniumumJockeyWeight);

      const response = await axios.put(`${window.env.API_URL}/updateJockey/${jockeyid}`, formData);
      history("/jockey");
      swal({
        title: "Success!",
        text: "Data has been Updated successfully ",
        icon: "success",
        button: "OK",
      });
    } catch (error) {
      alert(error.message);
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
										type='number'
										name='MiniumumJockeyWeight'
										id='MiniumumJockeyWeight'
										className='group__control'
										placeholder=''
										value={state1.MiniumumJockeyWeight}
										onChange={(e) =>
											setState({ ...state1, MiniumumJockeyWeight: e.target.value })
										}
									/>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      type="number"
                      placeholder="اسم المسار"
                    ></input>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                  <input
										type='number'
										name='MaximumJockeyWeight'
										id='MaximumJockeyWeight'
										className='group__control'
										placeholder='Post title'
										value={state1.MaximumJockeyWeight}
										onChange={(e) =>
											setState({ ...state1, MaximumJockeyWeight: e.target.value })
										}
									/>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      type="number"
                      placeholder="اسم المسار"
                    ></input>
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
