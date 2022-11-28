import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminRole = () => {
  const [NameEn, setNameEn] = useState("");
  const [NameAr, setNameAr] = useState("");
  const [shortCode, setshortCode] = useState("");
  const history = useNavigate();

  const submit = async (event) => {};
  return (
    <div className="page">
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <div className="Headers">Create Role</div>
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

              <div className="row mainrow">
                <div className="col-sm">
                  <input
                    placeholder="Phone Number"
                    name="Detail"
                    value={shortCode}
                  ></input>
                  <span className="spanForm"> |</span>
                </div>

                <div className="col-sm">
                  <input
                    placeholder="Password"
                    name="Detail"
                  ></input>
                </div>
              </div>
              <div className="ButtonSection " style={{ justifyContent: "end" }}>
                <button type="submit" className="SubmitButton">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRole;
