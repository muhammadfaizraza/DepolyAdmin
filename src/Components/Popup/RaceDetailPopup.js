import React from 'react'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";


const RaceDetailPopup = (data) => {
console.log(data)
    return (
    <div className="form">
          <div className="modalPreview">

<img src={data.data.image} className="PreviewImage" alt="" />



</div>

    <div className="row mainrow">

        <div className="col-sm">
            <FloatingLabel
                controlId="floatingInput"
                label="Race Name"
                className="mb-3"

            >
                <Form.Control type="text" placeholder="Title" value= {data.data.RaceNameModelData.NameEn} readOnly />
            </FloatingLabel>

            <span className="spanForm"> |</span>
        </div>

        <div className="col-sm">
            <FloatingLabel
                controlId="floatingInput"
                label="اسم"
                style={{ direction: "rtl", left: "initial", right: 0 }}
                className="mb-3 floatingInputAr"

            >
                <Form.Control type="text" placeholder="عنوان" value= {data.data.RaceNameModelData.NameAr} readOnly style={{ left: "%" }} />
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
                label="Race Type "
                className="mb-3"


            >
                <Form.Control type="text" placeholder="Second-Title" value={data.data.RaceTypeModelData.NameEn}readOnly />
            </FloatingLabel>

            <span className="spanForm"> |</span>
        </div>

        <div className="col-sm">
            <FloatingLabel
                controlId="floatingInput"
                label="نوع السباق"
                className="mb-3 floatingInputAr"
                style={{ direction: "rtl", left: "initial", right: 0 }}
               
            >
                <Form.Control type="text" placeholder="Description" value={data.data.RaceTypeModelData.NameAr}  
style={{ left: "%" }} readOnly/>
            </FloatingLabel>

        </div>
    </div>

    <div className="row mainrow">
        <div className="col-sm">
            <FloatingLabel
                controlId="floatingInput"
                label="Race Course "
                className="mb-3"


            >
                <Form.Control type="text" placeholder="Second-Title" value={data.data.RaceCourseData.TrackNameEn}readOnly />
            </FloatingLabel>

            <span className="spanForm"> |</span>
        </div>

        <div className="col-sm">
            <FloatingLabel
                controlId="floatingInput"
                label="نوع السباق"
                className="mb-3 floatingInputAr"
                style={{ direction: "rtl", left: "initial", right: 0 }}
               
            >
                <Form.Control type="text" placeholder="Description" value={data.data.RaceTypeModelData.NameAr}  
style={{ left: "%" }} readOnly/>
            </FloatingLabel>

        </div>
    </div>
    <div className="row mainrow">
        <div className="col-sm">
            <FloatingLabel
                controlId="floatingInput"
                label="Track Length "
                className="mb-3"


            >
                <Form.Control type="text" placeholder="Second-Title" value={data.data.TrackLengthData.TrackLength}readOnly />
            </FloatingLabel>

     
        </div>

    </div>
    <div className="row mainrow">
        <div className="col-sm">
            <FloatingLabel
                controlId="floatingInput"
                label="Number Of Horse"
                className="mb-3"


            >
                <Form.Control type="text" placeholder="Second-Title" value={data.data.RaceAndHorseModelData.length}readOnly />
            </FloatingLabel>


        </div>

        
    </div>
    <div className="row mainrow">
        <div className="col-sm">
            <FloatingLabel
                controlId="floatingInput"
                label="Day & Time"
                className="mb-3"


            >
                <Form.Control type="text" placeholder="Second-Title" value={data.data.DayNTime}readOnly />
            </FloatingLabel>


        </div>

        
    </div>


      

</div>
  )
}

export default RaceDetailPopup