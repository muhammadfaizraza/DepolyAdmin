import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";


const OwnerColor = () => {

  const { state } = useLocation();
  const { OwnerId } = state;
  const [selectedImages, setSelectedImages] = useState([]);
  const [OwnerSlik, setOwnerSlik] = useState([]);

  const [isLoading, setisLoading] = useState(false);
  const history = useNavigate();

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
      
    });
    setOwnerSlik(event.target.files[0]);
    
    // setsetOwnerSlik(imagesArray)

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    event.target.value = "";
  };

  const UploadSilkColor = async (event) => {
    event.preventDefault();

    setisLoading(true);
    try {
      const formData = new FormData();
      // selectedImages.forEach((image) => {
      //   formData.append("image", image);
      // });
      formData.append("image",OwnerSlik);
      await axios.post(`${window.env.API_URL}/AddOwnerSilkColor/${OwnerId}`, formData);
      setisLoading(false);
      swal({
        title: "Success!",
        text: "Data has been added Successfully",
        icon: "success",
        button: "OK",
      });
      history("/ownerCap", {
        state: {
          OwnerId: OwnerId,
        },
      });
      setisLoading(false);
    } catch (error) {
      const err = error.response.data.message;
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
      setisLoading(false);
    }
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  function skipdata(){
    history("/ownerCap")
  }

  //   const createServiceImagesChange = (e) => {
  //   const files = Array.from(e.target.files);

  //   setImages([]);
  //   setImagesPreview([]);
  //   setOldImages([]);

  //   files.forEach((file) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setImagesPreview((old) => [...old, reader.result]);
  //         setImages((old) => [...old, reader.result]);
  //       }
  //     };
  //     console.log(file);
  //     reader.readAsDataURL(file);
  //   });
  // };
  return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Upload Silk Color</div>
            <section className="addsectionimage">
              <label className="AddImages1">
                + Add Images
                <br />
                <span>up to 10 images</span>
                <input
                  type="file"
                  name="images"
                  onChange={onSelectFile}
                  multiple
                  accept="image/png , image/jpeg, image/webp"
                />
              </label>
              <br />

              {selectedImages.length > 0 &&
                (selectedImages.length > 10 ? (
                  <p className="error11">
                    You can't upload more than 10 images! <br />
                    <span>
                      please delete <b> {selectedImages.length - 10} </b> of
                      them{" "}
                    </span>
                  </p>
                ) : (
                  <button
                    className="upload-btn111"
                    onClick={UploadSilkColor}
                    disabled={isLoading}
                  >
                    UPLOAD {selectedImages.length} IMAGE
                    {selectedImages.length === 1 ? "" : "S"}
                  </button>
                ))}

              <div className="images111">
                {selectedImages &&
                  selectedImages.map((image, index) => {
                    return (
                      <div key={image} className="image111">
                        <img src={image} height="200" alt="upload" />
                        <button onClick={() => deleteHandler(image)}>
                          delete image
                        </button>
                        <p>{index + 1}</p>
                      </div>
                    );
                  })}
              </div>
            </section>
          </div>
          <button className="skipbutton" onClick={skipdata}>
          Skip
        </button>
        </div>
        
      </div>
     
    </>
  );
};

export default OwnerColor;
