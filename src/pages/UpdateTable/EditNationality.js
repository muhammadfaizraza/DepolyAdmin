import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const NewsForm = () => {
  const history = useNavigate();
  const { state } = useLocation();

  const { nationalityid } = state;
  console.log(nationalityid)
  const [image,setImage] = useState();

  const [state1, setState] = useState({
		NameEn: '',
    NameAr:'',
    shortCode: '',
		AltName: '',
    Abbrev: '',
    Label:'',
    Offset:'',
    Value:'',
    image:image
    
	});

  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image, image);
  };


  useEffect(() => {
		if (nationalityid) {
			setState({
				NameEn: nationalityid.NameEn,
        NameAr: nationalityid.NameAr,
        shortCode: nationalityid.shortCode,
        AltName: nationalityid.AltName,
        Abbrev: nationalityid.Abbrev,
        Label:nationalityid.Label,
        Offset:nationalityid.Offset,
        Value:nationalityid.Value,
				image:nationalityid.image
			});
		} else {
		}
	}, [nationalityid]);


  const submit = async (event) => {
    event.preventDefault();
    try {
      
      const formData = new FormData();
      formData.append("image", image);
      formData.append("NameEn", state1.NameEn);
      formData.append("NameAr", state1.NameAr);
      formData.append("shortCode", state1.shortCode);
      formData.append("AltName", state1.AltName);
      formData.append("Abbrev", state1.Abbrev);
      formData.append("Label", state1.Label);
      formData.append("Offset", state1.Offset);
      formData.append("Value", state1.Value);
      const response = await axios.put(`${window.env.API_URL}/updateNationality/${nationalityid._id}`, formData);
      history("/nationalitylist");
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
            <div className="Headers">Edit Nationality</div>
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
										placeholder='Short Code'
										value={state1.shortCode}
										onChange={(e) =>
											setState({ ...state1, shortCode: e.target.value })
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
										value={state1.shortCode}
										onChange={(e) =>
											setState({ ...state1, shortCode: e.target.value })
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
										placeholder='Alt Name '
										value={state1.AltName}
										onChange={(e) =>
											setState({ ...state1, AltName: e.target.value })
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
										name='MaximumJockeyWeight'
										id='MaximumJockeyWeight'
										className='group__control'
										placeholder='Abbrev'
										value={state1.Abbrev}
										onChange={(e) =>
											setState({ ...state1, Abbrev: e.target.value })
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
										type='text'
										name='Label'
										id='Label'
										className='group__control'
										placeholder='Label'
										value={state1.Label}
										onChange={(e) =>
											setState({ ...state1, Label: e.target.value })
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
										name='Offset'
										id='Offset'
										className='group__control'
										placeholder='Offset'
										value={state1.Offset}
										onChange={(e) =>
											setState({ ...state1, Offset: e.target.value })
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
										type='text'
										name='Value'
										id='Value'
										className='group__control'
										placeholder='Value'
										value={state1.Value}
										onChange={(e) =>
											setState({ ...state1, Value: e.target.value })
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
