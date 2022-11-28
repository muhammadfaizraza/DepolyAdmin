import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import axios from "axios";
import { fetchSingleSlider } from "../../redux/getReducer/getSingleSlider";

const SliderForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { state } = useLocation();

  const { sliderid } = state;
  const { data: singleSlider } = useSelector((state) => state.singleSlider);

  const [state1, setState] = useState({
    TitleEn: "",
    TitleAr: "",
  });
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("TitleEn", state1.TitleEn);
      formData.append("TitleAr", state1.TitleAr);
      const response = await axios.put(
        `http://3.90.189.40:4000/api/v1/updateSlider/${sliderid}`,
        formData
      );
      history("/slider");
      swal({
        title: "Success!",
        text: "Data has been added successfully ",
        icon: "success",
        button: "OK",
      });
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    dispatch(fetchSingleSlider({ sliderid }));
  }, []);

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
  useEffect(() => {
    if (singleSlider) {
      setState({
        TitleEn: singleSlider.TitleEn,
        TitleAr: singleSlider.TitleAr,
      });
    } else {
      dispatch(fetchSingleSlider({ sliderid }));
    }
  }, [singleSlider]);

  const onSelectFile = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Edit Slider</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row  mainrow">
                  <div className="col-sm">
                    <input
                      type="text"
                      name="TitleEn"
                      id="TitleEn"
                      className="group__control"
                      placeholder="Title"
                      value={state1.TitleEn}
                      onChange={(e) =>
                        setState({ ...state1, TitleEn: e.target.value })
                      }
                    />
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      type="text"
                      name="TitleAr"
                      id="TitleAr"
                      className="group__control"
                      value={state1.TitleAr}
                      onChange={(e) =>
                        setState({ ...state1, TitleAr: e.target.value })
                      }
                      placeholder="اسم "
                    ></input>
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
                      <img src={preview} className="PreviewImage" alt="" />
                    )}
                  </div>

                  <button
                    type="submit"
                    onClick={submit}
                    className="SubmitButton"
                  >
                    Update
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

export default SliderForm;
