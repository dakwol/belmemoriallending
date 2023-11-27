import React, { FC } from "react";
import icons from "../../assets/icons/icons";
import "./styles.scss";
import { useDispatch } from "react-redux";

const Header: FC = () => {
  const dispatch = useDispatch();
  // const { user } = useTypeSelector((state) => state.authReducer);
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const dataNav = [
    {
      id: 1,
      label: "Поиск захоронений",
    },
    {
      id: 2,
      label: "Услуги",
    },
    {
      id: 3,
      label: "Исполнители",
    },
    {
      id: 4,
      label: "Помощь",
    },
  ];

  return (
    <header className="header">
      <div className="containerHeader">
        <div className="headerLogoText">
          <img src={icons.Logo} />
          <p>Региональный ритуальный сервис Белгородской области</p>
        </div>
        <nav className="userHeaderContainer">
          {dataNav.map((item) => {
            return <a>{item.label}</a>;
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
