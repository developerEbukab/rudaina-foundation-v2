import React from 'react';
import "./LifeBasketProgram.styles.scss";
import { Link } from 'react-router-dom';

const LifeBasketProgram = () => {
  return (
    <div className="lifeBasketProgramContainer">
      <div className="lifeBasketProgram">
        <div className="basket">
          <div style={{ backgroundImage: "url(" + "./img/trimester3.jpeg" + ")", backgroundRepeat : "no-repeat", backgroundSize : "100% 100%"}} className="basket-info-image-large">
            <div className="basket-info-image-medium">
              <img alt="" src="./img/community.jpeg"/>
            </div>
            <div className="basket-info-image-small">
              <img alt="" src="./img/volunteer.jpeg"/>
            </div>
          </div>
        </div>
        <div className="description">
          <h1 className="BasketTitle">Our Life Basket Program</h1>
          <div className="textContainer">
            <p className="text">
              In 2018, we launched our Life Basket Program where an expecting mother can register on our website to start receiving a “Life Basket”, which will provide tailored information and gifts for each trimester.<br></br> <br></br>
            </p>
            <p className="text">
              By offering material items that may not otherwise be purchased, we aim to reduce stress for women during pregnancy and promote a more healthful environment for infant and mother. Contents of these baskets include but are not limited to:<br></br> <br></br>
            </p>
            <div className="listItems">
              <span className="bulletPoint">&#10061;</span>
              <p>Personalized trimester booklet with advice on nutrition, exercise and resources, including motherhood-prep classes, local community help lines, councilors, therapists and group support .</p>
            </div>
            <div className="listItems">
              <span className="bulletPoint">&#10061;</span>
              <p>Complementary folic acid & multivitamin supplements.</p>
            </div>
            <div className="listItems">
              <span className="bulletPoint">&#10061;</span>
              <p>Comfort accessories, including back pillows, massagers, journals, and more!</p>
            </div>
          </div>
          <Link to="/program" className=""><p className="FilledButton">Learn More</p></Link>
        </div>
      </div>
    </div>
  );
};

export default LifeBasketProgram;
