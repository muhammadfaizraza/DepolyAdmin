import React, { useState , useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import TextInputValidation from "../../utils/TextInputValidation";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { fetchgroundshortcode } from "../../redux/getShortCode/getgroundtypeshortcode";
import { useSelector ,useDispatch } from "react-redux";
const GroundType = () => {
  const {data:groundshortcode} = useSelector((state) => state.groundshortcode)



  
  const [ErrorAbbrev, setErrorAbbrev] = useState("");
  const [ErrorAbbrevAr, setErrorAbbrevAr] = useState("");

  const [ErrorNameEn, setErrorNameEn] = useState("");
  const [ErrorNameAr, setErrorNameAr] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");

  const [AbbrevEn, setAbbrevEn] = useState("");
  const [AbbrevAr, setAbbrevAr] = useState("");

  const dispatch = useDispatch();

  const history = useNavigate();
  const { pathname } = useLocation();

  const [state1, setState] = useState({
		shortCode: '',
	});

  useEffect(() => {
		if (groundshortcode) {
			setState({
        shortCode: groundshortcode.length === 0 ? 10 : groundshortcode[0].maxshortCode + 1,
			});
		} else {
      setState.shortCode('9')
		}
	}, [groundshortcode]);
  useEffect(() => {
    dispatch(fetchgroundshortcode());
  },[dispatch])
  const submit = async (event) => {
    event.preventDefault();
    setisLoading(true)
    try {
      const formData = new FormData();
      formData.append("NameEn", NameEn);
      formData.append("NameAr", NameAr);
      formData.append("shortCode",state1.shortCode);
      formData.append("AbbrevEn", AbbrevEn);
      formData.append("AbbrevAr", AbbrevAr);

      await axios.post(`${window.env.API_URL}uploadGroundType`, formData);
      if (pathname === "/ground") {
        history("/groundlist");
      }
      swal({
        title: "Success!",
        text: "Data has been added Successfully ",
        icon: "success",
        button: "OK",
      });
      setisLoading(false)
    } catch (error) {
      const err = error.response.data.message[0];
      const err1 = error.response.data.message[1];
      const err2 = error.response.data.message[2];

      console.log(err,'dadasd')
      swal({
        title: "Error!",
        text: err,err1,err2,
        icon: "error",
        button: "OK",
      });
      setisLoading(false)
    }
  };
  const data1 =  (JSON.stringify(
    TextInputValidation(
      "en",
      NameEn,
      "Ground Type English"
    )
  ));



  const obj = JSON.parse(data1);
 const data2 =  (JSON.stringify(
    TextInputValidation(
      "ar",
      NameAr,
      "Ground Type Arabic"
    )
  ));


  const objAr = JSON.parse(data2);

  const data3 =  (JSON.stringify(
    TextInputValidation(
      "en",
      AbbrevEn,
      "Ground Type Abbreviation"
    )
  ));


  const abbrev = JSON.parse(data3);
  const data4 =  (JSON.stringify(
    TextInputValidation(
      "ar",
      AbbrevEn,
      "Ground Type Abbreviation"
    )
  ));


  const abbrevAr = JSON.parse(data4);




  return (
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Create Ground</div>
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
                    onBlur={() => setErrorNameEn(obj)}

                  >
                    <Form.Control type="text" placeholder="Name" required/>
                  </FloatingLabel>

                  <span className="spanForm"> |</span>
                  <span className={ErrorNameEn.status ? "success": "error"}>{ErrorNameEn.message}</span>
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
                    onBlur={() => setErrorNameAr(objAr)}
                  
                  >
                    <Form.Control type="text" placeholder="اسم" required/>
                  </FloatingLabel>
                  <span className={ErrorNameAr.status ? "successAr": "errorAr"}>{ErrorNameAr.message}</span>
                </div>
              </div>
              <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Abbrevation"
                      className="mb-3"
                      name="AbbrevEn"
                      onChange={(e) => setAbbrevEn(e.target.value)}
                      value={AbbrevEn}
                    >
                      <Form.Control
                        required
                       
                        name="AbbrevEn"
                        type="text"
                        placeholder="Abbrevation"
                        onBlur={() =>
                         setErrorAbbrev(abbrev)
                              
                        }
                      />
                    </FloatingLabel>
                 
                    <span className="spanForm"> |</span>
                    <span className={ErrorAbbrev.status ? "success" : "error"}
                    >{ErrorAbbrev.message}</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="اختصار"
                      className="mb-3 floatingInputAr"
                      name="AbbrevAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) => setAbbrevAr(e.target.value)}
                      value={AbbrevAr}
                    >
                      <Form.Control
                        name="AbbrevAr" 
                        type="text"
                        placeholder="اختصار"
                        required
                        onBlur={() =>
                          setErrorAbbrevAr(abbrevAr)
                               
                         }
                     
                      />
                    </FloatingLabel>
                    <span  className={ErrorAbbrevAr.status ? "successAr" : "errorAr"} >{ErrorAbbrevAr.message}</span>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Short Code"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, shortCode: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number" placeholder="Description" value={state1.shortCode}/>
                    </FloatingLabel>
                 
									
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

              <div className="ButtonSection " style={{ justifyContent: "end" }}>
                <button Name="submit" className="SubmitButton" disabled={isLoading}>
                  Add Ground
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroundType;
