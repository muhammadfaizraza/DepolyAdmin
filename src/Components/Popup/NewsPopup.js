import React, { Fragment } from "react";
    import FloatingLabel from "react-bootstrap/FloatingLabel";
    import Form from "react-bootstrap/Form";


const NewsPopup = (data) => {


console.log(data)


    return (
        <Fragment>
            <div className="form">
            <div className="modalPreview">

<img src={data.data.image} className="PreviewImage" alt="" />



</div>

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
                            style={{ direction: "rtl", left: "initial", right: 0 }}
                            className="mb-3 floatingInputAr"

                        >
                            <Form.Control type="text" placeholder="عنوان" value={data.data.TitleAr}  readOnly style={{ left: "%" }} />
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
                            className="mb-3 floatingInputAr"
                            style={{ direction: "rtl", left: "initial", right: 0 }}

                        >
                            <Form.Control type="text" placeholder="وصف" value={data.data.DescriptionAr}     style={{ left: "%" }} readOnly  />
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
                            className="mb-3 floatingInputAr"
                            style={{ direction: "rtl", left: "initial", right: 0 }}
                           
                        >
                            <Form.Control type="text" placeholder="Description" value={data.data.SecondTitleAr}  
    style={{ left: "%" }} readOnly/>
                        </FloatingLabel>

                    </div>
                </div>


         
                 

            </div>
        </Fragment>
    );
};

export default NewsPopup;