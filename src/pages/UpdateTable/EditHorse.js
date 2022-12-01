import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import Select from "react-select";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import ReactStars from "react-rating-stars-component";
import { fetchTrainer } from "../../redux/getReducer/getTrainerSlice";
import { fetchOwner } from "../../redux/getReducer/getOwnerSlice";
import { fetchbreeder } from "../../redux/getReducer/getBreeder";


const NewsForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { state } = useLocation();

  const { data: trainer } = useSelector((state) => state.trainer);
  const { data: owner } = useSelector((state) => state.owner);
  const { data: breeder } = useSelector((state) => state.breeder);


  const { horseid } = state;
  console.log(horseid)

  const [Breeder, setBreeder] = useState("");
  const [ActiveTrainer, setActiveTrainer] = useState("");
  const [ActiveOwner, setActiveOwner] = useState("");


  useEffect(() => {
    dispatch(fetchOwner());
    dispatch(fetchTrainer());
    dispatch(fetchbreeder());
  }, [dispatch]);

  let traineroption =
    trainer === undefined ? (
      <></>
    ) : (
      trainer.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
        };
      })
    );

  let owneroption =
    owner === undefined ? (
      <></>
    ) : (
      owner.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
        };
      })
    );
    
    let AllBreeder =
    breeder === undefined ? (
      <></>
    ) : (
      breeder.map(function (item) {
        return {
          id: item._id,
          value: item.NameEn,
          label: item.NameEn,
        };
      })
    );
  const [state1, setState] = useState({
		NameEn: '',
    NameAr:'',
    PurchasePrice:'',
    STARS:'',
    Remarks:'',
    ActiveOwner:'',
    ActiveTrainer:'',
    Breeder:''
    
	});
  const [image,setImage] = useState();

  const fileSelected = (event) => {
    const image = event.target.files[0];
    setImage(image, image);
  };
  


  useEffect(() => {
		if (horseid) {
			setState({
				NameEn: horseid.NameEn,
        NameAr: horseid.NameAr,
        Breeder:horseid.BreederData.NameEn,
        PurchasePrice :horseid.PurchasePrice,
        STARS:horseid.STARS,
        Remarks:horseid.Remarks
			});
		} else {
		}
	}, [horseid]);


  const submit = async (event) => {
    event.preventDefault();
    try {
      
      const formData = new FormData();
      formData.append("Horseimage", image);
      formData.append("NameEn", state1.NameEn);
      formData.append("NameAr", state1.NameAr);
      formData.append("PurchasePrice", state1.PurchasePrice);
      formData.append("STARS", state1.STARS);
      formData.append("Remarks", state1.Remarks);
      formData.append("Breeder", Breeder.id);
      formData.append("ActiveTrainer", ActiveTrainer.id);
      formData.append("ActiveOwner", ActiveOwner.id);


      const response = await axios.put(`${window.env.API_URL}/updatehorse/${horseid._id}`, formData);
      history("/horse");
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
            <div className="Headers">Edit Horse</div>
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
                      <Form.Control type="text" placeholder="Details"  value={state1.NameEn}/>
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="ملاحظات"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, NameEn: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="ملاحظات"   value={state1.NameEn}/>
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Remarks"
                      className="mb-3"
                      onChange={(e) =>
                        setState({ ...state1, Remarks: e.target.value })
                      }
                    
                    >
                      <Form.Control type="text" placeholder="Details"   value={state1.Remarks}/>
                    </FloatingLabel>

                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="ملاحظات"
                      className="mb-3 floatingInputAr"
                      style={{ direction: "rtl" }}
                      onChange={(e) =>
                        setState({ ...state1, Remarks: e.target.value })
                      }
                    >
                      <Form.Control type="text" placeholder="ملاحظات"   value={state1.Remarks}/>
                    </FloatingLabel>
                  </div>
                </div>
                
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Type to search Active trainer</div>}
                      defaultValue={ActiveTrainer}
                      onChange={setActiveTrainer}
                      options={traineroption}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <button
                          className="addmore"
                          onClick={() => history("/trainerform")}
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
                          اكتب للبحث عن المدرب النشط
                        </div>
                      }
                      defaultValue={ActiveTrainer}
                      onChange={setActiveTrainer}
                      options={traineroption}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Type to search Active Owner</div>}
                      defaultValue={ActiveOwner}
                      onChange={setActiveOwner}
                      options={owneroption}
                      isClearable={true}
                      isSearchable={true}
                    /><span className="spanForm">
                      
                      <OverlayTrigger
          
         
          overlay={
            <Tooltip id={`tooltip-top`}>
              Add more
            </Tooltip>
          }
        >
          <button className="addmore" onClick={()=> history('/ownerform')}>+</button>
        </OverlayTrigger> 

                       |</span>
                  </div>

                  <div className="col-sm">
                    <Select         className='selectdir'
                      placeholder={
                        <div style={{ direction: "rtl" }}>
                         اكتب للبحث عن المالك النشط
                        </div>
                      }
                      defaultValue={ActiveOwner}
                      onChange={setActiveOwner}
                      options={owneroption}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <Select
                      placeholder={<div>Select Breeder</div>}
                      defaultValue={Breeder}
                      onChange={setBreeder}
                      options={AllBreeder}
                      isClearable={true}
                      isSearchable={true}
                    />
                    <span className="spanForm">
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Add more</Tooltip>}
                      >
                        <button
                          className="addmore"
                          onClick={() => history("/breeder")}
                        >
                          +
                        </button>
                      </OverlayTrigger>
                      |
                    </span>
                  </div>
                  <div className="col-sm">
                    <Select
                      required
                      placeholder={<div>حدد نوع الجنس</div>}
                      className="selectdir"
                      defaultValue={Breeder}
                      onChange={setBreeder}
                      options={AllBreeder}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                  <input
										type='number'
										name='Purchased'
										id='Purchased'
										className='group__control'
										placeholder='Purchased Price'
										value={state1.PurchasePrice}
										onChange={(e) =>
											setState({ ...state1, PurchasePrice: e.target.value })
										}
									/>
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      type="number"
                      placeholder="اسم المسار"
                       value={state1.PurchasePrice}
										  onChange={(e) =>
											setState({ ...state1, PurchasePrice: e.target.value })
										}
                    ></input>
                  </div>
                </div>

                <div className="row mainrow">
                  <div className="starstyle">
                    <p>Stars</p>
                    <div className="starcss">
                    <ReactStars
                      count={5}
                      onChange={(e) =>
                        setState({ ...state1, STARS: e.target.value })
                      }
                      value={state1.STARS}
                      size={44}
                      a11y= {true}
                      isHalf= {true}
                      activeColor="#19469D "
                    />
                      {/* <Rating
                        fractions={2}
                        stop={5}
                        initialRating={STARS}
                        onClick={(rate) => setSTARS(rate)}
                      /> */}
                    </div>
                  </div>
                </div>

                <div className="ButtonSection">
                  <input type="file" size="60" onChange={fileSelected} />
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
