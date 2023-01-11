import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import swal from "sweetalert";



const BreederUploadPopup = () => {
  const [File, setFile] = useState("");
  const [FileContent1, setFileContent] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const [state1, setState1] = useState({
    fileName: '',
    fileContent: []
  })
  const onSelectFile = (e) => {
    setFileContent(e.target.files[0])
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setState1({
        fileName: file.name, fileContent: reader.result
      });
      reader.onerror = () => {
        console.log('reader onerror', reader.error)
      }
    }
  };

  const UploadCSV = async (event) => {
    event.preventDefault();
    setisLoading(true);
    try {
      const formData = new FormData();
    formData.append("file", FileContent1);
    const res = await axios.post(
      `${window.env.API_URL}/BreederMassUpload`,
      formData
    );
    setisLoading(false);

    } catch (error) {
      const err = error.response.data.message[0].errors.errors[0].message;
      // const err1 = error.response.data.message[1].errors.errors[1].message
      // const err2 = error.response.data.message[2].errors.errors[2].message
      // const err3 = error.response.data.message[3].errors.errors[3].message

      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
    }
    setisLoading(false);

      };
  
  // const buffer = Buffer.from('Change me to buffer');

  // console.log(buffer,'File buffer 2');


  // console.log(state1.fileContent.length,'File data 2');
  // console.log(data1.length,'File data 3');

  // let fileContentData = state1.fileContent.NameEn;
  // console.log(state1.fileContent[0].createdAt,'fileContentData ');

  return (
    <>
      <div className="form">
        <div>
          <input type="file" onChange={onSelectFile} />
          <button onClick={UploadCSV} className="modalClosebtn UploadCSV1" disabled={isLoading}>
            Upload JSON
          </button>

          <p>{state1.fileContent === undefined ? <>N/A</>:<>
          
         { state1.fileContent}
          </>}</p>

         
        </div>
      </div>
    </>
  );
};
export default BreederUploadPopup;
