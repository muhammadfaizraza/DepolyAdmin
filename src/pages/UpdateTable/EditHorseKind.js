import React, { useState, useEffect } from "react";
import "../../Components/CSS/forms.css";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const NewsForm = () => {
  const history = useNavigate();
  const { state } = useLocation();

  const { horseid } = state;
  console.log(horseid);

  const [state1, setState] = useState({
    NameEn: "",
    NameAr: "",
    shortName: "",
  });

  useEffect(() => {
    if (horseid) {
      setState({
        NameEn: horseid.NameEn,
        NameAr: horseid.NameAr,
        shortName: horseid.shortName,
      });
    } else {
      alert("No Data");
    }
  }, [horseid]);


  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("NameEn", state1.NameEn);
      formData.append("NameAr", state1.NameAr);
      formData.append("shortName", state1.shortName);

      const response = await axios.put(
        `${window.env.API_URL}/updateHorseKind/${horseid._id}`,
        formData
      );
      history("/horsekind");
      swal({
        title: "Success!",
        text: "Data has been Updated successfully ",
        icon: "success",
        button: "OK",
      });
    } catch (error) {
      alert(error.message);
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
            <div className="Headers">Edit Horse Kind</div>
            <div className="form">
              <form onSubmit={submit}>
                <div className="row mainrow">
                  <div className="col-sm">
                    <input
                      type="text"
                      name="NameEn"
                      id="NameEn"
                      className="group__control"
                      placeholder="Name"
                      value={state1.NameEn}
                      onChange={(e) =>
                        setState({ ...state1, NameEn: e.target.value })
                      }
                    />
                    <span className="spanForm"> |</span>
                  </div>

                  <div className="col-sm">
                    <input
                      style={{ direction: "rtl" }}
                      placeholder="اسم "
                      type="text"
                      name="NameAr"
                      id="NameAr"
                      className="group__control"
                      value={state1.NameAr}
                      onChange={(e) =>
                        setState({ ...state1, NameAr: e.target.value })
                      }
                    ></input>
                  </div>
                </div>
                <div className="row mainrow">
                  <div className="col-sm">
                    <input
                      type="text"
                      name="MiniumumJockeyWeight"
                      id="MiniumumJockeyWeight"
                      className="group__control"
                      placeholder="Short Name"
                      value={state1.shortName}
                      onChange={(e) =>
                        setState({ ...state1, shortName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="ButtonSection">
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
