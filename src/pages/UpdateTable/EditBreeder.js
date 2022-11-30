import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const NewsForm = () => {
  const history = useNavigate();
  const { state } = useLocation();

  const { breederid } = state;
  console.log(breederid);

  const [image,setImage] = useState();

  const [state1, setState] = useState({
		NameEn: '',
    NameAr:'',
		shortCode: '',
    DescriptionEn: '',
    DescriptionAr:'',
    image:image
    
	});

  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };
  


  useEffect(() => {
		if (breederid) {
			setState({
				NameEn: breederid.NameEn,
        NameAr: breederid.NameAr,
				DescriptionEn: breederid.DescriptionEn,
        DescriptionAr: breederid.DescriptionAr,
        shortCode: breederid.shortCode,
        image:image

			});
		} else {
		}
	}, [breederid]);


  const submit = async (event) => {
    event.preventDefault();
    try {
      
      const formData = new FormData();
      formData.append("image",image);
      formData.append("NameEn", state1.NameEn);
      formData.append("NameAr", state1.NameAr);
      formData.append("shortCode", state1.shortCode);
      formData.append("DescriptionEn", state1.DescriptionEn);
      formData.append("DescriptionAr", state1.DescriptionAr);

      const response = await axios.put(`${window.env.API_URL}/updateBreeder/${breederid._id}`, formData);
      history("/breederlist");
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
            <div className="Headers">Edit Breeder</div>
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
										placeholder='Description English'
										value={state1.DescriptionEn}
										onChange={(e) =>
											setState({ ...state1, DescriptionEn: e.target.value })
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
										value={state1.DescriptionAr}
										onChange={(e) =>
											setState({ ...state1, DescriptionAr: e.target.value })
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
										placeholder='Short Code'
										value={state1.shortCode}
										onChange={(e) =>
											setState({ ...state1, shortCode: e.target.value })
										}
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
