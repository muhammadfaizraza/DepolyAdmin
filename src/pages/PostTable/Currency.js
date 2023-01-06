import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useNavigate, useLocation } from "react-router-dom";
import TextInputValidation from "../../utils/TextInputValidation";
import { fetchcurrencyshortcode } from "../../redux/getShortCode/getcurrencyshortcode";
import { useSelector, useDispatch } from "react-redux";

const Currency = () => {
  //for error
  const [Error, setError] = useState("");
  const [ErrorAr, setErrorAr] = useState("");
  const dispatch = useDispatch();
  const { data: currencyshortcode } = useSelector(
    (state) => state.currencyshortcode
  );
  const [ErrorRate, setErrorRate] = useState("");
  const [ErrorSymbol, setErrorSymbol] = useState("");

  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [Rate, setRate] = useState("");
  const [Symbol, setSymbol] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [state1, setState] = useState({
		shortCode: '',
	});



  const history = useNavigate();
  const { pathname } = useLocation();






  useEffect(() => {
		if (currencyshortcode) {
			setState({
        shortCode: currencyshortcode.length === 0 ? 10 : currencyshortcode[0].maxshortCode + 1,
			});
		} else {
      setState.shortCode('9')
		}
	}, [currencyshortcode]);
  useEffect(() => {
    dispatch(fetchcurrencyshortcode());
  }, [dispatch]);

  //for Errors
  const data1 = JSON.stringify(
    TextInputValidation("en", NameEn, "Currency Name English")
  );

  const obj = JSON.parse(data1);
  const data2 = JSON.stringify(
    TextInputValidation("ar", NameAr, "Currency Name Arabic")
  );
  const objAr = JSON.parse(data2);

  const submit = async (event) => {
    event.preventDefault();
    setisLoading(true)
    try {
      const formData = new FormData();

      formData.append("NameEn", NameEn);
      formData.append("NameAr", NameAr + " ");
      formData.append("Symbol", Symbol);
      formData.append("Rate", Rate);
      await axios.post(`${window.env.API_URL}uploadCurrency`, formData);
      if (pathname === "/currency") {
        history("/currencylist");
      }
      swal({
        title: "Success!",
        text: "Data has been added successfully ",
        icon: "success",
        button: "OK",
      });
      setisLoading(false)
    } catch (error) {
      const err = error.response.data.message[0];
      const err1 = error.response.data.message[1];
      const err2 = error.response.data.message[2];
      swal({
        title: "Error!",
        text: err,err1,err2,
        icon: "error",
        button: "OK",
      });
      setisLoading(false)
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
          <div className="Headers">Add Currency</div>
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
                  <span className={Error.status ? 'success' : 'error'}>{Error.message}</span>
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
                  <span className={ErrorAr.status ? 'successAr' : 'errorAr'}>{ErrorAr.message}</span>
                </div>
              </div>
              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Symbol"
                    className="mb-3"
                    onChange={(e) => setSymbol(e.target.value)}
                    value={Symbol}
                    onBlur={() =>
                      Symbol === ""
                        ? setErrorSymbol("Symbol is required")
                        : setErrorSymbol("Symbol is Validated")
                    }
                  >
                    <Form.Control
                      type="text"
                      
                      placeholder="Rate"
                      required
                    />
                  </FloatingLabel>
                  <span className={Symbol === "" ? "error" : "success"}>{ErrorSymbol}</span>
                </div>
              </div>
              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Rate"
                    className="mb-3"
                    onChange={(e) => setRate(e.target.value)}
                    value={Rate}
                    onBlur={() =>
                      Rate === ""
                        ? setErrorRate("Rate is required")
                        : setErrorRate("Rate is Validated")
                    }
                  >
                    <Form.Control
                      type="decimal"
                      // min="0"
                      
                      placeholder="Rate"
                      required
                    />
                  </FloatingLabel>
                  <span className={Rate === "" ? "error" : "success"}>{ErrorRate}</span>
                  {/* <span className="spanForm"> |</span> */}
                </div>
            
                {/* <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="معدل"
                    className="mb-3 floatingInputAr "
                    style={{ direction: "rtl", left: "initial", right: 0 }}
                    onChange={(e) => setRate(e.target.value)}
                    value={Rate}
                  >
                    <Form.Control
                      type="number"
                      placeholder="معدل"
                      style={{ left: "%" }}
                    />
                  </FloatingLabel>
                </div> */}
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
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      value={
                        currencyshortcode.length === 0 ? (
                          <>N/A</>
                        ) : (
                          currencyshortcode[0].maxshortCode
                        )
                      }
                    />
                  </FloatingLabel>
                </div>
              </div> */}
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
              <div className="ButtonSection" style={{ justifyContent: "end" }}>
                <button type="submit" className="SubmitButton" disabled={isLoading}>
                  Add Currency
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Currency;
