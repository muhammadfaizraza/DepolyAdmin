import React,{useEffect} from "react";
import Auth from './Auth';
import Notification from './Notification';
import SearchBar from './Search';
import Logo from '../../assets/Group.png'
import '../CSS/header.css';
import { useLocation } from "react-router-dom";
import { getUserDetails } from "../../redux/postReducer/UserPost";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  let {pathname} = useLocation();
  const dispatch = useDispatch();
  const { userToken,userInfo } = useSelector((state) => state.user)
  // useEffect(() => {
  //   if (userToken) {
  //     dispatch(getUserDetails());
  //   }
   
  // }, [userToken, dispatch]);

  // if (!userInfo && !userToken) {
    
  return (
    <>
    {
      !userInfo && !userToken ? <></> :  <>
      {
        pathname !== '/' ?<div className="header">
        <div className="innerHeader">
          <div className="logoclass">
            <img src={Logo} alt="" />
          </div>
          <div className="searchclass">
            <SearchBar />
          </div>
          <div className="notificationclass">
            <Notification />
          </div>
          <div className="authclass">
            <Auth />
          </div>
        </div>
      </div> : null
      }
      </>
    }
    </>
    
  );
};

export default Header;
