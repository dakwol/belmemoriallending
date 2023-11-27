import React, { FC } from "react";
import icons from "../../assets/icons/icons";
import "./styles.scss";

const Footer: FC = () => {
  return (
    <header className="footer">
      <div className="containerFooter">
        <div className="footerLogoText">
          <img src={icons.LogoWhite} />
          <p>Региональный ритуальный сервис Белгородской области</p>
        </div>
      </div>
    </header>
  );
};

export default Footer;
