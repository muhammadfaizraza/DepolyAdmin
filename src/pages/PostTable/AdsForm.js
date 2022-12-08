import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add } from "../../redux/postReducer/PostAds";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Validate } from "../../utils/TextInputValidation";

import swal from "sweetalert";

const AdsForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [TitleEn, setTitleEn] = useState("");
  const [TitleAr, setTitleAr] = useState("");
  const [DescriptionAr, setDescriptionAr] = useState("");
  const [DescriptionEn, setDescriptionEn] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  const submit = async (event) => {
    event.preventDefault();
    // try {
    const formData = new FormData();
    Validate("en", TitleEn, "English Title");
    

    // formData.append("image", image);
    // formData.append("TitleEn", TitleEn + " ");
    // formData.append("TitleAr", TitleAr + " ");
    // formData.append("DescriptionAr", DescriptionAr + " ");
    // formData.append("DescriptionEn", DescriptionEn);
    // await axios.post(`${window.env.API_URL}/uploadAds`, formData);
    // swal({
    //   title: "Success!",
    //   text: "Data has been added Successfully",
    //   icon: "success",
    //   button: "OK",
    // });

    // history("/ads");
    // } catch (error) {
    //   const err = error.response.data.message;
    //   swal({
    //     title: "Error!",
    //     text: err,
    //     icon: "error",
    //     button: "OK",
    //   });
    // }
  };

  const isSubmitData =
    TitleAr === "" ||
    TitleEn === "" ||
    DescriptionAr === "" ||
    DescriptionEn === "" ||
    image === null ||
    image === undefined;

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const onSelectFile = (e) => {
    setImage(e.target.files[0]);
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
            <div className="Headers">Create Advertisement</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Title"
                      className="mb-3"
                      onChange={(e) => setTitleEn(e.target.value)}
                      name="Name"
                      value={TitleEn}
                    >
                      <Form.Control type="text" placeholder="Title" />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="عنوان"
                      className="mb-3 floatingInputAr"
                      onChange={(e) => setTitleAr(e.target.value)}
                      name="Name"
                      value={TitleAr}
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control type="text" placeholder="عنوان" />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Description"
                      className="mb-3"
                      onChange={(e) => setDescriptionEn(e.target.value)}
                      value={DescriptionEn}
                    >
                      <Form.Control type="text" placeholder="Description" />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="التفاصيل"
                      className="mb-3 floatingInputAr"
                      onChange={(e) => setDescriptionAr(e.target.value)}
                      value={DescriptionAr}
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control type="text" placeholder="التفاصيل" />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="ButtonSection">
                  <div>
                    <label className="Multipleownerlabel">
                      Select Ads image
                    </label>
                    <input
                      type="file"
                      onChange={onSelectFile}
                      className="formInput"
                    />
                    {image && (
                      <img src={preview} className="PreviewImage" alt="" />
                    )}
                  </div>

                  <button type="submit" className="SubmitButton">
                    Create Ads
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

export default AdsForm;
