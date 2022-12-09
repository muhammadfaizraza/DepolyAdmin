import React, { Fragment, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate , useLocation } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";


const Color = () => {
  const [registeration, setregisteration] = useState({
    NameEn: '',
    NameAr: '',
 })
 const [records, setrecords] = useState('')

 const handleChange = (e) => {
  const name = e.target.name
  const value = e.target.value
  setregisteration({ ...registeration, [name]: value })
  if(e.target.value === ''){
    setrecords('Enter VALUE',e.target.name)
  }
  else{
    setrecords('')
  }
}

console.log(registeration.NameAr)

const submit = async (event) => {

  event.preventDefault();
  try {
    const formData = new FormData();
    formData.append("NameEn", registeration.NameEn);
    formData.append("NameAr", registeration.NameAr + ' ');
    // formData.append("shortCode", shortCode);

    await axios.post(`${window.env.API_URL}/uploadColor`, formData);
    swal({
      title: "Success!",
      text: "Data has been added Successfully ",
      icon: "success",
      button: "OK",
    });
    if(pathname === '/gender'){
      history("/genderlist");
    }
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
                    <Form.Control   required  onChange={handleChange} value={registeration.NameEn} name="NameEn" type="text" placeholder="Name" />
                  </FloatingLabel>

                  <span className="spanForm"> |</span>
                </div>
                
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="اسم"
                    className="mb-3 floatingInputAr"
                  
                    name="Name"
                   
                    style={{ direction: "rtl" }}
                  >
                    <Form.Control name="NameAr"   onChange={handleChange}  value={registeration.NameAr} type="text" placeholder="اسم" required/>
                  </FloatingLabel>
                </div>
              </div>

          

              <div className="ButtonSection " style={{ justifyContent: "end" }}>
                <button Name="submit" className="SubmitButton">
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
