import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Header.scss";
import { GiCampCookingPot} from "react-icons/gi";
import { TfiMenu } from "react-icons/tfi";
import { useSidebarContext } from '../../context/sidebarContext';
import {RiInstagramFill, RiTwitterFill, RiFacebookCircleFill, RiLoginBoxLine} from 'react-icons/ri';
import {IoHome} from 'react-icons/io5';
// import { Popover } from "antd";
import {BsHeartFill} from 'react-icons/bs';

const Navbar = () => {
  const {openSidebar} = useSidebarContext();
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if(offset > 60){
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  })

  return (
    <nav className={`navbar flex align-center ${scrolled ? 'scrolled': ""}`} style={{backgroundColor: '#C9ADA7'}}>
      <div className='container w-100'>
        <div className='navbar-content text-black'>
          <div className='brand-and-toggler flex align-center justify-between'>
          <div className='navbar-btns flex align-center'>
            <Link to = "/"> <IoHome size={27} style={{paddingTop: '5px',marginRight: '14px'}}/></Link>
            <div className = "nav-social">
              <BsHeartFill size = {28} style={{paddingTop: '5px', paddingBottom: '2px'}} />
            </div>
            {/* <Popover
              content={
                userEmail?(
                  <Link to = '/signin'>
                    <div className = "nav-social">
                    <RiLoginBoxLine size = {29} style={{paddingTop: '5px', paddingBottom: '3px'}} />
                    </div>
                  </Link>
                ) : (
                  <Link to = '/signin'>
                  <div className = "nav-social">
                  <RiLoginBoxLine size = {29} style={{paddingTop: '5px', paddingBottom: '3px'}} />
                  </div>
                </Link>
                )
              }
              titile={userEmail? userEmail : null}
              trigger="hover"
              >
                <div className="user-profile"></div>
              </Popover> */}
            <div className = "nav-social">
              <RiLoginBoxLine size = {29} style={{paddingTop: '5px', paddingBottom: '3px'}} />
            </div>  
            <div className="WhiteLine"> </div>
            </div>
            <Link to = "/" className='navbar-brand fw-3 fs-22 flex align-center'>
              <GiCampCookingPot size = {27} />
              <div className='navbar-brand-text' style={{ fontFamily: 'Patrick Hand SC, cursive', fontSize: '30px', fontWeight: 'bold'}}>Custom Cook</div>
            </Link>
            <div className='navbar-btns flex align-center'>
              <div className="WhiteLine"> </div>
              <div className = "nav-social">
                <a href="https://www.instagram.com/customcook_/" target="_blank" rel="noopener noreferrer">
                  <RiInstagramFill size = {27}/>
                </a>
              </div>
              <div className = "nav-social">
                <a href="https://twitter.com/CustomCook_" target="_blank" rel="noopener noreferrer">
                 <RiTwitterFill size = {27}/>
                </a>
              </div>
              <div className = "nav-social">
                <a href="https://www.facebook.com/CustomCook-100106158712044" target="_blank" rel="noopener noreferrer">
                  <RiFacebookCircleFill size = {27}/>
                </a>
              </div>
              <div className="WhiteLine"> </div>
              <button type = "button" className='navbar-show-btn text-black' onClick={() => openSidebar()}>
                <TfiMenu size = {27}  style={{right: '-3px'}}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar