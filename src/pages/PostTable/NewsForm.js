import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import axios from "axios";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add } from "../../redux/postReducer/PostNewsSlice";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextInputValidation from "../../utils/TextInputValidation";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ direction: "rtl" }], // this is rtl support
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const NewsForm = () => {
  //for error
  const [Error, setError] = useState("");
  const [ErrorAr, setErrorAr] = useState("");
  const [ErrorTitle, setErrorTitle] = useState("");
  const [ErrorTitleAr, setErrorTitleAr] = useState("");
  const [descError, setdescError] = useState("");
  const [descErrorAr, setdescErrorAr] = useState("");

  const history = useNavigate();

  const [TitleEn, setTitleEn] = useState("");
  const [TitleAr, setTitleAr] = useState("");
  const [SecondTitleEn, setSecondTitleEn] = useState("");
  const [SecondTitleAr, setSecondTitleAr] = useState("");
  const [DescriptionAr, setDescriptionAr] = useState("");
  const [DescriptionEn, setDescriptionEn] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("TitleEn", TitleEn);
      formData.append("TitleAr", TitleAr + " ");
      formData.append("SecondTitleEn", SecondTitleEn);
      formData.append("SecondTitleAr", SecondTitleAr + " ");
      formData.append("DescriptionAr", DescriptionAr + " ");
      formData.append("DescriptionEn", DescriptionEn);
      const response = await axios.post(
        `${window.env.API_URL}/uploadnews?keyword=&page=`,
        formData
      );
      swal({
        title: "Success!",
        text: "Data has been added Successfully",
        icon: "success",
        button: "OK",
      });
      history("/news");
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
  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const onSelectFile = (e) => {
    setImage(e.target.files[0]);
  };

  const data1 = JSON.stringify(
    TextInputValidation("en", TitleEn, "News Title English")
  );

  const obj = JSON.parse(data1);
  const data2 = JSON.stringify(
    TextInputValidation("ar", TitleAr, "News Title Arabic")
  );
  const objAr = JSON.parse(data2);
  const data3 = JSON.stringify(
    TextInputValidation("en", SecondTitleEn, "News Sub Title English")
  );

  const subtitle = JSON.parse(data3);
  const data4 = JSON.stringify(
    TextInputValidation("ar", SecondTitleAr, "News Sub Title Arabic")
  );
  const subtitleAr = JSON.parse(data4);

  const data5 = JSON.stringify(
    TextInputValidation("en", DescriptionEn, "News Sub Title English")
  );

  const description = JSON.parse(data5);
  const data6 = JSON.stringify(
    TextInputValidation("ar", DescriptionAr, "News Sub Title Arabic")
  );
  const descriptionAr = JSON.parse(data6);

  return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Add News</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row  mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Title"
                      className="mb-3"
                      onChange={(e) => setTitleEn(e.target.value)}
                      value={TitleEn}
                      required
                      onBlur={() => setError(obj)}
                    >
                      <Form.Control type="text" placeholder="Title" />
                    </FloatingLabel>
                    <span className="spanForm"> |</span>
                    <span className="error">{Error.message}</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="عنوان"
                      className="mb-3 floatingInputAr"
                      onChange={(e) => setTitleAr(e.target.value)}
                      name="Name"
                      value={TitleAr}
                      style={{ direction: "rtl" }}
                      onBlur={() => setErrorAr(objAr)}
                    >
                      <Form.Control type="text" placeholder="عنوان" required />
                    </FloatingLabel>
                    <span className="errorAr">{ErrorAr.message}</span>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Sub-Title"
                      className="mb-3"
                      onChange={(e) => setSecondTitleEn(e.target.value)}
                      value={SecondTitleEn}
                      onBlur={() => setErrorTitle(subtitle)}
                    >
                      <Form.Control
                        type="text"
                        placeholder="Sub-Title"
                        required
                      />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                    <span className="error">{ErrorTitle.message}</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="العنوان الفرعي        "
                      className="mb-3 floatingInputAr"
                      onChange={(e) => setSecondTitleAr(e.target.value)}
                      name="Name"
                      value={SecondTitleAr}
                      style={{ direction: "rtl" }}
                      onBlur={() => setErrorTitleAr(subtitleAr)}
                    >
                      <Form.Control type="text" placeholder="عنوان" required />
                    </FloatingLabel>
                    <span className="errorAr">{ErrorTitleAr.message}</span>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-sm">
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      formats={formats}
                      value={DescriptionEn}  
                      onChange={setDescriptionEn}
                      onBlur={() => setdescError(description)}
             
             />
             <span>{descError.message}</span>
                  </div>
                  <div className="col-sm">
                    <ReactQuill
                      theme="snow"
                      className="QuillAr"
                      modules={modules}
                      formats={formats}
                      value={DescriptionAr}
                      onChange={setDescriptionAr}
                    />
                  </div>
                </div>

                <div className="ButtonSection">
                  <div>
                    <label className="Multipleownerlabel">Select Image</label>
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
                    Add News
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsForm;
