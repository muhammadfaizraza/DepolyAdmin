import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import Select from "react-select";
import DatePicker from "react-date-picker";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { fetchnationality } from "../../redux/getReducer/getNationality";
import { AiOutlineReload } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import NationalityPopup from "../PostTable/Nationality";

const NewsForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { state } = useLocation();
  const { data: nationality } = useSelector((state) => state.nationality);

  const { ownerid } = state;
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [NationalityID, setNationalityID] = useState("");
  const [RegistrationDate, setRegistrationDate] = useState("");
  const [showActivenationality, setShowActivenationality] = useState(false);

  const handleCloseActivenationality = () => setShowActivenationality(false);

  const handleShowActivenationality = async () => {
    await setShowActivenationality(true);
  };
  const FetchNew = () => {
    dispatch(fetchnationality());
  };

  let AllNationality =
    nationality === undefined ? (
      <></>
    ) : (
      nationality.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
        };
      })
    );

  let AllNationalityAr =
    nationality === undefined ? (
      <></>
    ) : (
      nationality.map(function (item) {
        return {
          id: item._id,
          value: item.NameAr,
          label: item.NameAr,
        };
      })
    );
  const [state1, setState] = useState({
    NameAr: "",
    NameEn: "",
    TitleEn: "",
    TitleAr: "",
    ShortEn: "",
    ShortAr: "",
    image: image,
  });

  useEffect(() => {
    if (ownerid) {
      setState({
        NameEn: ownerid.NameEn,
        NameAr: ownerid.NameAr,
        TitleEn: ownerid.TitleEn,
        TitleAr: ownerid.TitleAr,
        ShortEn: ownerid.ShortEn,
        ShortAr: ownerid.ShortAr,
        RegistrationDate: ownerid.RegistrationDate,
        NationalityID: ownerid.NationalityID,

        image: ownerid.image,
      });
    } else {
      alert("No Data");
    }
  }, [ownerid]);

  useEffect(() => {
    if (image === undefined) {
      setPreview(ownerid.image);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);
  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };
  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("NameEn", state1.NameEn);
      formData.append("NameAr", state1.NameAr);
      formData.append("TitleEn", state1.TitleEn);
      formData.append("TitleAr", state1.TitleAr);
      formData.append("ShortEn", state1.ShortEn);
      formData.append("ShortAr", state1.ShortAr);
      formData.append("RegistrationDate", RegistrationDate);
      formData.append("NationalityID", NationalityID.id === undefined ? state1.NationalityID : NationalityID.id);

      formData.append("Ownerimage", state1.image);
      // formData.append("NationalityID", NationalityID.id);
      // formData.append("RegistrationDate", RegistrationDate);

      const response = await axios.put(
        `${window.env.API_URL}/updateOwner/${ownerid._id}`,
        formData
      );
      history("/owner");
      swal({
        title: "Success!",
        text: "Data has been Updated successfully ",
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

  return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Edit Owner</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Name"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, NameEn: e.target.value })
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Details"
                        value={state1.NameEn}
                      />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="??????"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, NameAr: e.target.value })
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Details"
                        value={state1.NameAr}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Title"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, TitleEn: e.target.value })
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={state1.TitleEn}
                      />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="??????????"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, TitleAr: e.target.value })
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={state1.TitleAr}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Short Name "
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, ShortEn: e.target.value })
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={state1.ShortEn}
                      />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="?????? ????????"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, ShortAr: e.target.value })
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={state1.ShortAr}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="row mainrow">
                  <DatePicker
                    onChange={setRegistrationDate}
                    value={RegistrationDate}
                    dayPlaceholder="  "
                    monthPlaceholder={state1.RegistrationDate}
                    yearPlaceholder=""
                  />
                </div>
                <div className="row mainrow">
                <p className="selectLabel">Nationality</p>
                  <div className="col-sm">
                
                    <Select
                      placeholder={
                        <div>{ownerid.OwnerDataNationalityData&& ownerid.OwnerDataNationalityData.NameEn }</div>
                        
                      }
                      defaultInputValue={NationalityID}
                      onChange={setNationalityID}
                      options={AllNationality}
                      isClearable={true}
                      isSearchable={true}
                    />

                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <span
                          className="addmore"
                          onClick={handleShowActivenationality}
                        >
                          +
                        </span>
                      </OverlayTrigger>
                      <OverlayTrigger
                        overlay={
                          <Tooltip id={`tooltip-top`}>Fetch New</Tooltip>
                        }
                      >
                        <span className="addmore" onClick={FetchNew}>
                          <AiOutlineReload />
                        </span>
                      </OverlayTrigger>
                      |
                    </span>
                  </div>

                  <div className="col-sm">
                    <Select
                      className="selectdir"
                      placeholder={
                        <div style={{ direction: "rtl" }}>
                          ???????? ?????????? ???? ??????????????
                        </div>
                      }
                      defaultInputValue={NationalityID}
                      onChange={setNationalityID}
                      options={AllNationalityAr}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                {/* 
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Type to search Nationality</div>}
                      defaultValue={NationalityID}
                      onChange={setNationalityID}
                      options={AllNationality}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <button
                          className="addmore"
                          onClick={() => history("/nationality")}
                        >
                          +
                        </button>
                      </OverlayTrigger>
                      |
                    </span>
                  </div>

                  <div className="col-sm">
                    <Select
                      className="selectdir"
                      placeholder={
                        <div style={{ direction: "rtl" }}>
                          ???????? ?????????? ???? ??????????????
                        </div>
                      }
                      defaultValue={NationalityID}
                      onChange={setNationalityID}
                      options={AllNationality}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div> */}

                <div className="ButtonSection">
                  <div>
                    <input
                      type="file"
                      onChange={fileSelected}
                      className="formInput"
                    />

                    <img src={preview} className="PreviewImage" alt="" />
                  </div>
                  <button type="submit" className="SubmitButton">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showActivenationality}
        onHide={handleCloseActivenationality}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Nationality</h2>
        </Modal.Header>
        <Modal.Body>
          <NationalityPopup />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewsForm;
