import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import swal from "sweetalert";
import { ImCross } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";


const BreederUploadPopup = () => {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [isLoading, setisLoading] = useState(false);


  const { state } = useLocation();
  const { Raceresult } = state;

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handlePreview = () => {
    setImage();
    document.getElementById("file").value = "";
  };

  const onSelectFile = (e) => {
    setImage(e.target.files[0]);
  };


  const UploadImage = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post(
      `${window.env.API_URL}/AddRaceImage/${Raceresult}`,
      formData
    );
  };

  return (
    <>
      <div className="form">
        <div>
        <div className="ButtonSection">
                  <div>
                    <label className="Multipleownerlabel">
                      Select Result Image
                    </label>
                    <input
                      type="file"
                      onChange={onSelectFile}
                      className="formInput"
                      id="file"
                    />
                    {image && (
                      <>
                        <ImCross
                          onClick={handlePreview}
                          className="crossIcon"
                        />
                        <img src={preview} className="PreviewImage" alt="" />
                      </>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="SubmitButton"
                    disabled={isLoading}
                    onClick={UploadImage}
                  >
                    Create Ads
                  </button>
                </div>
        </div>
      </div>
    </>
  );
};
export default BreederUploadPopup;
