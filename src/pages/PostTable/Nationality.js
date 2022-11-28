import React, { useState ,useEffect} from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const Nationality = () => {
  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [shortCode, setshortCode] = useState("");
  const [Abbrev, setAbbrev] = useState("");
  const [AltName, setAltName] = useState("");
  const [Label, setLabel] = useState("");
const [Offset,setOffset] = useState("");
const [Value , setValue] =useState("");
const [image, setImage] = useState();
const [preview,setPreview] = useState()

const history = useNavigate()
  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("NameEn", NameEn);
      formData.append("NameAr", NameAr)
      formData.append("shortCode", shortCode);
      formData.append("Abbrev", Abbrev);
      formData.append("AltName", AltName);
      formData.append("Label", Label);
      formData.append("Offset",Offset);
      formData.append("Value" ,Value);
      formData.append("image" ,image);
      await axios.post(`http://3.90.189.40:4000/api/v1/uploadNationality`,formData);
    history("/nationalitylist")
      swal({
        title: "Success!",
        text: "Data has been added successfully ",
        icon: "success",
        button: "OK",
      });


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
  useEffect(() => {
    if (!image) {
      setPreview(undefined)
      return
  }
    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
}, [image])

const onSelectFile = e => {
    setImage(e.target.files[0])
  }
  return (
    <div className="page">

      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Add Nationality</div>
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
        label="Write Abbreviation"
        className="mb-3"
        onChange={(e) => setAbbrev(e.target.value)}
        value={Abbrev}
                 
               
             
> 
        <Form.Control type="text" placeholder="Write Abbreviation"/>
      </FloatingLabel>
                  
                  <span className="spanForm"> |</span>
                </div>

                <div className="col-sm">
                <FloatingLabel
        controlId="floatingInput"
        label="اكتب الاختصار"
        className="mb-3 floatingInputAr "
        style={{ direction: "rtl" , left:'initial' , right:0  }}

        
             
> 
        <Form.Control type="text" placeholder="اكتب الاختصار"  style={{left:'%'}}   />
      </FloatingLabel>
                </div>
              </div>

              <div className="row mainrow">
                <div className="col-sm">
                
                  
                  <FloatingLabel
        controlId="floatingInput"
        label="Write Alternative Name"
        className="mb-3"
        onChange={(e) => setAltName(e.target.value)}
        value={AltName}
                 
               
             
> 
        <Form.Control type="text" placeholder="Write Alternative Name"/>
      </FloatingLabel>
                  
                  <span className="spanForm"> |</span>
                </div>

                <div className="col-sm">
               
                    <FloatingLabel
        controlId="floatingInput"
        label="اكتب الاسم البديل"
        className="mb-3 floatingInputAr "
        style={{ direction: "rtl" , left:'initial' , right:0  }}

        
             
> 
        <Form.Control type="text" placeholder="اكتب الاسم البديل"  style={{left:'%'}}   />
      </FloatingLabel>
                </div>
              </div>



              <div className="row mainrow">
                <div className="col-sm">
           
               
                         
                         <FloatingLabel
        controlId="floatingInput"
        label="Label"
        className="mb-3"
        onChange={(e) => setLabel(e.target.value)}
        value={Label}
                 
               
             
> 
        <Form.Control type="text" placeholder="Label"/>
      </FloatingLabel>   <span className="spanForm"> |</span>
                </div>

                <div className="col-sm">
                  <FloatingLabel
        controlId="floatingInput"
        label="مُلصَق"
        className="mb-3 floatingInputAr "
        style={{ direction: "rtl" , left:'initial' , right:0  }}

        
             
> 
        <Form.Control type="text" placeholder="مُلصَق"  style={{left:'%'}}   />
      </FloatingLabel>
                </div>
              </div>


              <div className="row mainrow">
                <div className="col-sm">
                
                  
                  
                       
                  <FloatingLabel
        controlId="floatingInput"
        label="Off Set"
        className="mb-3"
        onChange={(e) => setOffset(e.target.value)}
        value={Offset}
        type="number"
               
             
> 
        <Form.Control type="number" placeholder="Off Set"/>
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


              <div className="row mainrow">
                <div className="col-sm">
        
                  
                  
                     
                  <FloatingLabel
        controlId="floatingInput"
        label="Value"
        className="mb-3"
        onChange={(e) => setValue(e.target.value)}
        value={Value}
     
               
             
> 
        <Form.Control type="text" placeholder="Value"/>
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
        <Form.Control type="text" placeholder="معدل"  style={{left:'%'}}   />
      </FloatingLabel>
                </div>
              </div>

            

              <div className='ButtonSection'>
<div>
              <input type='file' onChange={onSelectFile} className="formInput"/>
            {image &&  <img src={preview}  className="PreviewImage" alt=""/> }
        </div>
                <button type='submit' className='SubmitButton'>Add Nationality</button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nationality;