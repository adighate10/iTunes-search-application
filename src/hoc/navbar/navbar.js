import React, { useEffect, useRef } from 'react';
import '../../style/_navbar.css';
import logo from '../../images/logo.png';
import menu from '../../images/menu.png';
import useMediaQuery from "../../utils/useMediaQuery";

export function Navbar() {

  const menuList = useRef();
  const isDesktop = useMediaQuery('(min-width: 700px)');

  const menuClass = isDesktop ? "desktop" : "mobile";
  
  useEffect(() => {
    if(!isDesktop){
      menuList.current.style.maxHeight = "0px";
      menuList.current.style.display = "none";
    } else {
      menuList.current.style.display = "inline-block";
    }
  }, [isDesktop])

  const toggleMenuList = () => {
     if(menuList.current.style.maxHeight === "0px") {
      menuList.current.style.maxHeight = "130px";
      menuList.current.style.display = "block";
     } else {
      menuList.current.style.maxHeight = "0px";
      menuList.current.style.display = "none";
     }
  }

  return (
      <div className="navbar">
        <img src={logo} className="logo"/>
        <nav>
          <ul className={menuClass} ref={menuList} >
            <li><a href="/">Home</a></li>
            <li><a href="/exp">Explore</a></li>
            <li><a href="/about">About us</a></li>
          </ul>
        </nav>
        <img src={menu} className={isDesktop ? "hide":"menu"} onClick={toggleMenuList}/>
      </div>
  );
}
