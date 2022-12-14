import React,{useState, useEffect} from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate ,useLocation } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import TextInputValidation from '../../utils/TextInputValidation';
import { fetchverdictshortcode } from "../../redux/getShortCode/getverdictshortcode";
import { useSelector ,useDispatch } from "react-redux";

const Verdicts = () => {

    //for errors
    const [Error , setError] =useState("")
    const [ErrorAr , setErrorAr] =useState("")
    
    
    const [NameEn, setNameEn] = useState("");
    const [NameAr, setNameAr] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const {data:verdictshortcode} = useSelector((state) => state.verdictshortcode)
    const dispatch = useDispatch();
  
    const history = useNavigate();
    const { pathname } = useLocation();
  
    const [state1, setState] = useState({
      shortCode: '',
    });
  
    useEffect(() => {
      if (verdictshortcode) {
        setState({
          shortCode: verdictshortcode.length === 0 ? 10 : verdictshortcode[0].maxshortCode + 1,
        });
      } else {
        setState.shortCode('9')
      }
    }, [verdictshortcode]);
  
    useEffect(() => {
      dispatch(fetchverdictshortcode());
    },[dispatch])

    const submit = async (event) => {
        event.preventDefault();
        setisLoading(true)
        try {
          const formData = new FormData();
          formData.append("NameEn", NameEn);
          formData.append("NameAr" , NameAr)
          formData.append("shortCode",state1.shortCode);
    
          await axios.post(`${window.env.API_URL}uploadVerdict`, formData)
          history('/verdictlist')
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
      
  const data1 =  (JSON.stringify(
    TextInputValidation(
      "en",
      NameEn,
      "Verdict Name"
    )
  ));

  console.log(data1,'asdasd')

  const obj = JSON.parse(data1);
  console.log(obj.status,'aszxZ2dasd')
 const data2 =  (JSON.stringify(
    TextInputValidation(
      "ar",
      NameAr,
      "Verdict Name Arabic"
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
        <div className="Headers">Create Verdict</div>
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
        <Form.Control type="text" placeholder="Name" required/>
      </FloatingLabel>
                
                
                <span className="spanForm"> |</span>
                <span className={Error.status ?  "success" : "error" }>{Error.message}</span>
              </div>

              <div className="col-sm">
           
                       <FloatingLabel
        controlId="floatingInput"
        label="??????"
        className="mb-3 floatingInputAr"
onChange={(e) => setNameAr(e.target.value)}
                  name="Name"
                  value={NameAr}
                  style={{ direction: "rtl" }}
               onBlur={() => setErrorAr(objAr)}
             
> 
        <Form.Control type="text" placeholder="??????"   required  />
      </FloatingLabel>
      <span className={ErrorAr.status ?  "successAr" : "errorAr" }>{ErrorAr.message}</span>
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
        <Form.Control type="text" placeholder="Short Code"/>
      </FloatingLabel>
                
                <span className="spanForm"> |</span>
              </div>

              <div className="col-sm">
              <FloatingLabel
        controlId="floatingInput"
        label="?????? ????????"
        className="mb-3 floatingInputAr "
        style={{ direction: "rtl" , left:'initial' , right:0  }}

        
             
> 
        <Form.Control type="text" placeholder="?????? ????????"  style={{left:'%'}}   />
      </FloatingLabel>
              </div>
            </div> */}


            <div className='ButtonSection ' style={{justifyContent:"end"}}>
     

              <button Name='submit' className='SubmitButton' disabled={isLoading}>Add Verdict</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Verdicts