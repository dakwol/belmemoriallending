import React, { FC, useState, useEffect, useCallback } from "react";
import {
  YMaps,
  Map,
  Polygon,
  Polyline,
  TypeSelector,
  Panorama,
  ZoomControl,
} from "@pbe/react-yandex-maps";

import "./styles.scss";
import {
  hasDoubleNestedArray,
  hasNestedArray,
} from "../UI/functions/functions";

interface MapComponentsProps {
  coordinats: any[]; // Replace 'any' with the specific type of your coordinates
  styleContainer: string;
  mapStyle: string;
  modal: boolean;
  onClose: () => void;
  onChange: () => void;
  landplot: any; // Replace 'any' with the specific type of your landplot
  activeLandploat: any; // Replace 'any' with the specific type of your activeLandploat
  optionsMap: any; // Replace 'any' with the specific type of your optionsMap
}

const MapComponents: FC<MapComponentsProps> = ({
  coordinats,
  styleContainer,
  mapStyle,
  modal,
  onClose,
  onChange,
  landplot,
  activeLandploat,
  optionsMap,
}) => {
  const [placemarks, setPlacemarks] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawPolygonCoordinates, setDrawPolygonCoordinates] = useState<any[]>(
    []
  );
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [lines, setLines] = useState<any[]>([]);

  useEffect(() => {
    setPlacemarks(coordinats);
    setDrawPolygonCoordinates([]);
    const newLine = [...coordinats];
    setLines((prevLines) => [...prevLines, newLine]);
  }, [coordinats]);

  const dataCoordCenter =
    activeLandploat !== undefined ? activeLandploat : placemarks;

  // Вычисляем средние значения широты и долготы
  let sumLat = 0;
  let sumLng = 0;
  if (hasDoubleNestedArray(placemarks)) {
    for (const coords of dataCoordCenter) {
      sumLat += coords[0][0]; // Широта (latitude)
      sumLng += coords[0][1]; // Долгота (longitude)
    }
  } else {
    for (const coords of dataCoordCenter) {
      sumLat += coords[0]; // Широта (latitude)
      sumLng += coords[1]; // Долгота (longitude)
    }
  }

  const center = {
    0: sumLat / dataCoordCenter.length,
    1: sumLng / dataCoordCenter.length,
  };

  return (
    <div className={`mapContainer ${styleContainer}`}>
      <YMaps
        query={{
          apikey: "a2718abd-328d-4bd5-a0e1-f246345a30d4",
        }}
      >
        {dataCoordCenter && (
          <Map
            defaultState={{
              //@ts-ignore
              center:
                !isNaN(center[0]) && !isNaN(center[1])
                  ? center
                  : [50.593776, 36.585727],
              zoom:
                !isNaN(center[0]) && !isNaN(center[1])
                  ? activeLandploat !== undefined
                    ? 19
                    : 18
                  : 12,
            }}
            modules={["geoObject.addon.editor"]}
            className={`mapStyle ${mapStyle}`}
          >
            <TypeSelector
              //@ts-ignore
              options={modal ? { float: "left" } : { float: "right" }}
            />
            <ZoomControl
              options={
                modal
                  ? //@ts-ignore
                    { float: "none", position: { top: 100, left: 20 } }
                  : { float: "none", position: { top: 100, right: 20 } }
              }
            />

            {dataCoordCenter.length !== 0 &&
              (hasDoubleNestedArray(placemarks) ? (
                placemarks.map((coords, index) => (
                  <Polyline
                    geometry={[...coords, coords[0]]}
                    options={{ strokeColor: "#70707B", strokeWidth: 3 }}
                  />
                ))
              ) : (
                <Polyline
                  geometry={[...placemarks, placemarks[0]]}
                  options={{ strokeColor: "#70707B", strokeWidth: 3 }}
                />
              ))}

            {selectedPoint && <Panorama defaultPoint={selectedPoint} />}

            {landplot?.map((coord: any) => {
              if (coord != null) {
                return (
                  <>
                    <Polygon
                      geometry={[coord]}
                      options={{
                        fillColor: (() => {
                          switch (coord.status) {
                            case "INVENTORY":
                              return "rgba(34, 204, 238, 0.50)";
                            case "PRIMARY_RESERVATION":
                              return "rgba(234, 170, 8, 0.50)";
                            case "FREE":
                              return "rgba(102, 198, 28, 0.50)";
                            case "RESERVATION":
                              return "rgba(239, 104, 32, 0.50)";
                            case "OCCUPIED":
                              return "rgba(112, 112, 123, 0.50)";
                            default:
                              return "rgba(255, 255, 255, 0.50)";
                          }
                        })(),
                        strokeColor: (() => {
                          let color;
                          switch (coord.status) {
                            case "INVENTORY":
                              color = "#2CE";
                              break;
                            case "PRIMARY_RESERVATION":
                              color = "#EAAA08";
                              break;
                            case "FREE":
                              color = "#66C61C";
                              break;
                            case "RESERVATION":
                              color = "#EF6820";
                              break;
                            case "OCCUPIED":
                              color = "#70707B";
                              break;
                            default:
                              color = "#000"; // Здесь можно указать значение по умолчанию
                          }

                          return color;
                        })(),

                        opacity:
                          coord?.cadastral === activeLandploat?.cadastral
                            ? 1
                            : 0.3,
                        strokeWidth: 1,
                        strokeStyle: "solid",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          background: "white",
                          padding: "2px 4px",
                          borderRadius: "4px",
                          border: "1px solid #000",
                          fontSize: "12px",
                        }}
                      >
                        Текст на полигоне: {coord.id}
                      </div>
                    </Polygon>
                    {/* <Placemark
                                        geometry={coord?.coordinates[0]} // Вы можете выбрать, где разместить текст
                                        properties={{
                                            iconContent: `${coord.id}`,
                                        }}
                                        options={{
                                            preset: 'islands#redStretchyIcon',
                                            iconColor: '#0095b6',
                                        }}
                                    /> */}
                  </>
                );
              }
            })}
          </Map>
        )}
      </YMaps>
    </div>
  );
};

export default MapComponents;
