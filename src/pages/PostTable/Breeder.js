import React,{useState ,useEffect} from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const Breeder = () => {
  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [shortCode,setshortCode]= useState("")
  const [DescriptionAr, setDescriptionAr] = useState("");
  const [DescriptionEn, setDescriptionEn] = useState("");
  const [image, setImage] = useState()
  const [preview, setPreview] = useState();
const history = useNavigate()

  const submit = async (event) => {

    event.preventDefault();
    try {
      const formData = new FormData();
 
      formData.append("NameAr",NameAr)
      formData.append("NameEn", NameEn);
      formData.append("shortCode",shortCode);
      formData.append("DescriptionAr", DescriptionAr);
      formData.append("DescriptionEn", DescriptionEn);
      formData.append("image", image);

      await axios.post(`http://3.90.189.40:4000/api/v1/uploadBreeder`, formData)

      history('/breederlist')
      swal({
        title: "Success!",
        text: "Data has been added successfully ",
        icon: "success",
        button: "OK",
      });

    
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
  const onSelectFile = (e) => {
    setImage(e.target.files[0]);
  };
  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);
  return (
    <div className="page">
   
    <div className="rightsidedata">
      <div
        style={{
          marginTop: "30px",
        }}
      >
        <div className="Headers">Create Breeder</div>
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
        label="Description"
        className="mb-3"
        onChange={(e) => setDescriptionEn(e.target.value)}
      value={DescriptionEn}
                 
               
             
> 
        <Form.Control type="text" placeholder="Description"/>
      </FloatingLabel>
      <span className="spanForm"> |</span>

              </div>

              <div className="col-sm">
                


<FloatingLabel
        controlId="floatingInput"
        label="وصف"
        className="mb-3 floatingInputAr"
        onChange={(e) => setDescriptionAr(e.target.value)}
        value={DescriptionAr}
                  style={{ direction: "rtl" }}
               
             
> 
        <Form.Control type="text" placeholder="وصف"     />
      </FloatingLabel>


              </div>
            </div>
            <div className="ButtonSection">
                  <div>
                    <input
                      type="file"
                      onChange={onSelectFile}
                      className="formInput"
                    />
                    {image && (
                      <img src={preview} alt="" className="PreviewImage" />
                    )}
                  </div>

                  <button type="submit" className="SubmitButton">
                    Add Breeder
                  </button>
                </div>
            
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Breeder;