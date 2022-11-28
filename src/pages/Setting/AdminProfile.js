import React, { useState,useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const naviagate = useNavigate();
  const { data: userProfile } = useSelector((state) => state.userProfile);
  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [shortCode, setshortCode] = useState("");

  const submit = async (event) => {};

  return (
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Admin Info</div>
          <div className="form">
            <form onSubmit={submit}>
              <div className="row mainrow">
                <div className="col-sm">
                  <input
                    placeholder=" First Name"
                    name="Name"
                    value={NameEn}
                    required
                  ></input>
                  <span className="spanForm"> |</span>
                </div>

                <div className="col-sm">
                  <input
                   
                    placeholder="Last Name "
                    name="Name"
                    value={NameAr}
                  ></input>
                </div>
              </div>

              <div className="row mainrow">
                <div className="col-sm">
                  <input
                    placeholder="Passport No"
                    name="Detail"
                    value={shortCode}
                  ></input>
                  <span className="spanForm"> |</span>
                </div>

                <div className="col-sm">
                  <input
                    placeholder="Email"
                    name="Detail"
                  ></input>
                </div>
              </div>
              <div className="ButtonSection">
                  <button type="submit" className="SubmitButton"
                  onClick={() => naviagate(-1)}>
                    Back
                  </button>
                  <button type="submit" className="SubmitButton">
                  Edit
                </button>
                </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
