import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import TextInputValidation from "../../utils/TextInputValidation";

const Breeder = () => {
  //for error 
  const [Error, setError] = useState("");
  const [ErrorAr, setErrorAr] = useState("");
  const [ErrorDesc, setErrorDesc] = useState("");
  const [ErrorDescAr, setErrorDescAr] = useState("");





  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [shortCode, setshortCode] = useState("");
  const [DescriptionAr, setDescriptionAr] = useState("");
  const [DescriptionEn, setDescriptionEn] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const history = useNavigate();
  const { pathname } = useLocation();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      formData.append("NameAr", NameAr + ' ');
      formData.append("NameEn", NameEn);
      // formData.append("shortCode", shortCode);
      formData.append("DescriptionAr", DescriptionAr + ' ');
      formData.append("DescriptionEn", DescriptionEn);
      formData.append("image", image);

      await axios.post(`${window.env.API_URL}/uploadBreeder`, formData);
      if (pathname === '/breeder') {
        history("/breederlist");
      }
      swal({
        title: "Success!",
        text: "Data has been added successfully ",
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
  const onSelectFile = (e) => {
    setImage(e.target.files[0]);
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

  const Name = (JSON.stringify(
    TextInputValidation(
      "en",
      NameEn,
      " English Name"
    )
  ));
  const obj = JSON.parse(Name);
  console.log(obj.status, 'aszxZ2dasd')
  const arName = (JSON.stringify(
    TextInputValidation(
      "ar",
      NameAr,
      "Name Arabic"
    )
  ));
  
  const objAr = JSON.parse(arName);


  const Description = (JSON.stringify(
    TextInputValidation(
      "en",
      DescriptionEn,
      " English Description"
    )
  ));
  const Desc = JSON.parse(Description);

  const arDescription = (JSON.stringify(
    TextInputValidation(
      "ar",
      DescriptionAr,
      " Arabic Description"
    )
  ));
  
  const DescAr = JSON.parse(arDescription);

  const styles = {
    popup: {
      color: Error.status === true ? "green" : "red",

    }
  };
  const stylesAr = {
    popupAr: {
      color: ErrorAr.status === true ? "green" : "red",

    }
  };
  console.log(Error.status)

  return (
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Create Breeder</div>
          <div className="form">
            <form onSubmit={submit}>
              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Name"
                    className="mb-3"
                    onChange={(e) => setNameEn(e.target.value)}
                    name="Name"
                    value={NameEn}
                    onBlur={() =>
                      setError(obj)

                    } >
                    <Form.Control type="text" placeholder="Name" />
                  </FloatingLabel>

                  <span className="spanForm"> |</span>
                  <span className="error" style={styles.popup}
                  >{Error.message}</span>

                </div>

                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="اسم"
                    className="mb-3 floatingInputAr"
                    onChange={(e) => setNameAr(e.target.value)}
                    name="Name"
                    value={NameAr}
                    style={{ direction: "rtl" }}


                  >
                    <Form.Control type="text" placeholder="اسم" onBlur={() =>
                      setErrorAr(objAr)} />
                  </FloatingLabel>
                  <span className="errorAr" style={stylesAr.popupAr} >{ErrorAr.message}</span>
                </div>
              </div>

              {/* <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Short Code"
                    className="mb-3"
                    onChange={(e) => setshortCode(e.target.value)}
                    value={shortCode}
                  >
                    <Form.Control type="text" placeholder="Short Code" />
                  </FloatingLabel>

                  <span className="spanForm"> |</span>
                </div>

                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="رمز قصير"
                    className="mb-3 floatingInputAr "
                    style={{ direction: "rtl", left: "initial", right: 0 }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="رمز قصير"
                      style={{ left: "%" }}
                    />
                  </FloatingLabel>
                </div>
              </div> */}

              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Description"
                    className="mb-3"
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    value={DescriptionEn}
                    onBlur={() =>
                      setErrorDesc(Desc)

                    }
                  >

                    <Form.Control type="text" placeholder="Description" />
                  </FloatingLabel>
                  <span className="spanForm"> |</span>
                  <span className="error" style={styles.popup}
                  >{ErrorDesc.message}</span>


                </div>

                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="وصف"
                    className="mb-3 floatingInputAr"
                    onChange={(e) => setDescriptionAr(e.target.value)}
                    value={DescriptionAr}
                    style={{ direction: "rtl" }}
                    onBlur={() =>
                      setErrorDescAr(DescAr)

                    }
                  >
                    <Form.Control type="text" placeholder="وصف" />
                  </FloatingLabel>
                  <span className="errorAr" style={styles.popup}
                  >{ErrorDescAr.message}</span>
                </div>
              </div>
              <div className="ButtonSection">
                <div>
                  <label className="Multipleownerlabel">
                    Select Breeder image
                  </label>
                  <input
                    type="file"
                    onChange={onSelectFile}
                    className="formInput"
                  />
                  {image && (
                    <img src={preview} alt="" className="PreviewImage" />
                  )}
                </div>

                <button type="submit" className="SubmitButton">
                  Add Breeder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breeder;
