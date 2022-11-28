import React from "react";
import Auth from './Auth';
import Notification from './Notification';
import SearchBar from './Search';
import Logo from '../../assets/Group.png'
import '../CSS/header.css';
import { useLocation } from "react-router-dom";

const Header = () => {
  let {pathname} = useLocation();

  return (
    <>
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
    
  );
};

export default Header;
