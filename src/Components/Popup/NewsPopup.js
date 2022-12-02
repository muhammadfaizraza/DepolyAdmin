import React, { Fragment } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";


const NewsPopup = (data) => {


console.log(data)


    return (
        <Fragment>
            <div className="form">

                <div className="row mainrow">

                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Title"
                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="Title" value={data.data.TitleEn} readOnly />
                        </FloatingLabel>

                        <span className="spanForm"> |</span>
                    </div>

                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="عنوان"

                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="عنوان" value={data.data.TitleAr} readOnly />
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
                            <Form.Control type="text" placeholder="Description"  value={data.data.DescriptionEn} readOnly />
                        </FloatingLabel>

                        <span className="spanForm"> |</span>
                    </div>

                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="وصف"
                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="وصف" value={data.data.DescriptionAr} readOnly  />
                        </FloatingLabel>

                    </div>
                </div>

                <div className="row mainrow">
                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Second Title "
                            className="mb-3"


                        >
                            <Form.Control type="text" placeholder="Second-Title" value={data.data.SecondTitleEn} readOnly />
                        </FloatingLabel>

                        <span className="spanForm"> |</span>
                    </div>

                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="عنوان"
                            className="mb-3"
                           
                        >
                            <Form.Control type="text" placeholder="Description" value={data.data.SecondTitleAr} readOnly/>
                        </FloatingLabel>

                    </div>
                </div>


                <div className="ButtonSection">
                    <div>

                        <img src={data.data.image} className="PreviewImage" alt="" />

                    </div>

                </div>

            </div>
        </Fragment>
    );
};

export default NewsPopup;