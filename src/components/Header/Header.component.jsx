import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import "./Header.styles.scss";

const Header = ({ currentUser, history, onOpenModal }) => {
  let usersFirstName = null;
  let usersLastName = null;
  let usersImageUrl = "";
  if (currentUser) {
    usersFirstName = currentUser.firstName
    usersLastName = currentUser.lastName
    usersImageUrl = currentUser.profilePic ? currentUser.profilePic : ""
  }
  console.log("HEADER HISTORY", history.location.pathname )
  return (
    <div className="header">
      <i onClick={onOpenModal} class="fas fa-bars ShowOnMobile ShowOnTabLand"></i>
      {history.location.pathname !== "/dashboard" ?
        <Link to="/" className="logoLinkBig">
          <img className="imgBig" alt="" src="./img/rudainafoundationlogo.png" /> 
        </Link> :
        <Link to="/" className="logoLink">
          <img className="imgSmall" alt="" src="favicon.ico"/>
        </Link>
      }
      {/* <Link to="/" className="logoLink">
        <img className="imgSmall" alt="" src="favicon.ico"/>
      </Link> */}
      <div className="header__links">
        <span className="HideOnTabLand HideOnMobile">
          <NavLink to="/about" className="header__links--link" activeClassName="header__links--link--active">About</NavLink>
        </span>
        <span className="HideOnTabLand HideOnMobile">
          <NavLink to="/resources" className="header__links--link" activeClassName="header__links--link--active">Resources</NavLink>
        </span>
        <span className="HideOnTabLand HideOnMobile">
          <NavLink to="/program" className="header__links--link" activeClassName="header__links--link--active">Programs</NavLink>
        </span>
        <span className="HideOnTabLand HideOnMobile">
          <NavLink to="/volunteer" className="header__links--link" activeClassName="header__links--link--active">Volunteer</NavLink>
        </span>
        <div className=" HideOnMobile" style={{ height: "100%"}}>
          {currentUser ?
            <Link to="dashboard" className="header__links--cta">
              {usersImageUrl ? 
                <img src={usersImageUrl} alt="" /> :
                <div className="thumbnail">
                  <p className="text">{`${usersFirstName[0]}${usersLastName[0]}`}</p>
                </div>
              }
              <p>{usersFirstName ? usersFirstName : "Hello"}</p>
            </Link> :
            <Link to="sign-in" className="header__links--cta"><p>Log In</p></Link>
          }
        </div>
        <span className=" HideOnMobile">
          <a href="https://www.canadahelps.org/en/dn/t/32254" target="_blank" className="basketDonateButton">
            <i className="fas fa-hand-holding-heart"></i>
            <h2>Donate</h2>
          </a>
        </span>
      </div>
    </div>
  );
}

const mapStateToProps = ({user : currentUser}) => ({
  currentUser: currentUser.currentUser,
})

export default connect(mapStateToProps)(withRouter(Header));
