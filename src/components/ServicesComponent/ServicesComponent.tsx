import React, { FC } from "react";
import Buttons from "../Buttons/Buttons";
import icons from "../../assets/icons/icons";
import "./styles.scss";

const ServicesComponent: FC = () => {
  const dataServices = [
    {
      id: 1,
      title: "Возложим цветы: гвоздики, розы и хризантемы ",
      icon: icons.flower,
    },
    {
      id: 2,
      title: "Уберем сорняки и мусор, помоем памятник",
      icon: icons.Cleaning,
    },
    {
      id: 3,
      title: "Покрасим оградку, зачистим ее от старой краски и ржавчины",
      icon: icons.Design,
    },
  ];

  return (
    <div className="containerServices">
      <h1 className="servicesTitle">Заказ услуги по уходу за захоронениями</h1>
      <h2 className="servicesSubTitle">
        Выберите необходимую услугу, укажите предполагаемый бюджет и сроки
        Полный список услуг доступен в карточке заказа
      </h2>

      <div className="conteinerCardsRow">
        {dataServices.map((item) => (
          <div key={item.id} className="containerCard">
            <h3>{item.title}</h3>
            <Buttons
              text={"Заказать"}
              onClick={() => {}}
              ico={item.icon}
              className="searchButton"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesComponent;
