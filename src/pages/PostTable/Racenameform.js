import React, { useState, useEffect } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import TextInputValidation from '../../utils/TextInputValidation';
import { fetchracenameshortcode } from "../../redux/getShortCode/getracenameshortcode";
import { useSelector ,useDispatch } from "react-redux";

const Racenameform = () => {
  //for errors
  const [Error, setError] = useState("");
  const [ErrorAr, setErrorAr] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [shortCode, setshortCode] = useState("")

  const {data:racenameshortcode} = useSelector((state) => state.racenameshortcode)
  const dispatch = useDispatch();

  const history = useNavigate();
  const { pathname } = useLocation();

  const [state1, setState] = useState({
		shortCode: '',
	});

  useEffect(() => {
		if (racenameshortcode) {
			setState({
        shortCode: racenameshortcode.length === 0 ? 10 : racenameshortcode[0].maxshortCode + 1,
			});
		} else {
      setState.shortCode('9')
		}
	}, [racenameshortcode]);

  useEffect(() => {
    dispatch(fetchracenameshortcode());
  },[dispatch])



  const submit = async (event) => {
    event.preventDefault();
    setisLoading(true)
    try {
      const formData = new FormData();
      formData.append("NameEn", NameEn);
      formData.append("NameAr", NameAr)
      formData.append("shortCode",state1.shortCode);
      await axios.post(`${window.env.API_URL}/uploadRaceName`, formData)
      swal({
        title: "Success!",
        text: "Data has been added successfully",
        icon: "success",
        button: "OK",
      });
      if (pathname === '/racenameform') {
        history('/racename')
      }
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



  const data1 = (JSON.stringify(
    TextInputValidation(
      "en",
      NameEn,
      "Race Name English"
    )
  ));

  const obj = JSON.parse(data1);
  const data2 = (JSON.stringify(
    TextInputValidation(
      "ar",
      NameAr,
      "Race Name Arabic"
    )
  ));
  const objAr = JSON.parse(data2);
  return (
    <div className="page">

      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Create Race Name</div>
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
                  <span className={Error.status ? "success": "error" }>{Error.message}</span>
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
                  <span className={ErrorAr.status ? "successAr": "errorAr" }>{ErrorAr.message}</span>
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

              <div className='ButtonSection ' style={{ justifyContent: "end" }}>


                <button Name='submit' className='SubmitButton' disabled={isLoading}>Add Race Name</button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Racenameform