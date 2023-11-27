import React, { FC } from "react";
import { useSelector } from "react-redux";
import { IDeceased } from "../../models/IDeceased";
import "./styles.scss";
import { getFormatedDate } from "../UI/functions/functions";
import Buttons from "../Buttons/Buttons";
import icons from "../../assets/icons/icons";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../routes";

const ContainerSearchCard: FC = () => {
  const decausedData = useSelector(
    (state: any) => state.deceasedReducer.deceased
  );

  const navigate = useNavigate();

  console.log("decausedData", decausedData);
  return (
    <div className="searchCardContainer">
      <Buttons
        ico={icons.Arrow}
        text="Назад"
        onClick={() => {
          navigate(RouteNames.MEMORIAL);
        }}
        className="buttonBack"
      />
      <h1 className="decausedTitle">Результат поиска</h1>
      <h5 className="decausedSubTitle">{`Найдено ${decausedData?.length} захоронений`}</h5>
      <div className="containerCardDecaused">
        {decausedData?.map((item: IDeceased) => {
          return (
            <div
              className="cardDecaused"
              key={item.id}
              onClick={() => navigate(`${RouteNames.DECEASED}/${item.id}`)}
            >
              <h3>{`${item.last_name} ${item.first_name} ${item.patronymic}`}</h3>
              <span>
                {`${getFormatedDate(
                  item.birth_date ? item.birth_date : ""
                )}-${getFormatedDate(item.death_date ? item.death_date : "")}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContainerSearchCard;
