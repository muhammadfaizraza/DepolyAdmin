import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import TextInputValidation from "../../utils/TextInputValidation";
import { fetchbreedershortcode } from "../../redux/getShortCode/getbreedershortcode";
import { useSelector ,useDispatch } from "react-redux";
import { ImCross } from 'react-icons/im';

const Breeder = () => {
  //for error
  const {data:breedershortcode} = useSelector((state) => state.breedershortcode)


  const dispatch = useDispatch();
  const [Error, setError] = useState("");
  const [ErrorAr, setErrorAr] = useState("");
  const [ErrorDesc, setErrorDesc] = useState("");
  const [ErrorDescAr, setErrorDescAr] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [DescriptionAr, setDescriptionAr] = useState("");
  const [DescriptionEn, setDescriptionEn] = useState("");
  const [image, setImage] = useState();
  const [shortCode, setshortCode] = useState("");

  console.log(breedershortcode,'breedershortcode')
  const [state1, setState] = useState({
		shortCode: '',
	});
  useEffect(() => {
		if (breedershortcode) {
			setState({
        shortCode: breedershortcode.length === 0 ? 10 : breedershortcode[0].maxshortCode + 1,
			});
		} else {
		}
	}, [breedershortcode]);
  const [preview, setPreview] = useState();
  const history = useNavigate();
  const { pathname } = useLocation();

  const submit = async (event) => {
    event.preventDefault();
    setisLoading(true)
    
    try {
      const formData = new FormData();

      formData.append("NameAr", NameAr);
      formData.append("NameEn", NameEn);
      formData.append("shortCode", state1.shortCode);
      formData.append("DescriptionAr", DescriptionAr);
      formData.append("DescriptionEn", DescriptionEn);
      formData.append("image", image);

      await axios.post(`${window.env.API_URL}/uploadBreeder`, formData);
      if (pathname === "/breeder") {
        history("/breederlist");
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
  const onSelectFile = (e) => {
    setImage(e.target.files[0]);
  };
  // console.log(breedershortcode[0].maxshortCode,'breedershortcode')
  useEffect(() => {
    dispatch(fetchbreedershortcode());

  },[dispatch])
  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image,dispatch]);


  const handlePreview = () => {
    setImage()
  document.getElementById("file").value=" "
  };

  const Name = JSON.stringify(
    TextInputValidation("en", NameEn, "Breeder English Name")
  );
  const obj = JSON.parse(Name);
  console.log(obj.status, "aszxZ2dasd");
  const arName = JSON.stringify(
    TextInputValidation("ar", NameAr, " Breeder Name Arabic")
  );

  const objAr = JSON.parse(arName);

  const Description = JSON.stringify(
    TextInputValidation("en", DescriptionEn, "Breeder English Description")
  );
  const Desc = JSON.parse(Description);

  const arDescription = JSON.stringify(
    TextInputValidation("ar", DescriptionAr, "Breeder Arabic Description")
  );

  const DescAr = JSON.parse(arDescription);

  const styles = {
    popup: {
      color: Error.status === true ? "green" : "red",
    },
  };
  const stylesAr = {
    popupAr: {
      color: ErrorAr.status === true ? "green" : "red",
    },
  };

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
                    onBlur={() => setError(obj)}
                  >
                    <Form.Control type="text" placeholder="Name" />
                  </FloatingLabel>

                  <span className="spanForm"> |</span>
                  <span className={Error.status ? 'success' : 'error'} >
                    {Error.message}
                  </span>
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
                    <Form.Control
                      type="text"
                      placeholder="اسم"
                      onBlur={() => setErrorAr(objAr)}
                    />
                  </FloatingLabel>
                  <span className={ErrorAr.status ? 'successAr' : 'errorAr'}>
                    {ErrorAr.message}
                  </span>
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
                    onBlur={() => setErrorDesc(Desc)}
                  >
                    <Form.Control type="text" placeholder="Description" />
                  </FloatingLabel>
                  <span className="spanForm"> |</span>
                  <span className={ErrorDesc.status ? 'success' : 'error'} >
                    {ErrorDesc.message}
                  </span>
                </div>

                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="وصف"
                    className="mb-3 floatingInputAr"
                    onChange={(e) => setDescriptionAr(e.target.value)}
                    value={DescriptionAr}
                    style={{ direction: "rtl" }}
                    onBlur={() => setErrorDescAr(DescAr)}
                  >
                    <Form.Control type="text" placeholder="وصف" />
                  </FloatingLabel>
                  <span className={ErrorDescAr.status ? 'successAr' : 'errorAr'} >
                    {ErrorDescAr.message}
                  </span>
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

             
              
              <div className="ButtonSection">
                <div>
                  <label className="Multipleownerlabel">
                    Select Breeder image
                  </label>
                  <input
                    type="file"
                    onChange={onSelectFile}
                    className="formInput"
                    id="file"
                  />
                  {image && (
                      <>
                       <ImCross onClick={handlePreview} className="crossIcon"/>
                       <img src={preview} className="PreviewImage" alt="" />
                      </>
                    )}
                </div>

                <button type="submit" className="SubmitButton" disabled={isLoading}>
                  Add Breeder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breeder;
