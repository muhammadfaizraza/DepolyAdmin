
import React,{useState} from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';  

const Racenameform = () => {
    const [NameEn, setNameEn] = useState("");
    const [NameAr, setNameAr] = useState("");
    const [shortCode,setshortCode]= useState("") 
  
  const history =useNavigate()
  const {pathname} = useLocation();

  
  
    const submit = async (event) => {
      event.preventDefault();
      try {
        const formData = new FormData();
        formData.append("NameEn", NameEn);
        formData.append("NameAr" , NameAr)
        formData.append("shortCode",shortCode);
  
        await axios.post(`http://3.90.189.40:4000/api/v1/uploadRaceName`, formData)
        swal({
          title: "Success!",
          text: "Data has been added successfully ",
          icon: "success",
          button: "OK",
        });
        if(pathname === '/racenameform'){
          history('/racename')
        }
       
      } catch (error) {
        const err = error.message;
        swal({
          title: "Error!",
          text: err,
          icon: "error",
          button: "OK",
        });
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
        <Form.Control type="text" placeholder="اسم"  style={{left:'%'}}   />
      </FloatingLabel>
              </div>
            </div>


            <div className='ButtonSection ' style={{justifyContent:"end"}}>
     

              <button Name='submit' className='SubmitButton'>Add Race Name</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Racenameform