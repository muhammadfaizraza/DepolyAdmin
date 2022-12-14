import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate , useLocation} from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import TextInputValidation from "../../utils/TextInputValidation";

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

  const [ErrorAbbrev, setErrorAbbrev] = useState("");
  const [ErrorAltName, setErrorAltName] = useState("");
  const [ErrorLabel, setErrorLabel] = useState("");
  const [ErrorOffset, setErrorOffset] = useState("");
  const [ErrorValue, setErrorValue] = useState("");



  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");

  const [Abbrev, setAbbrev] = useState("");
  const [AltName, setAltName] = useState("");
  const [Label, setLabel] = useState("");
  const [Offset, setOffset] = useState("");
  const [Value, setValue] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();









  const history = useNavigate();
  const { pathname } = useLocation();


  const submit = async (event) => {

  
    event.preventDefault();

    try {

      const formData = new FormData();
      formData.append("NameEn", NameEn);
      formData.append("NameAr", NameAr + ' ');
      // formData.append("shortCode", shortCode);
      formData.append("Abbrev", Abbrev);
      formData.append("AltName", AltName);
      formData.append("Label", Label);
      formData.append("Offset", Offset.id);
      formData.append("Value", Value);
      formData.append("image", image);
    
        
      
   await axios.post(`${window.env.API_URL}/uploadNationality`, formData);
          
            
     
   

  
      if(pathname === '/nationality'){
        history("/nationalitylist");
      }
      swal({
        title: "Success!",
        text: "Data has been added Successfully ",
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
  
  

}
 
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
    TextInputValidation("en", Abbrev, "Nationality Abbreviation ")
  );

  const abbrev = JSON.parse(data5);
  const data6 = JSON.stringify(
    TextInputValidation("en", AltName, "Nationality Alternative Name ")
  );
  const altName = JSON.parse(data6);

  const data8 = JSON.stringify(
    TextInputValidation("en", Label, "Nationality Label ")
  );
  const label = JSON.parse(data8);

  const data9 = JSON.stringify(
    TextInputValidation("en", Value, "Nationality Value English")
  );
  const value = JSON.parse(data9);
  
  

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
                    <Form.Control type="text" placeholder="Name" required   />
                  </FloatingLabel>

                  <span className="spanForm"> |</span >
                  <span className="error">{ErrorNameEn.message}</span>
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
            <span className="errorAr">{ErrorNameAr.message}</span>
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
                    label=" Abbreviation"
                    className="mb-3"
                    onChange={(e) => setAbbrev(e.target.value)}
                    value={Abbrev}
                  onBlur={() => setErrorAbbrev(abbrev)}
                  >
                    <Form.Control
                      type="text"
                      placeholder=" Abbreviation"
                      required/>
                  </FloatingLabel>
           <span className="error">{ErrorAbbrev.message}</span>
                  {/* <span className="spanForm"> |</span> */}
                </div>

                {/* <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="اكتب الاختصار"
                    className="mb-3 floatingInputAr "
                    style={{ direction: "rtl", left: "initial", right: 0 }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="اكتب الاختصار"
                      style={{ left: "%" }}
                    />
                  </FloatingLabel>
                </div> */}
              </div>

              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label=" Alternative Name"
                    className="mb-3"
                    onChange={(e) => setAltName(e.target.value)}
                    value={AltName}
                    onBlur={() => setErrorAltName(altName)}
                 
                  >
                    <Form.Control
                      type="text"
                      placeholder="Write Alternative Name"
                      required/>
                  </FloatingLabel>
                  <span className="error">{ErrorAltName.message}</span>
                  {/* <span className="spanForm"> |</span> */}

                </div>

                {/* <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="اكتب الاسم البديل"
                    className="mb-3 floatingInputAr "
                    style={{ direction: "rtl", left: "initial", right: 0 }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="اكتب الاسم البديل"
                      style={{ left: "%" }}
                    />
                  </FloatingLabel>
                </div> */}
              </div>

              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Label"
                    className="mb-3"
                    onChange={(e) => setLabel(e.target.value)}
                    value={Label}
                  onBlur={() => setErrorLabel(label)}
                  >
                    <Form.Control type="text" placeholder="Label" required/>
                  </FloatingLabel>{" "}
                  {/* <span className="spanForm"> |</span> */}
                  <span className="error">{ErrorLabel.message}</span>
                </div>

                {/* <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="مُلصَق"
                    className="mb-3 floatingInputAr "
                    style={{ direction: "rtl", left: "initial", right: 0 }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="مُلصَق"
                      style={{ left: "%" }}
                    />
                  </FloatingLabel>
                </div> */}
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
                      onBlur={() => Offset === "" ?  setErrorOffset("Offset is required"):setErrorOffset("") }
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
                    onChange={(e) => setValue(e.target.value)}
                    value={Value}
                    onBlur={() => setErrorValue(value) }
                  >
                    <Form.Control type="text" placeholder="Value" required/>
                  </FloatingLabel>
                  {/* <span className="spanForm"> |</span> */}
                  <span className="error">{ErrorValue.message}</span>
                </div>

                {/* <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="القيمة"
                    className="mb-3 floatingInputAr "
                    style={{ direction: "rtl", left: "initial", right: 0 }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="القيمة"
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
                  />
                  {image && (
                    <img src={preview} className="PreviewImage" alt="" />
                  )}
                </div>
                <button type="submit" className="SubmitButton">
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
