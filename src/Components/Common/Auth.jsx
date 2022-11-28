import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {NavLink } from "react-router-dom";
import { getUserDetails } from "../../redux/postReducer/UserPost";
import { logout } from '../../redux/getReducer/UserSlice'
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { userInfo, userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
   
  }, [userToken, dispatch]);

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }
  
  return (
    <>
      <div className="cta">
        {userInfo || userToken ? (
          <div className="auth">
          <div className="userprofile">
          <div className="logoutclass">
          <button className="buttonLogout"  onClick={handleLogout}>
              Logout
          </button>
        </div>
           
            <span>
              
            </span>
          </div>
        </div>

        ) : (
          <div className="auth1 ">
            <NavLink className="buttonLogin" to="/">
            Login
          </NavLink>
          </div>
        )}
      </div>
      
    </>
  );
};
export default Auth;
