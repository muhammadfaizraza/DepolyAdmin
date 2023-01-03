import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import TextInputValidation from "../../utils/TextInputValidation";
import { ImCross } from 'react-icons/im';

const SliderForm = () => {
   //for error
 const [Error, setError] = useState("");
 const [ErrorAr, setErrorAr] = useState("");
 const [ErrorURL, setErrorURL] = useState("");
 const [isLoading, setisLoading] = useState(false);

  const history = useNavigate();
  const [TitleEn, setTitleEn] = useState("");
  const [TitleAr, setTitleAr] = useState("");
  const [Url, setUrl] = useState();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();


    //error Function
  const data1 = (JSON.stringify(
    TextInputValidation(
      "en",
      TitleEn,
      "Slider Title"
    )
  ));

  const obj = JSON.parse(data1);
  const data2 = (JSON.stringify(
    TextInputValidation(
      "ar",
      TitleAr,
      "Slider Title Arabic"
    )
  ));
  const objAr = JSON.parse(data2);
  const submit = async (event) => {
    event.preventDefault();
    setisLoading(true)
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("TitleEn", TitleEn);
      formData.append("TitleAr", TitleAr + ' ');
      formData.append("Url", Url);
      await axios.post(
        `${window.env.API_URL}/uploadSlider`,
        formData
      );
      history("/slider");
      swal({
        title: "Success!",
        text: "Data has been added successfully ",
        icon: "success",
        button: "OK",
      });
      setisLoading(false)
    } catch (error) {
      const err = error.response.data.message;
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
      setisLoading(false)
    }
  };
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
  const handlePreview = () => {
    setImage()
  document.getElementById("file").value=""
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
            <div className="Headers">Add Slider</div>
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
                      onBlur={() =>
                        setError(obj)
  
                      }
                    >
                      <Form.Control type="text" placeholder="Title" required />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                    <span className={Error.status ? 'success' : 'error'} 
                  >{Error.message}</span>
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
                      onBlur={() =>
                        setErrorAr(objAr)
                             
                       }
                    >
                      <Form.Control type="text" placeholder="عنوان" required />
                    </FloatingLabel>
                    <span className={ErrorAr.status ? 'successAr' : 'errorAr'} >{ErrorAr.message}</span>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Slider URL"
                      className="mb-3"
                      onChange={(e) => setUrl(e.target.value)}
                      name="Name"
                      value={Url}
                      onBlur={() => Url === "" ? setErrorURL("URL is required"):setErrorURL("URL is Validated ")}
                    >
                      <Form.Control type="text" placeholder="Title" required />
                    </FloatingLabel>
<span className={Url === "" ? "error" :"success"}>{ErrorURL}</span>
                  </div>


                </div>

                <div className="ButtonSection">
                  <div>
                    <label className="Multipleownerlabel">
                      Select Slider image
                    </label>
                    <input
                      type="file"
                      onChange={onSelectFile}
                      className="formInput"
                      id="file"
                    />
                    {image && (
                      <>
                       <ImCross onClick={handlePreview} className="crossIcon"/>
                       <img src={preview} className="PreviewImage" alt="" />
                      </>
                    )}
                  </div>
<div>
                  <button
                    type="submit"
                    onClick={submit}
                    className="SubmitButton"
                    disabled={isLoading}
                  >
                    Add Slider
                  </button>
                  </div>
                </div>
     
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderForm;
