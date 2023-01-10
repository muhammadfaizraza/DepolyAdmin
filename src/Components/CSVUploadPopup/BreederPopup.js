import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import swal from "sweetalert";


const data1 = [
  {
      "id":"1",
      "clubname":"Abu Dhabi Club",
      "owner":"Al Bithnah"
  },
  {
    "id":"2",
    "clubname":"Abu Dhabi Club",
    "owner":"Al Bithnah"
}
  
]
const BreederUploadPopup = () => {
  const [File, setFile] = useState("");
  const [FileContent1, setFileContent] = useState([]);

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
    const formData = new FormData();
    formData.append("file", FileContent1);
    const res = await axios.post(
      `${window.env.API_URL}/BreederMassUpload`,
      formData
    );
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
          <button onClick={UploadCSV} className="modalClosebtn UploadCSV1">
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
