import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";



const RacecoursePopup = (data) => {





    return (
        <>
            <div className="form">

                <div className="row mainrow">
                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Track Name"
                            className="mb-3"
                            name="TrackNameEn"

                        >
                            <Form.Control
                                type="text"


                                placeholder="Track Name"
                                value={data.data.TrackNameEn} readOnly
                            />
                        </FloatingLabel>
                        <span className="spanForm"> |</span>
                    </div>

                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="رمز قصير"
                            name="TrackNameAr"
                            className="mb-3 floatingInputAr "
                            style={{ direction: "rtl", left: "initial", right: 0 }}
                        >
                            <Form.Control
                                type="text"
                                placeholder="رمز قصير"
                                style={{ left: "%" }}
                                value={data.data.TrackNameEn} readOnly
                            />
                        </FloatingLabel>
                    </div>
                </div>

                {/* <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Short Code"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        value={state1.shortCode}
                        onChange={(e) =>
                          setState({ ...state1, shortCode: e.target.value })
                        }
                        placeholder="Short Code"
                      />
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="رمز قصير"
                      className="mb-3 floatingInputAr "
                      style={{ direction: "rtl", left: "initial", right: 0 }}
                    >
                      <Form.Control
                        type="text"
                        placeholder="رمز قصير"
                        style={{ left: "%" }}
                        value={state1.shortCode}
                        onChange={(e) =>
                          setState({ ...state1, shortCode: e.target.value })
                        }
                      />
                    </FloatingLabel>
                  </div>
                </div> */}
              <div className="row mainrow">
                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Nationality"
                            className="mb-3"
                            name="Nationality"

                        >
                            <Form.Control
                                type="text"


                                placeholder="Track Name"
                                value={data.data.NationalityDataRaceCourse.NameEn} readOnly
                            />
                        </FloatingLabel>
                        <span className="spanForm"> |</span>
                    </div>

                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="رمز قصير"
                            name="TrackNameAr"
                            className="mb-3 floatingInputAr "
                            style={{ direction: "rtl", left: "initial", right: 0 }}
                        >
                            <Form.Control
                                type="text"
                                placeholder="رمز قصير"
                                style={{ left: "%" }}
                                value={data.data.NationalityDataRaceCourse.NameAr} readOnly
                            />
                        </FloatingLabel>
                    </div>
                </div>

                <div className="row mainrow">
                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Color"
                            className="mb-3"
                            name="Nationality"

                        >
                            <Form.Control
                                type="text"


                                placeholder="Color "
                                value={data.data.ColorCodeData.NameEn} readOnly
                            />
                        </FloatingLabel>
                        <span className="spanForm"> |</span>
                    </div>

                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="رمز قصير"
                            name="TrackNameAr"
                            className="mb-3 floatingInputAr "
                            style={{ direction: "rtl", left: "initial", right: 0 }}
                        >
                            <Form.Control
                                type="text"
                                placeholder="رمز قصير"
                                style={{ left: "%" }}
                                value={data.data.ColorCodeData.NameAr} readOnly
                            />
                        </FloatingLabel>
                    </div>
                </div>

                <div className="row mainrow">
                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="short Code"
                            className="mb-3"
                            name="Nationality"

                        >
                            <Form.Control
                                type="text"


                                placeholder="Color "
                                value={data.data.shortCode} readOnly
                            />
                        </FloatingLabel>
                  
                    </div>

                   
                </div>


                <div className="ButtonSection">
                    <div>
                     
                        {/* {image && (
                      <img src={preview} className="PreviewImage" alt="" />
                    )} */}
                    </div>


                </div>

            </div>
        </>
    );
};

export default RacecoursePopup;