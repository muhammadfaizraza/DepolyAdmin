import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import swal from "sweetalert";

const BreederUploadPopup = () => {
  const [File, setFile] = useState("");
  const onSelectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const UploadCSV = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", File);
    const res = await axios.post(
      `${window.env.API_URL}/BreederMassUpload`,
      formData
    );
  };

  // useEffect(() => {
  //   if (!File.name.match(/\.(json)$/)) {
  //     setFile("")
  //     document.getElementById("file").value = "";
  //     swal({
  //       title: "Error!",
  //       text: "Enter JSON Image",
  //       icon: "error",
  //       button: "OK",
  //     });
  //   }
  // },[])

  return (
    <>
      <div className="form">
        <div>
          <input type="file" onChange={onSelectFile} />
          <button onClick={UploadCSV} className="modalClosebtn UploadCSV1">
            Upload JSON
          </button>
          {/* <button onClick={UploadCSV} className="ButtonSection">Upload CSV</button> */}
        </div>
      </div>
    </>
  );
};
export default BreederUploadPopup;
