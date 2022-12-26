import React, { useState , useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate , useLocation } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import TextInputValidation from "../../utils/TextInputValidation";
import { fetchsexshortcode } from "../../redux/getShortCode/getsexshortcode";
import { useSelector ,useDispatch } from "react-redux";


const Gender = () => {
 //for error
 const dispatch = useDispatch();

 const [Error, setError] = useState("")
 const [ErrorAr, setErrorAr] = useState("")
 const {data:sexshortcode} = useSelector((state) => state.sexshortcode)



  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [shortCode, setshortCode] = useState("");
  const [AbbrevEn, setAbbrevEn] = useState("");
  const [AbbrevAr, setAbbrevAr] = useState("");
  const [isLoading, setisLoading] = useState(false);


  const history = useNavigate();
  const { pathname } = useLocation();
  const [state1, setState] = useState({
		shortCode: '',
	});

  console.log(sexshortcode,'sexshortcode')
  useEffect(() => {
		if (sexshortcode) {
			setState({
        shortCode: sexshortcode.length === 0 ? 9 : sexshortcode[0].maxshortCode,
			});
		} else {
		}
	}, [sexshortcode]);

  useEffect(() => {
    dispatch(fetchsexshortcode());
  }, [dispatch]);


  const submit = async (event) => {
    event.preventDefault();
    setisLoading(true)
    try {
      const formData = new FormData();
      formData.append("NameEn", NameEn);
      formData.append("NameAr", NameAr + ' ');
      // formData.append("shortCode", shortCode);
      formData.append("shortCode",shortCode);
      formData.append("AbbrevEn", AbbrevEn);
      formData.append("AbbrevAr", AbbrevAr);

      await axios.post(`${window.env.API_URL}/uploadSex`, formData);
      swal({
        title: "Success!",
        text: "Data has been added Successfully ",
        icon: "success",
        button: "OK",
      });
      if(pathname === '/gender'){
        history("/genderlist");
      }
      setisLoading(false)
    } catch (error) {
      const err = error.response.data.message[0];
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
      setisLoading(false)
    }
  };
  
  const data1 = (JSON.stringify(
    TextInputValidation(
      "en",
      NameEn,
      "Gender Name English"
    )
  ));

  const obj = JSON.parse(data1);
  const data2 = (JSON.stringify(
    TextInputValidation(
      "ar",
      NameAr,
      "Gender Name Arabic"
    )
  ));
  const objAr = JSON.parse(data2);
  const styles = {
    popup:{
      color: Error.status === true ? "green" : "red",
 
    }
  };
  const stylesAr = {
    popupAr:{
      color: ErrorAr.status === true ? "green" : "red",
 
    }
  };
  return (
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Create Gender</div>
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

                    }
                  >
                    <Form.Control type="text" placeholder="Name" required/>
                  </FloatingLabel>

                  <span className="spanForm"> |</span>
                  <span className={Error.status ? 'success' : 'error'}  
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
                    onBlur={() =>
                      setErrorAr(objAr)
                           
                     }
                  >
                    <Form.Control type="text" placeholder="اسم" required/>
                  </FloatingLabel>
                  <span className={ErrorAr.status ? 'successAr' : 'errorAr'} >{ErrorAr.message}</span>
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
                          setErrorAr(objAr)
                               
                         }
                     
                      />
                    </FloatingLabel>
                    <span className="errorAr" style={stylesAr.popupAr} >{ErrorAr.message}</span>
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
                      onChange={(e) =>
                        setregisteration({ ...registeration, shortCode: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text"  placeholder="Description" />
                  </FloatingLabel>
                 
									
                  </div>
                </div> */}
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
                  Add Gender
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gender;
