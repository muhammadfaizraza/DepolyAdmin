import React,{useState} from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Currency = () => {
  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
const [shortCode,setshortCode]= useState("");
const [Rate,setRate]= useState("");

const history = useNavigate()

  const submit = async (event) => {

    event.preventDefault();
    try {
      const formData = new FormData();
     
      formData.append("NameEn", NameEn);
      formData.append("NameAr" , NameAr)
      formData.append("shortCode",shortCode);
      formData.append("Rate",Rate)
      await axios.post(`${window.env.API_URL}uploadCurrency`,formData);
      history('/currencylist')
      swal({
        title: "Success!",
        text: "Data has been added successfully ",
        icon: "success",
        button: "OK",
      });

    
    } catch (error) {
      alert(error.message);
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
> 
        <Form.Control type="text" placeholder="Name" />
      </FloatingLabel>
                
                
                <span className="spanForm"> |</span>
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
               
             
> 
        <Form.Control type="text" placeholder="اسم"     />
      </FloatingLabel>
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
        <Form.Control type="text" placeholder="Short Code"/>
      </FloatingLabel>
                
                <span className="spanForm"> |</span>
              </div>

              <div className="col-sm">
              <FloatingLabel
        controlId="floatingInput"
        label="رمز قصير"
        className="mb-3 floatingInputAr "
        style={{ direction: "rtl" , left:'initial' , right:0  }}

        
             
> 
        <Form.Control type="text" placeholder="رمز قصير"  style={{left:'%'}}   />
      </FloatingLabel>
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
      
> 
        <Form.Control type="number" placeholder="Rate" />
      </FloatingLabel>
                
                
                
                <span className="spanForm"> |</span>
              </div>

              <div className="col-sm">
              <FloatingLabel
        controlId="floatingInput"
        label="معدل"
        className="mb-3 floatingInputAr "
        style={{ direction: "rtl" , left:'initial' , right:0  }}

        
             
> 
        <Form.Control type="number" placeholder="معدل"  style={{left:'%'}}   />
      </FloatingLabel>
              </div>
            </div>


            <div className='ButtonSection' style={{justifyContent:"end"}}>
     

              <button type='submit' className='SubmitButton'>Add Currency</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Currency