import React, { Fragment, useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import TextInputValidation from "../../utils/TextInputValidation";
import { fetchcolorshortcode } from "../../redux/getShortCode/getcolorshortcode";
import { useSelector, useDispatch } from "react-redux";



const Color = () => {
  //for errors
  const [Error, setError] = useState("")
  const [ErrorAr, setErrorAr] = useState("")
  const [ErrorAbbrev, setErrorAbbrev] = useState("")
  const [ErrorAbbrevAr, setErrorAbbrevAr] = useState("")

  const dispatch = useDispatch();

  const { data: colorshortcode } = useSelector((state) => state.colorshortcode)
  const [registeration, setregisteration] = useState({
    NameEn: "",
    NameAr: "",
    shortCode: "",
    AbbrevEn: "",
    AbbrevAr: ""
  });

  const [isLoading, setisLoading] = useState(false);
  const [state1, setState] = useState({
    shortCode: '',
  });

  useEffect(() => {
    if (colorshortcode) {
      setState({
        shortCode: colorshortcode.length === 0 ? 10 : colorshortcode[0].maxshortCode + 1,
      });
    } else {
      setState.shortCode('9')
    }
  }, [colorshortcode]);




  useEffect(() => {
    dispatch(fetchcolorshortcode());
  }, [dispatch])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setregisteration({ ...registeration, [name]: value });
  };
  const data1 = (JSON.stringify(
    TextInputValidation(
      "en",
      registeration.NameEn,
      "Color Name"
    )
  ));


  const obj = JSON.parse(data1);
  const data2 = (JSON.stringify(
    TextInputValidation(
      "ar",
      registeration.NameAr,
      "Color Name Arabic"
    )
  ));


  const objAr = JSON.parse(data2);

  const data3 = (JSON.stringify(
    TextInputValidation(
      "ar",
      registeration.AbbrevAr,
      "Color Abbreviation Arabic"
    )
  ));


  const abbrevar = JSON.parse(data3);
  const data4 = (JSON.stringify(
    TextInputValidation(
      "en",
      registeration.AbbrevEn,
      "Color Abbreviation"
    )
  ));
  const AbbrevEn = JSON.parse(data4);
  const submit = async (event) => {
    event.preventDefault();
    setisLoading(true)
    try {
      const formData = new FormData();
      formData.append("NameEn", registeration.NameEn);
      formData.append("NameAr", registeration.NameAr);
      formData.append("AbbrevEn", registeration.AbbrevEn);
      formData.append("AbbrevAr", registeration.AbbrevAr);
      formData.append("shortCode", state1.shortCode);

      await axios.post(`${window.env.API_URL}/uploadColor`, formData);
      swal({
        title: "Success!",
        text: "Data has been added Successfully ",
        icon: "success",
        button: "OK",
      });
      if (pathname === "/color") {
        history("/colorlist");
      }
      setisLoading(false)
    } catch (error) {
      const err = error.response.data.message[0];
      const err1 = error.response.data.message[1];
      const err2 = error.response.data.message[2];

      console.log(err, 'dadasd')
      swal({
        title: "Error!",
        text: err, err1, err2,
        icon: "error",
        button: "OK",
      });
      setisLoading(false)
    }
  };
  //conditional styling for errors
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
  const history = useNavigate();
  const { pathname } = useLocation();

  return (
    <Fragment>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Create Color</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Name"
                      className="mb-3"
                      name="Name"
                    >
                      <Form.Control
                        required
                        onChange={handleChange}
                        value={registeration.NameEn}
                        name="NameEn"
                        type="text"
                        placeholder="Name"
                        onBlur={() =>
                          setError(obj)

                        }
                      />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                    <span className="error" style={styles.popup}
                    >{Error.message}</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="??????"
                      className="mb-3 floatingInputAr"
                      name="Name"
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control
                        name="NameAr"
                        onChange={handleChange}
                        value={registeration.NameAr}
                        type="text"
                        placeholder="??????"
                        required
                        onBlur={() =>
                          setErrorAr(objAr)

                        }

                      />
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
                      onChange={(e) =>
                        setregisteration({ ...registeration, shortCode: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text"  placeholder="Description" value={colorshortcode.length === 0 ? <>N/A</> : colorshortcode[0].maxshortCode}/>
                  </FloatingLabel>
                 
									
                  </div>
                </div> */}
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Abbreviation"
                      className="mb-3"
                      name="AbbrevEn"
                    >
                      <Form.Control
                        required
                        onChange={handleChange}
                        value={registeration.AbbrevEn}
                        name="AbbrevEn"
                        type="text"
                        placeholder="Abbrevation"
                        onBlur={() =>
                          setErrorAbbrev(AbbrevEn)

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
                      label="????????????"
                      className="mb-3 floatingInputAr"
                      name="AbbrevAr"
                      style={{ direction: "rtl" }}
                    >
                      <Form.Control
                        name="AbbrevAr"
                        onChange={handleChange}
                        value={registeration.AbbrevAr}
                        type="text"
                        placeholder="????????????"
                        required
                        onBlur={() =>
                          setErrorAbbrevAr(abbrevar)

                        }

                      />
                    </FloatingLabel>
                    <span className={ErrorAbbrevAr.status ? "successAr" : "errorAr"}
                    >{ErrorAbbrevAr.message}</span>                </div>
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
                      <Form.Control type="number" placeholder="Description" value={state1.shortCode} />
                    </FloatingLabel>


                  </div>
                </div>
                <div
                  className="ButtonSection "
                  style={{ justifyContent: "end" }}
                >
                  <button Name="submit" className="SubmitButton" disabled={isLoading}>
                    Add Color
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Color;
