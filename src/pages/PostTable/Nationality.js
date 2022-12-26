import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import TextInputValidation from "../../utils/TextInputValidation";
import { ImCross } from 'react-icons/im';

const Offsets = [
  { id: "0", value: "false", label: "false" },
  { id: "1", value: "true", label: "true" },
];

const OffsetsAr = [
  { id: "0", value: "خاطئة", label: "خاطئة" },
  { id: "1", value: "حقيقي", label: "حقيقي" },
];

const Nationality = () => {
  const [ErrorNameEn, setErrorNameEn] = useState("");
  const [ErrorNameAr, setErrorNameAr] = useState("");

  const [ErrorAbbrevEn, setErrorAbbrevEn] = useState("");
  const [ErrorAbbrevAr, setErrorAbbrevAr] = useState("");
  const [ErrorAltNameEn, setErrorAltNameEn] = useState("");
  const [ErrorAltNameAr, setErrorAltNameAr] = useState("");
  const [ErrorLabel, setErrorLabel] = useState("");
  const [ErrorLabelAr, setErrorLabelAr] = useState("");
  const [ErrorOffset, setErrorOffset] = useState("");
  const [ErrorValueEn, setErrorValueEn] = useState("");
  const [ErrorValueAr, setErrorValueAr] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");

  const [AbbrevEn, setAbbrevEn] = useState("");
  const [AbbrevAr, setAbbrevAr] = useState("");
  const [AltNameEn, setAltNameEn] = useState("");
  const [AltNameAr, setAltNameAr] = useState("");
  const [LabelEn, setLabelEn] = useState("");
  const [LabelAr, setLabelAr] = useState("");
  const [Offset, setOffset] = useState("");
  const [ValueEn, setValueEn] = useState("");
  const [ValueAr, setValueAr] = useState("");
  const [shortCode, setshortCode] = useState("");

  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  const history = useNavigate();
  const { pathname } = useLocation();

  const submit = async (event) => {
    event.preventDefault();
    setisLoading(true)
    try {
      const formData = new FormData();
      formData.append("NameEn", NameEn);
      formData.append("NameAr", NameAr + " ");
      formData.append("shortCode", shortCode);
      formData.append("AbbrevEn", AbbrevEn);
      formData.append("AbbrevAr", AbbrevAr);
      formData.append("AltNameEn", AltNameEn);
      formData.append("AltNameAr", AltNameAr);
      formData.append("LabelEn", LabelEn);
      formData.append("LabelAr", LabelAr);
      formData.append("Offset", Offset.id);
      formData.append("ValueEn", ValueEn);
      formData.append("ValueAr", ValueAr);
      formData.append("image", image);

      await axios.post(`${window.env.API_URL}/uploadNationality`, formData);

      if (pathname === "/nationality") {
        history("/nationalitylist");
      }
      swal({
        title: "Success!",
        text: "Data has been added Successfully ",
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
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const onSelectFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePreview = () => {
    setImage()
  document.getElementById("file").value=""
  };
  //Checking Validation

  const data3 = JSON.stringify(
    TextInputValidation("en", NameEn, "Nationality Name English")
  );

  const Name = JSON.parse(data3);
  const data4 = JSON.stringify(
    TextInputValidation("ar", NameAr, "Nationality Name Arabic")
  );
  const Namear = JSON.parse(data4);

  const data5 = JSON.stringify(
    TextInputValidation("en", AbbrevEn, "Nationality Abbreviation ")
  );

  const abbrev = JSON.parse(data5);
  const data6 = JSON.stringify(
    TextInputValidation("en", AltNameEn, "Nationality Alternative Name ")
  );
  const altName = JSON.parse(data6);

  const data8 = JSON.stringify(
    TextInputValidation("en", LabelEn, "Nationality Label ")
  );
  const label = JSON.parse(data8);

  const data9 = JSON.stringify(
    TextInputValidation("en", ValueEn, "Nationality Value English")
  );
  const value = JSON.parse(data9);
  const data10 = JSON.stringify(
    TextInputValidation("ar", ValueAr, "Nationality Value Arabic")
  );
  const valuear = JSON.parse(data10);
  const data11 = JSON.stringify(
    TextInputValidation("ar", LabelAr, "Nationality Label Arabic")
  );
  const Labelar = JSON.parse(data11);
  const data12 = JSON.stringify(
    TextInputValidation("ar", AltNameAr, "Nationality Alternative Name Arabic")
  );
  const Altnamear = JSON.parse(data12);
  const data13 = JSON.stringify(
    TextInputValidation("ar", AbbrevAr, "Nationality Abbreviation Arabic")
  );
  const abbrevar = JSON.parse(data13);


  return (
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Add Nationality</div>
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
                    onBlur={() => setErrorNameEn(Name)}
                  >
                    <Form.Control type="text" placeholder="Name" required />
                  </FloatingLabel>

                  <span className="spanForm"> |</span>
                  <span className={ErrorNameEn.status ? 'success' : 'error'}>{ErrorNameEn.message}</span>
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
                    onBlur={() => setErrorNameAr(Namear)}
                  >
                    <Form.Control type="text" placeholder="اسم" required />
                  </FloatingLabel>
                  <span className={ErrorNameAr.status ? 'successAr' : 'errorAr'}>{ErrorNameAr.message}</span>
                </div>
              </div>

              
              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label=" Abbreviation"
                    className="mb-3"
                    onChange={(e) => setAbbrevEn(e.target.value)}
                    value={AbbrevEn}
                    onBlur={() => setErrorAbbrevEn(abbrev)}
                  >
                    <Form.Control
                      type="text"
                      placeholder=" Abbreviation"
                      required
                    />
                  </FloatingLabel>
                <span className="spanForm"> |</span> 
                  <span className={ErrorAbbrevEn.status ? 'success' : 'error'}>{ErrorAbbrevEn.message}</span>
                
                </div>

              <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="اكتب الاختصار"
                    onChange={(e) => setAbbrevAr(e.target.value)}
                    value={AbbrevAr}
                    className="mb-3 floatingInputAr "
                    style={{ direction: "rtl", left: "initial", right: 0 }}
                    onBlur={() => setErrorAbbrevAr(abbrevar)}
                  >
                    <Form.Control
                      type="text"
                      placeholder="اكتب الاختصار"
                      style={{ left: "%" }}
                    />
                  </FloatingLabel>
                  <span className={ErrorAbbrevAr.status ? 'successAr' : 'errorAr'}>{ErrorAbbrevAr.message}</span>
                </div> 
              </div>

              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label=" Alternative Name"
                    className="mb-3"
                    onChange={(e) => setAltNameEn(e.target.value)}
                    value={AltNameEn}
                    onBlur={() => setErrorAltNameEn(altName)}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Write Alternative Name"
                      required
                    />
                  </FloatingLabel>
                  <span className="spanForm"> |</span> 
                  <span className={ErrorAltNameEn.status ? 'success' : 'error'}>{ErrorAltNameEn.message}</span>
          
                </div>

                 <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="اكتب الاسم البديل"
                    onChange={(e) => setAltNameAr(e.target.value)}
                    value={AltNameAr}
                    className="mb-3 floatingInputAr "
                    style={{ direction: "rtl", left: "initial", right: 0 }}
                    onBlur={() => setErrorAltNameAr(Altnamear)}
                  
                  >
                    <Form.Control
                      type="text"
                      placeholder="اكتب الاسم البديل"
                      style={{ left: "%" }}
                    />
                  </FloatingLabel>
                  <span className={ErrorAltNameAr.status ? 'successAr' : 'errorAr'}>{ErrorAltNameAr.message}</span>
                </div> 
              </div>

              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Label"
                    className="mb-3"
                    onChange={(e) => setLabelEn(e.target.value)}
                    value={LabelEn}
                    onBlur={() => setErrorLabel(label)}
                  >
                    <Form.Control type="text" placeholder="Label" required />
                  </FloatingLabel>{" "}
                  <span className="spanForm"> |</span>
                  <span className={ErrorLabel.status ? 'success' : 'error'}>{ErrorLabel.message}</span>
                </div>

                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="مُلصَق"
                    onChange={(e) => setLabelAr(e.target.value)}
                    value={LabelAr}
                    className="mb-3 floatingInputAr "
                    style={{ direction: "rtl", left: "initial", right: 0 }}
                    onBlur={() => setErrorLabelAr(Labelar)}

          
                  >
                    <Form.Control
                      type="text"
                      placeholder="مُلصَق"
                      style={{ left: "%" }}
                    />
                  </FloatingLabel>
            <span className={ErrorLabelAr.status ? 'successAr' : 'errorAr'}>{ErrorLabelAr.message}</span>
                </div>
              </div>

              <div className="row mainrow">
                <div className="col-sm">
                  <Select
                    placeholder={<div>Offset</div>}
                    defaultValue={Offset}
                    onChange={setOffset}
                    options={Offsets}
                    isClearable={true}
                    isSearchable={true}
                    onBlur={() =>
                      Offset === ""
                        ? setErrorOffset("Offset is required")
                        : setErrorOffset("")
                    }
                  />
                  <span className="spanForm"> |</span>
                  <span className="error">{ErrorOffset}</span>
                </div>
                <div className="col-sm">
                  <Select
                    required
                    placeholder={<div>حدد جيلتي</div>}
                    className="selectdir"
                    defaultValue={Offset}
                    onChange={setOffset}
                    options={OffsetsAr}
                    isClearable={true}
                    isSearchable={true}
                  />
                </div>
              </div>

              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Value"
                    className="mb-3"
                    onChange={(e) => setValueEn(e.target.value)}
                    value={ValueEn}
                    onBlur={() => setErrorValueEn(value)}
                  >
                    <Form.Control type="text" placeholder="Value" required />
                  </FloatingLabel>
                  <span className="spanForm"> |</span>
                  <span className={ErrorValueEn.status ? 'success' : 'error'}>{ErrorValueEn.message}</span>
                </div>
          
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="القيمة"
                    onChange={(e) => setValueAr(e.target.value)}
                    value={ValueAr}
                    className="mb-3 floatingInputAr "
                    style={{ direction: "rtl", left: "initial", right: 0 }}
                    onBlur={() => setErrorValueAr(valuear)}
                  >
                    <Form.Control
                      type="text"
                      placeholder="القيمة"
                      style={{ left: "%" }}
                    />
                  </FloatingLabel>
                  <span  className={ErrorValueAr.status ? 'successAr' : 'errorAr'}>{ErrorValueAr.message}</span>
                </div> 
              </div>
              <div className="row mainrow">
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

                  {/* <span className="spanForm"> |</span> */}
                </div>
{/* 
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
                </div> */}
              </div>

              <div className="ButtonSection">
                <div>
                  <label className="Multipleownerlabel">
                    Select Nationality Flag image
                  </label>
                  <input
                    type="file"
                    onChange={onSelectFile}
                    className="formInput fileinputdata"
                    id="file"
                  />
                   {image && (
                      <>
                       <ImCross onClick={handlePreview} className="crossIcon"/>
                       <img src={preview} className="PreviewImage" alt="" />
                      </>
                    )}
                </div>
                <button type="submit" className="SubmitButton" disabled={isLoading}>
                  Add Nationality
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nationality;
