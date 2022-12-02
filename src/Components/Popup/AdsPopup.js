import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";


const AdsPopup = (data) => {





    return (
        <>
            <div className="form">

                <div className="row mainrow">

                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Title"
                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="Title" value={data.data.TitleEn} readOnly/>
                        </FloatingLabel>

                        <span className="spanForm"> |</span>
                    </div>

                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="اسم"

                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="Details" value={data.data.TitleAr} readOnly/>
                        </FloatingLabel>

                    </div>
                </div>

                <div className="row mainrow">
                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Description"
                            className="mb-3"


                        >
                            <Form.Control type="text" placeholder="Description" value={data.data.DescriptionEn} readOnly/>
                        </FloatingLabel>

                        <span className="spanForm"> |</span>
                    </div>

                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="اسم"
                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="Description" value={data.data.DescriptionAr} readOnly />
                        </FloatingLabel>

                    </div>
                </div>


                <div className="ButtonSection">
                    <div>

                        <img src={data.data.image} className="PreviewImage" alt="" />

                    </div>

                </div>

            </div>
        </>
    );
};

export default AdsPopup;