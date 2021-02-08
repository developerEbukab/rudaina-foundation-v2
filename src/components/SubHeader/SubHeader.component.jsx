import React from 'react';
import { Link } from 'react-router-dom';
import "./SubHeader.styles.scss";

const SubHeader = () => {
  return (
    <div className="SubheaderContainer">
      <div className="Subheader">
        <div className="ctaBox">
          <p className="slogan">Help us <span className="different">Try</span> to make a</p>
          <p className="slogan"><span className="different modify">Difference</span></p>
          <p className="text">
            If you are expecting a newborn, learn how you can become a benefactor and start receiving support through your pregnancy.
          </p>
          <div className="buttonContainer">
            <Link to="/program" className="button">Learn More</Link>
          </div>
        </div>
        <div className="imageBox">
          <img alt="" src="./img/smiley.svg"/>
        </div> 
      </div>
    </div>
  );
}

export default SubHeader;
