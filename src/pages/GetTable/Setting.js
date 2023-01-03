import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Components/CSS/setting.css";

const Setting = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="page">
        <div className="rightsidedata">
          <div className="dashboardheader">
            <h2>Setting</h2>
          </div>
          <div className="DashboardCard">
            <div
              className="OngoingRaces"
              onClick={() => navigate("/AdminProfile")}
            >
              <p>Admin Profile</p>
            </div>
            <div
              className="ResultAwaited"
              onClick={() => navigate("/ThemeSetting")}
            >
              <p>Theme Setting</p>
            </div>
            <div className="OngoingRaces" onClick={() => navigate("/AddRole")}>
              <p>Add Role </p>
            </div>
            <div
              className="OngoingRaces"
              onClick={() => navigate("/AdminListing")}
            >
              <p>Admin Listing</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
