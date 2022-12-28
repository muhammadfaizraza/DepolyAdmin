import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import DatePicker from "react-date-picker";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";

const NewsForm = () => {
  const history = useNavigate();
  const { state } = useLocation();
  
  const { competitionid } = state;
  const { data: category } = useSelector((state) => state.category);

  const [image,setImage] = useState();
  const [preview,setPreview] = useState();
  const [StartDate, setStartDate] = useState("");

  const [state1, setState] = useState({
		NameAr: '',
    NameEn:'',
    DescEn: '',
    DescAr:'',
    CategoryCount: '',
    CompetitionCategory:'',
    StartDate:'',
    CompetitionCode:'',
    shortCode:'',
    CompetitionCategory:''
	});
 

  useEffect(() => {
		if (competitionid) {
			setState({
				NameEn: competitionid.NameEn,
        NameAr: competitionid.NameAr,
				DescEn:competitionid.DescEn,
        DescAr:competitionid.DescAr,
        CategoryCount: competitionid.CategoryCount,
        StartDate: competitionid.StartDate,
        CompetitionCode: competitionid.CompetitionCode,
        shortCode: competitionid.shortCode,
        CompetitionCategory:competitionid.CompetitionCategory
			});
		} else {
			
		}
	}, [competitionid]);

  useEffect(() => {
    if (image === undefined) {
      setPreview(competitionid.image)
      return
  }  
    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
}, [image])
  // const fileSelected = (event) => {
  //   const image = event.target.files[0];
  //   setImage(image);
  // };
  const submit = async (event) => {
    event.preventDefault();
    try {
      
      const formData = new FormData();
      formData.append("NameEn", state1.NameEn);
      formData.append("NameAr", state1.NameAr);
      formData.append("DescEn", state1.DescEn);
      formData.append("DescAr", state1.DescAr);
      formData.append("CategoryCount", state1.CategoryCount);
      formData.append("CompetitionCategory", state1.CompetitionCategory);
      formData.append("StartDate", StartDate);
      formData.append("CompetitionCode", state1.CompetitionCode);
      // formData.append("CompetitionCategory", (CompetitionCategory ===  undefined ? state1.CompetitionCategory : CompetitionCategory.id) );
      formData.append("shortCode", state1.shortCode);

      // formData.append("RegistrationDate", RegistrationDate);

      await axios.put(`${window.env.API_URL}/updateCompetiton/${competitionid._id}`, formData);
      history("/competitionlisting");
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
  let AllCategory =
  category === undefined ? (
    <></>
  ) : (
    category.map(function (item) {
      return {
        id: item._id,
        value: item.NameEn,
        label: item.NameEn,
      };
    })
  );
  var today = new Date();

  const convert = (num) => {
    if (num) {
      var date = new Date(num);
      var months = [
        "يناير",
        "فبراير",
        "مارس",
        "إبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ];
      var days = [
        "اﻷحد",
        "اﻷثنين",
        "الثلاثاء",
        "اﻷربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
      ];
      var delDateString =
        days[date.getDay()] +
        " " +
        date.getDate() +
        " " +
        months[date.getMonth()] +
        " " +
        date.getFullYear();
      return delDateString;
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
            <div className="Headers">Edit Competition</div>
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
                      <Form.Control type="text" placeholder="Details"  	value={state1.NameEn}/>
                    </FloatingLabel>
                
                    <span className="spanForm"> |</span>
                  </div>
                  

                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="اسم"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, NameAr: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="Details"value={state1.NameAr} />
                    </FloatingLabel>
                  
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <DatePicker
                      onChange={setStartDate}
                      value={StartDate}
                      minDate={today}
                      dayPlaceholder=" "
                      monthPlaceholder={state1.StartDate}
                      yearPlaceholder=""
                    />
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm" style={{ direction: "rtl" }}>
                    <input
                      value={convert(StartDate)}
                      placeholder="تاريخ الولادة"
                    />
                  </div>
                </div>
                {/* <div className="row mainrow">
                  
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Description"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, DescEn: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="Details"  	value={state1.DescEn}/>
                    </FloatingLabel>
                
                    <span className="spanForm"> |</span>
                  </div>
                  

                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="وصف"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, DescAr: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="Details"value={state1.DescAr} />
                    </FloatingLabel>
                  
                  </div>
                </div> */}
                
              
                

                <div className="row mainrow">
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label=" Count"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, CategoryCount: e.target.value })
                      }
                    
                    >
                      <Form.Control type="number" min="1"
                      max="12" placeholder="Description"value={state1.CategoryCount}/>
                    </FloatingLabel>
               
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="تريكونت"className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, CategoryCount: e.target.value })
                      }
                    >
                      <Form.Control type="number" placeholder="Description"value={state1.CategoryCount}/>
                    </FloatingLabel>
                    
                  </div>
                </div>
                <div className="row mainrow">
                  
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Competition Code"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, CompetitionCode: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="Details"  	value={state1.CompetitionCode}/>
                    </FloatingLabel>
                
                  </div>
                  

                  
                </div>
                {/* <div className="row mainrow">
                  
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Pick Count"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, CompetitionCategory: e.target.value })
                      }
                    >
                      <Form.Control type="number" placeholder="Details"  	value={state1.CompetitionCategory}/>
                    </FloatingLabel>
                
                  </div>
                  

                </div> */}

                {/* <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Competition Category</div>}
                      defaultValue={CompetitionCategory}
                      onChange={setCompetitionCategory}
                      options={AllCategory}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <button
                          className="addmore"
                          onClick={() => history("/addCategory")}
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
                          اكتب للبحث عن الجنسية
                        </div>
                      }
                      defaultValue={CompetitionCategory}
                      onChange={setCompetitionCategory}
                      options={AllCategory}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div> */}
                <div className="row mainrow">
                  
                  <div className="col-sm">
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Short Code"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, shortCode: e.target.value })
                      }
                    >
                      <Form.Control type="number" placeholder="Details"  	value={state1.shortCode}/>
                    </FloatingLabel>
                
                  </div>
                  

                  
                </div>
                <div className="ButtonSection" style={{ justifyContent: "end" }}>
                <button type="submit" className="SubmitButton">
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

export default NewsForm;
