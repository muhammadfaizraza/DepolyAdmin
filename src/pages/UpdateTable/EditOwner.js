import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const NewsForm = () => {
  const history = useNavigate();
  const { state } = useLocation();

  const { ownerid } = state;
  console.log(ownerid);
  const [image,setImage] = useState();

  const [state1, setState] = useState({
		NameAr: '',
    NameEn:'',
    TitleEn: '',
    TitleAr:'',
    ShortEn: '',
    ShortAr:'',
    image:image
	});
 

  useEffect(() => {
		if (ownerid) {
			setState({
				NameEn: ownerid.NameEn,
        NameAr: ownerid.NameAr,
				TitleEn:ownerid.TitleEn,
        TitleAr:ownerid.TitleAr,
        ShortEn: ownerid.ShortEn,
        ShortAr: ownerid.ShortAr,
        image: ownerid.image
   
			});
		} else {
			alert('No Data')
		}
	}, [ownerid]);

  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };
  const submit = async (event) => {
    event.preventDefault();
    try {
      
      const formData = new FormData();
      formData.append("NameEn", state1.NameEn);
      formData.append("NameAr", state1.NameAr);
      formData.append("TitleEn", state1.TitleEn);
      formData.append("TitleAr", state1.TitleAr);
      formData.append("ShortEn", state1.ShortEn);
      formData.append("ShortAr", state1.ShortAr);
      formData.append("Ownerimage", image);

      const response = await axios.put(`${window.env.API_URL}/updateOwner/${ownerid._id}`, formData);
      history("/owner");
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
            <div className="Headers">Edit Owner</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                  <input
										type='text'
										name='TitleEn'
										id='TitleEn'
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
										name='TitleAr'
										id='TitleAr'
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
										name='TitleEn'
										id='TitleEn'
										className='group__control'
										placeholder='Description'
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
										name='TitleAr'
										id='TitleAr'
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
										name='TitleEn'
										id='TitleEn'
										className='group__control'
										placeholder='Second Title'
										value={state1.ShortEn}
										onChange={(e) =>
											setState({ ...state1, ShortEn: e.target.value })
										}
									/>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="اسم "
                      type='text'
										name='TitleAr'
										id='TitleAr'
										className='group__control'
										value={state1.ShortAr}
										onChange={(e) =>
											setState({ ...state1, ShortAr: e.target.value })
										}
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
