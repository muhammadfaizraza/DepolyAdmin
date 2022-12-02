import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";



const OwnerPopup = (data) => {



console.log(data)
    return (
        <>
            <div className="form">

                <div className="row mainrow">

                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Name"
                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="Name" value={data.data.NameEn}  readOnly/>
                        </FloatingLabel>

                        <span className="spanForm"> |</span>
                    </div>

                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="اسم"

                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="Details" value={data.data.NameAr}  readOnly/>
                        </FloatingLabel>

                    </div>
                </div>

                <div className="row mainrow">
                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Title"
                            className="mb-3"


                        >
                            <Form.Control type="text" placeholder="Description" value={data.data.TitleEn}  readOnly/>
                        </FloatingLabel>

                        <span className="spanForm"> |</span>
                    </div>

                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="اسم"
                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="Description"  value={data.data.TitleAr}  readOnly/>
                        </FloatingLabel>

                    </div>
                </div>

                <div className="row mainrow">
                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Short Name "
                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="Description" value={data.data.ShortEn}  readOnly />
                        </FloatingLabel>

                        <span className="spanForm"> |</span>
                    </div>

                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="اسم"
                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="Description" value={data.data.ShortAr}  readOnly  />
                        </FloatingLabel>

                    </div>
                </div>


                <div className="row mainrow">
                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Registeratin Date"
                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="Description" value= {data.data.RegistrationDate}  readOnly />
                        </FloatingLabel>

                        <span className="spanForm"> |</span>
                    </div>

                 
                </div>
                <div className="row mainrow">
                    <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Nationality"
                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="Description" value= {data.data.OwnerDataNationalityData.NameEn}  readOnly />
                        </FloatingLabel>

                        <span className="spanForm"> |</span>
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

export default OwnerPopup;