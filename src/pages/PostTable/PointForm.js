import React, { Fragment, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import TextInputValidation from "../../utils/TextInputValidation";

const PointForm = () => {
  //for errors
  const [Error , setError] =useState("")
const [ErrorRank, setErrorRank] = useState("");
const [ErrorPoints, setErrorPoints] = useState("");
const [ErrorBpoints, setErrorBpoints] = useState("");
  
const [isLoading, setisLoading] = useState(false);

  
  const [registeration, setregisteration] = useState({
    Group_Name: "",
    Rank: "",
    Point: "",
    Bonus_Point: "",
    // First_Place_Bonus_Point: "",
    // Second_Place_Bonus_Point: "",
    // Third_Place_Bonus_Point: "",
    // FourthPrice: "",
    // FifthPrice: "",
    // SixthPrice: "",
  });

  const [records, setrecords] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setregisteration({ ...registeration, [name]: value });
  };


  const data1 =  (JSON.stringify(
    TextInputValidation(
      "en",
      registeration.Group_Name,
      "Group Points Name"
    )
  ));


  const obj = JSON.parse(data1);



  const submit = async (event) => {
    event.preventDefault();
    setisLoading(true)
    try {
      const formData = new FormData();
      formData.append("Group_Name", registeration.Group_Name);
      formData.append("Rank", registeration.Rank);
      formData.append("Point", registeration.Point);
      formData.append("Bonus_Point", registeration.Bonus_Point);
      // formData.append("First_Place_Bonus_Point", registeration.First_Place_Bonus_Point);
      // formData.append("Second_Place_Bonus_Point", registeration.Second_Place_Bonus_Point);
      // formData.append("Third_Place_Bonus_Point", registeration.Third_Place_Bonus_Point);
      // formData.append("FourthPrice", registeration.FourthPrice);
      // formData.append("FifthPrice", registeration.FifthPrice);
      // formData.append("SixthPrice", registeration.SixthPrice);
    const res =  await axios.post(`${window.env.API_URL}/uploadPointTableSystem`, formData);
    const msg = res;
    console.log(msg, 'data is 1');
      swal({
        title: "Success!",
        text: "Data has been added Successfully ",
        icon: "success",
        button: "OK",
      });
      history("/viewcompetitionPoint");
      setisLoading(false)
    } catch (error) {
      const err = error.response.data.message[0];
      console.log(err ,'data is err')
      swal({
        title: "Error!",
        text: err,
        icon: "error",
        button: "OK",
      });
      setisLoading(false)
    }
  };
  //conditional styling for errors
  // const styles = {
  //   popup:{
  //     color: Error.status === true ? "green" : "red",
 
  //   }
  // };
  // const stylesAr = {
  //   popupAr:{
  //     color: ErrorAr.status === true ? "green" : "red",
 
  //   }
  // };

  const history = useNavigate();
  const { pathname } = useLocation();

  return (
    <Fragment>
      <div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Headers">Create Point Table</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Group Name"
                      className="mb-3"
                      name="Name"
                      onBlur={() => setError(obj)}
                    >
                      <Form.Control
                        required
                        onChange={(e) =>
                          setregisteration({ ...registeration, Group_Name: e.target.value })
                        
                        }
                        value={registeration.Group_Name}
                        name="Group_Name"
                        type="text"
                        placeholder="Group_Name"
                        onBlur={() =>
                         setError(obj)
                              
                        }
                      />
                    </FloatingLabel>
                 
                    <span className="spanForm"> |</span>
                    <span className={Error.status ? 'success' : 'error'}>{Error.message}</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Rank"
                      className="mb-3"
                      name="BonusPoints"
                    >
                      <Form.Control
                        name="BonusPoints"
                        onChange={(e) =>
                          setregisteration({ ...registeration, Rank: e.target.value })
                        }
                        value={registeration.Rank}
                        type="number"
                        placeholder="BonusPoints"
                        required
                        onBlur={(e) => registeration.Rank === "" ? setErrorRank("Rank is required") : setErrorRank("Rank is Validated ")}
                     
                      />
                    </FloatingLabel>
                    <span className={registeration.Rank  === "" ? "error":"success"}>{ErrorRank}</span>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label=" Point"
                      className="mb-3"
                      name="Name"
                    >
                      <Form.Control
                        required
                        onChange={(e) =>
                          setregisteration({ ...registeration, Point: e.target.value })
                        }
                        value={registeration.Point}
                        name="Type"
                        type="number"
                        placeholder="Name"
                        onBlur={(e) => registeration.Point === "" ? setErrorPoints(" Bonus Points is required") : setErrorPoints("Bonus Points is Validated ")}
                      />
                    </FloatingLabel>
                 
                    <span className="spanForm"> |</span>
                    <span className={registeration.Point  === "" ? "error":"success"}>{ErrorPoints}</span>
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Bonus Point"
                      className="mb-3"
                      name="Name"
                    >
                      <Form.Control
                    onChange={(e) => 
                        setregisteration({ ...registeration, Bonus_Point: e.target.value })
                      } 
                      value={registeration.Bonus_Point}
                        type="number"
                        placeholder="Length"
                        required
                        onBlur={(e) => registeration.Bonus_Point === "" ? setErrorBpoints("Points is required") : setErrorBpoints("Points is Validated ")}
                     
                      />
                    </FloatingLabel>
                    <span className={registeration.Bonus_Point  === "" ? "error":"success"}>{ErrorBpoints}</span>
                  </div>
                </div>
                {/* <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="First Place Bonus Point"
                      className="mb-3"
                      name="Name"
                    >
                      <Form.Control
                        required
                        onChange={(e) =>
                          setregisteration({ ...registeration, First_Place_Bonus_Point: e.target.value })
                        }
                        value={registeration.First_Place_Bonus_Point}
                        name="First_Place_Bonus_Point"
                        type="text"
                        placeholder="Name"
                        onBlur={() =>
                         setError(obj)
                              
                        }
                      />
                    </FloatingLabel>
                 
                    <span className="spanForm"> |</span>
                   
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Second Place Bonus Point"
                      className="mb-3"
                      name="Name"
                    >
                      <Form.Control
                        required
                        onChange={(e) =>
                          setregisteration({ ...registeration, Second_Place_Bonus_Point: e.target.value })
                        }
                        value={registeration.Second_Place_Bonus_Point}
                        name="First_Place_Bonus_Point"
                        type="text"
                        placeholder="Name"
                        onBlur={() =>
                         setError(obj)
                              
                        }
                      />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Third Place Bonus Point"
                      className="mb-3"
                      name="Name"
                    >
                      <Form.Control
                        required
                        onChange={(e) =>
                          setregisteration({ ...registeration, Third_Place_Bonus_Point: e.target.value })
                        }
                        value={registeration.Third_Place_Bonus_Point}
                        name="Type"
                        type="text"
                        placeholder="Name"
                        onBlur={() =>
                         setError(obj)
                              
                        }
                      />
                    </FloatingLabel>
                 
                    <span className="spanForm"> |</span>
                   
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Fourth Price"
                      className="mb-3"
                      name="Name"
                    >
                      <Form.Control
                        name="NameAr"
                        onChange={(e) =>
                          setregisteration({ ...registeration, FourthPrice: e.target.value })
                        }
                        value={registeration.FourthPrice}
                        type="number"
                        placeholder="Length"
                        
                        
                     
                      />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Fifth Price"
                      className="mb-3"
                      name="Name"
                    >
                      <Form.Control
                        required
                        onChange={(e) =>
                          setregisteration({ ...registeration, FifthPrice: e.target.value })
                        }
                        value={registeration.FifthPrice}
                        name="Type"
                        type="text"
                        placeholder="Name"
                        onBlur={() =>
                         setError(obj)
                              
                        }
                      />
                    </FloatingLabel>
                 
                    <span className="spanForm"> |</span>
                   
                  </div>

                  <div className="col-sm">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Sixth Price"
                      className="mb-3"
                      name="Name"
                    >
                      <Form.Control
                        name="NameAr"
                        onChange={(e) =>
                          setregisteration({ ...registeration, SixthPrice: e.target.value })
                        }
                        value={registeration.SixthPrice}
                        type="number"
                        placeholder="Length"
                        
                        
                     
                      />
                    </FloatingLabel>
                  </div>
                </div> */}

                

                <div
                  className="ButtonSection "
                  style={{ justifyContent: "end" }}
                >
                  <button Name="submit" className="SubmitButton" disabled={isLoading}>
                    Add Point Table
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PointForm;
