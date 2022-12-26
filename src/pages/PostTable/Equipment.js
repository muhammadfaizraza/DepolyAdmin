import React, { useState,useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import TextInputValidation from "../../utils/TextInputValidation";
import { fetchequipmentshortcode } from "../../redux/getShortCode/getequipmentshortcode";
import { useSelector ,useDispatch } from "react-redux";


const Equipment = () => {
  //for error
  const [Error, setError] = useState("");
  const [ErrorAr, setErrorAr] = useState("");
  const dispatch = useDispatch();
  const {data:equipmentshortcode} = useSelector((state) => state.equipmentshortcode)

  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [shortCode, setshortCode] = useState("");

  const [isLoading, setisLoading] = useState(false);



  const history = useNavigate();
  const { pathname } = useLocation();
 useEffect(() => {
    dispatch(fetchequipmentshortcode());
  },[dispatch])

  const [state1, setState] = useState({
		shortCode: '',
	});

  useEffect(() => {
		if (equipmentshortcode) {
			setState({
        shortCode: equipmentshortcode.length === 0 ? 9 : equipmentshortcode[0].maxshortCode + 1,
			});
		} else {
      setState.shortCode('9')
		}
	}, [equipmentshortcode]);


  const submit = async (event) => {
    event.preventDefault();
    setisLoading(true)
    try {
      const formData = new FormData();

      formData.append("NameAr", NameAr);
      formData.append("NameEn", NameEn);
      formData.append("shortCode",state1.shortCode);

      await axios.post(`${window.env.API_URL}/uploadEquipment`, formData);
      if (pathname === "/equipment") {
        history("/equipmentlist");
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
    TextInputValidation("en", NameEn, "Equipment English Name ")
  );
  const obj = JSON.parse(data1);
  
  const data2 = JSON.stringify(
    TextInputValidation("ar", NameAr, "Equipment Arabic Name ")
  );
  const objAr = JSON.parse(data2);

  return (
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Create Equipment</div>
          <div className="form">
            <Form onSubmit={submit}>
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
                  <span className={Error.status ? 'success' : 'error'} >{Error.message}</span>
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
                  Add Equipment
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipment;
