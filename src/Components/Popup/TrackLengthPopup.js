import React from 'react'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const TrackLengthPopup = (data) => {
    console.log(data , "track Length")
  return (
    <div className="form">

                <div className="row mainrow">
                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Track Length"
                            className="mb-3"
                            name="TrackNameEn"

                        >
                            <Form.Control
                                type="text"


                                placeholder="Track Name"
                                value={data.data.TrackLength} readOnly
                            />
                        </FloatingLabel>
                    </div>
                    </div>
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
                                value={data.data.TrackLengthRaceCourseData.TrackNameEn} readOnly
                            />
                        </FloatingLabel>
                        <span className="spanForm"> |</span>
                    </div>
                    
              <div className="col-sm">
                <FloatingLabel
                  controlId="floatingInput"
                  label="اسم المسار"
                  className="mb-3 floatingInputAr"
                  style={{ direction: "rtl", left: "initial", right: 0 }}
                >
                  <Form.Control
                    type="text"
                    placeholder="اسم"
                    readOnly
                    value={data.data.TrackLengthRaceCourseData.TrackNameAr}
                   
                    style={{ direction: "rtl" ,   left: "%"   }}
                  />
                </FloatingLabel>
              </div>
                    </div>
                    <div className="ButtonSection">
                    <div className='modalPreview'>
                     
                   
                      <img src={data.data.TrackLengthRaceCourseData.image} className="PreviewImage" alt="" />
                
                    </div>


                </div>

            </div>
  )
}

export default TrackLengthPopup