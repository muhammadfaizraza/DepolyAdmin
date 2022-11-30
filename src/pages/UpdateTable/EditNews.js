import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const NewsForm = () => {
  const history = useNavigate();
  const { state } = useLocation();

  const { newsid } = state;
  console.log(newsid);
  const [image,setImage] = useState();

  const [state1, setState] = useState({
		TitleEn: '',
    TitleAr:'',
    DescriptionEn: '',
    DescriptionAr:'',
    SecondTitleEn: '',
    SecondTitleAr:'',
    image:image
	});
 

  useEffect(() => {
		if (newsid) {
			setState({
				TitleEn: newsid.TitleEn,
        TitleAr: newsid.TitleAr,
				DescriptionEn:newsid.DescriptionEn,
        DescriptionAr:newsid.DescriptionAr,
        SecondTitleEn: newsid.SecondTitleEn,
        SecondTitleAr: newsid.SecondTitleAr,
        image: newsid.image
   
			});
		} else {
			alert('No Data')
		}
	}, [newsid]);

  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };
  const submit = async (event) => {
    event.preventDefault();
    try {
      
      const formData = new FormData();
      formData.append("TitleEn", state1.TitleEn);
      formData.append("TitleAr", state1.TitleAr);
      formData.append("DescriptionEn", state1.DescriptionEn);
      formData.append("DescriptionAr", state1.DescriptionAr);
      formData.append("SecondTitleEn", state1.SecondTitleEn);
      formData.append("SecondTitleAr", state1.SecondTitleAr);
      formData.append("image", image);

      const response = await axios.put(`${window.env.API_URL}/updatenews/${newsid._id}`, formData);
      history("/news");
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
            <div className="Headers">Edit News</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                  <input
										type='text'
										name='TitleEn'
										id='TitleEn'
										className='group__control'
										placeholder='Title'
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
										placeholder='Description'
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
										name='TitleAr'
										id='TitleAr'
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
										name='TitleEn'
										id='TitleEn'
										className='group__control'
										placeholder='Second Title'
										value={state1.SecondTitleEn}
										onChange={(e) =>
											setState({ ...state1, SecondTitleEn: e.target.value })
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
										value={state1.SecondTitleAr}
										onChange={(e) =>
											setState({ ...state1, SecondTitleAr: e.target.value })
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
