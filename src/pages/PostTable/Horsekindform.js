import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import TextInputValidation from "../../utils/TextInputValidation";
import { fetchhorsekindshortcode } from "../../redux/getShortCode/gethorsekindshortcode";
import { useSelector ,useDispatch } from "react-redux";

const Horsekindform = () => {
  //FOR ERRORS
  const [Error, setError] = useState("");
  const [ErrorAr, setErrorAr] = useState("");
  const [ErrorShortName, setErrorShortName] = useState("");

  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [shortName, setshortName] = useState("");
  const [shortNameAr, setshortNameAr] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [shortCode, setshortCode] = useState("");
  const dispatch = useDispatch();
  const {data:horsekindshortcode} = useSelector((state) => state.horsekindshortcode)
  const history = useNavigate();
  const { pathname } = useLocation();

  const [state1, setState] = useState({
		shortCode: '',
	});

  useEffect(() => {
		if (horsekindshortcode) {
			setState({
        shortCode: horsekindshortcode.length === 0 ? 10 : horsekindshortcode[0].maxshortCode + 1,
			});
		} else {
      setState.shortCode('10')
		}
	}, [horsekindshortcode]);




  useEffect(() => {
    dispatch(fetchhorsekindshortcode());
  },[dispatch])

  
  const submit = async (event) => {
    event.preventDefault();
    setisLoading(true)
    try {
      const formData = new FormData();
      formData.append("NameEn", NameEn);
      formData.append("NameAr", NameAr);
      formData.append("shortCode",shortCode);
      formData.append("AbbrevEn", shortName);
      formData.append("AbbrevAr", shortNameAr);


      await axios.post(`${window.env.API_URL}/uploadHorseKind`, formData);
      swal({
        title: "Success!",
        text: "Data has been added successfully ",
        icon: "success",
        button: "OK",
      });
      if (pathname === "/horsekindform") {
        history("/horsekind");
      }
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

  const data1 = JSON.stringify(
    TextInputValidation("en", NameEn, "Horse Kind Name English")
  );

  const obj = JSON.parse(data1);
  const data2 = JSON.stringify(
    TextInputValidation("ar", NameAr, "Horse Kind Name Arabic")
  );
  const objAr = JSON.parse(data2);
  const data3 = JSON.stringify(
    TextInputValidation("en", shortName, "Horse Kind Short Name English")
  );
  const shotName = JSON.parse(data3);

  return (
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Create Horse Kind</div>
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
                    onBlur={() => setError(obj)}
                  >
                    <Form.Control type="text" placeholder="Name" required />
                  </FloatingLabel>

                  <span className="spanForm"> |</span>
                  <span className="error">{Error.message}</span>
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
                    onBlur={() => setErrorAr(objAr)}
                  >
                    <Form.Control type="text" placeholder="اسم" required />
                  </FloatingLabel>
                  <span className="errorAr">{ErrorAr.message}</span>
                </div>
              </div>

              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Short Name"
                    className="mb-3"
                    onChange={(e) => setshortName(e.target.value)}
                    value={shortName}
                    onBlur={() => setErrorShortName(shotName)}
                  >
                    <Form.Control type="text" placeholder="ShortCode" />
                  </FloatingLabel>
                  <span className="spanForm"> |</span>
                  <span className="error">{ErrorShortName.message}</span>
                </div>

                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="اسم قصير"
                    className="mb-3 floatingInputAr"
                    style={{ direction: "rtl" }}
                  >
                    <Form.Control type="text" placeholder="التفاصيل" />
                  </FloatingLabel>
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
              <div className="ButtonSection " style={{ justifyContent: "end" }}>
                <button type="submit" className="SubmitButton" disabled={isLoading}>
                  Add Horse Kind
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Horsekindform;
