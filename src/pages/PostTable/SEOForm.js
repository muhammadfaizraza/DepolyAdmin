import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate , useLocation } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import TextInputValidation from "../../utils/TextInputValidation";

const Breeder = () => {
   //for error
   const [Error, setError] = useState("")
   const [ErrorAr, setErrorAr] = useState("")
   const [ErrorTitle, setErrorTitle] = useState("")
   const [ErrorTitleAr, setErrorTitleAr] = useState("")
   const [isLoading, setisLoading] = useState(false);

  const [KeyWord, setKeyWord] = useState("");
  const [KeyWordAr, setKeyWordAr] = useState("");
  const [TitleEn, setTitleEn] = useState("");
  const [TitleAr, setTitleAr] = useState("");

  const history = useNavigate();
  const { pathname } = useLocation();

  const submit = async (event) => {
    event.preventDefault();
    setisLoading(true)
    try {
      const formData = new FormData();

      formData.append("KeywordAr", KeyWordAr);
      formData.append("KeywordEn", KeyWord);
      formData.append("TitleEn", TitleEn );
      formData.append("TitleAr", TitleAr);

      await axios.post(`${window.env.API_URL}/uploadSeoKeyword`, formData);
      if(pathname === '/seoform'){
        history("/seolisting");
      }
      swal({
        title: "Success!",
        text: "Data has been added successfully ",
        icon: "success",
        button: "OK",
      });
      setisLoading(false)
    } catch (error) {
      const err = error.response.data.message;
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
      setisLoading(false)
    }
  };
//function for errors
 
  const data1 = JSON.stringify(
    TextInputValidation("en", KeyWord, "SEO Keyword English")
  );
  const keyword = JSON.parse(data1);

  const data2 = JSON.stringify(
    TextInputValidation("ar", KeyWordAr, "SEO Keyword Arabic")
  );

  const KeyWordar = JSON.parse(data2);
  const data3 = JSON.stringify(
    TextInputValidation("en", TitleEn, "SEO Title English ")
  );
  const title = JSON.parse(data3)
  const data4 = JSON.stringify(
    TextInputValidation("ar", TitleAr, "SEO Title Arabic")
  );

  const titlear =JSON.parse(data4);
console.log(Error , "done")
  return (
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Create SEO</div>
          <div className="form">
            <form onSubmit={submit}>
              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Keyword"
                    className="mb-3"
                    onChange={(e) => setKeyWord(e.target.value)}
                    name="Name"
                    value={KeyWord}
                    onBlur={() => setError(keyword)}
                  >
                    <Form.Control type="text" placeholder="Name" />
                  </FloatingLabel>

                  <span className="spanForm"> |</span>
                <span  className={Error.status ? 'success' : 'error'}>{Error.message}</span>
                </div>

                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="???????????? ????????????????"
                    className="mb-3 floatingInputAr"
                    onChange={(e) => setKeyWordAr(e.target.value)}
                    name="Name"
                    value={KeyWordAr}
                    style={{ direction: "rtl" }}
                    onBlur={() => setErrorAr(KeyWordar)}
                  >
                    <Form.Control type="text" placeholder="??????" />
                  </FloatingLabel>
               <span  className={ErrorAr.status ? 'successAr' : 'errorAr'}>{ErrorAr.message}</span>
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
                    <Form.Control type="text" placeholder="Short Code" />
                  </FloatingLabel>

                  <span className="spanForm"> |</span>
                </div>

                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="?????? ????????"
                    className="mb-3 floatingInputAr "
                    style={{ direction: "rtl", left: "initial", right: 0 }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="?????? ????????"
                      style={{ left: "%" }}
                    />
                  </FloatingLabel>
                </div>
              </div> */}

              <div className="row mainrow">
                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Title"
                    className="mb-3"
                    onChange={(e) => setTitleEn(e.target.value)}
                    value={TitleEn}
                    onBlur={() => setErrorTitle(title)}
                  >
                    <Form.Control type="text" placeholder="Description" />
                  </FloatingLabel>
                  <span className="spanForm"> |</span>
              <span className={ErrorTitle.status ? 'success' : 'error'}>{ErrorTitle.message}</span>
                </div>

                <div className="col-sm">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="??????????"
                    className="mb-3 floatingInputAr"
                    onChange={(e) => setTitleAr(e.target.value)}
                    value={TitleAr}
                    style={{ direction: "rtl" }}
                    onBlur={() => setErrorTitleAr(titlear)}
                  >
                    <Form.Control type="text" placeholder="??????????" />
                  </FloatingLabel>
                  <span className={ErrorTitleAr.status ? 'successAr' : 'errorAr'}>{ErrorTitleAr.message}</span>
                </div>
              </div>
              <div className="ButtonSection " style={{ justifyContent: "end" }}>
                <button Name="submit" className="SubmitButton" disabled={isLoading}>
                  Add SEO
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
