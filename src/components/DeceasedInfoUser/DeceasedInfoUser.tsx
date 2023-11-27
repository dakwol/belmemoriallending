import React, { FC, useEffect, useState } from "react";
import DecausedApiRequest from "../../api/Decaused/Decaused";
import CemeteryApiRequest from "../../api/Cemetery/Cemetery";
import MapComponents from "../MapComponents/MapComponents";
import "./styles.scss";
import Buttons from "../Buttons/Buttons";
import icons from "../../assets/icons/icons";
import { RouteNames } from "../../routes";
import { useNavigate } from "react-router-dom";
import { getFormatedDate } from "../UI/functions/functions";

interface DeceasedInfoUserProps {
  id: string | undefined;
}
interface DeceasedData {
  id: number | undefined;
  birth_date: string | undefined;
  burial_date: string | undefined;
  cemetery_plot: string | undefined;
  death_date: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  patronymic: string | undefined;
  notes: string | undefined;
}
interface CemeteryData {
  id: number | undefined;
  burial: string | undefined;
  cemetery: number | undefined;
  coordinates: [] | undefined;
  deceased: [] | undefined;
  description: string | undefined;
  note: string | undefined;
  place: string | undefined;
  plot_number: string | undefined;
  row: string | undefined;
  sector: string | undefined;
  status: string | undefined;
  type: string | undefined;
}
interface CemeteryCoordData {
  id: number | undefined;
  area: string | undefined;
  coordinates: [] | undefined;
  date_end: string | undefined;
  date_start: string | undefined;
  description: string | undefined;
  municipality: string | undefined;
  name: string | undefined;
  status: string | undefined;
}

const DeceasedInfoUser: FC<DeceasedInfoUserProps> = ({ id }) => {
  const decausedApi = new DecausedApiRequest();
  const cemeteryApi = new CemeteryApiRequest();
  const [deceasedData, setDeceasedData] = useState<DeceasedData>();
  const [cemeteryData, setCemeteryData] = useState<CemeteryData>();
  const [cemeteryCoordinates, setCemeteryCoordinates] =
    useState<CemeteryCoordData>();
  const navigate = useNavigate();

  useEffect(() => {
    decausedApi.getById({ urlParams: id + "/" }).then((resp) => {
      console.log(resp);
      if (resp.success) {
        //@ts-ignore
        setDeceasedData(resp.data);

        cemeteryApi
          //@ts-ignore
          .getCemeteryPlots(resp?.data?.cemetery_plot + "/")
          .then((cemetry) => {
            if (cemetry.success) {
              //@ts-ignore
              setCemeteryData(cemetry?.data);

              cemeteryApi
                //@ts-ignore
                .getCemetery(cemetry?.data?.cemetery + "/")
                .then((resp) => {
                  if (resp.success) {
                    //@ts-ignore
                    setCemeteryCoordinates(resp.data);
                  }
                });
            }
          });
      }
    });
  }, []);

  console.log(cemeteryCoordinates);

  return (
    <div className="deceasedInfo">
      <div className="containerImg">
        <Buttons
          ico={icons.Arrow}
          text="Назад"
          onClick={() => {
            navigate(RouteNames.MEMORIAL);
          }}
          className="buttonBack"
        />
        <img src={icons.Logo} className="imgDeceased" />
      </div>
      <div className="containerInfo">
        <div className="containerInfoUser">
          <h1>{`${deceasedData?.last_name} ${deceasedData?.first_name} ${deceasedData?.patronymic}`}</h1>
          <span>
            {`${getFormatedDate(
              deceasedData?.birth_date ? deceasedData?.birth_date : ""
            )}-${getFormatedDate(
              deceasedData?.death_date ? deceasedData?.death_date : ""
            )}`}
          </span>

          <h2>{cemeteryCoordinates?.name}</h2>
        </div>

        <MapComponents
          //@ts-ignore
          coordinats={
            //@ts-ignore
            cemeteryCoordinates ? cemeteryCoordinates?.coordinates : []
          }
          styleContainer={"styleMapContainer"}
          mapStyle={"mapStyle"}
          modal={false}
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
          onChange={function (): void {
            throw new Error("Function not implemented.");
          }}
          landplot={cemeteryData?.coordinates ? cemeteryData?.coordinates : []}
          activeLandploat={
            cemeteryData?.coordinates ? cemeteryData?.coordinates : []
          }
          optionsMap={undefined}
        />
      </div>
    </div>
  );
};

export default DeceasedInfoUser;
