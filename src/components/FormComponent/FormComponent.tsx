import React, { FC, useEffect, useState } from "react";
import FormInput from "../FormInput/FormInput";
import "./styles.scss";
import Buttons from "../Buttons/Buttons";
import DecausedApiRequest from "../../api/Decaused/Decaused";
import { fieldToArray } from "../UI/functions/functions";
import dataPressReducer from "../../store/reducers/dataPressItem/dataPressItemReducer";
import { useDispatch, useSelector } from "react-redux";
import { DataPressActionCreators } from "../../store/reducers/dataPressItem/action-creator";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../routes";
import { DeceasedActionCreators } from "../../store/reducers/deceased/action-creatorDeceased";

interface IOption {
  id: number;
  label: string;
  type: string;
}

interface IFilterOption {
  key: string;
  value: IOption;
}

const FormComponent: FC = () => {
  const decausedApi = new DecausedApiRequest();
  const [filterOptions, setFilterOptions] = useState<IFilterOption[]>([]);
  const dispatch = useDispatch();
  const dataPress = useSelector(
    (state: any) => state.dataPressReducer.dataPress
  );

  const navigate = useNavigate();

  useEffect(() => {
    decausedApi.options().then((resp) => {
      if (resp.success) {
        setFilterOptions(
          //@ts-ignore
          fieldToArray(resp.data.actions.filter) as IFilterOption[]
        );
      }
    });
  }, []);

  const handleChange = (fieldName: string, fieldValue: string | boolean) => {
    dispatch(DataPressActionCreators.setDataPress(fieldName, fieldValue));
  };

  const handleSearchDeceased = () => {
    const queryParams = fieldToArray(dataPress)
      .map((item) => `${item.key}=${item.value}`)
      .join("&");
    const urlParams = `?${queryParams}`;

    decausedApi.list({ urlParams }).then((resp) => {
      console.log(resp);
      if (resp.success) {
        dispatch(
          //@ts-ignore
          DeceasedActionCreators.setDeceased(resp.data && resp.data.results)
        );
        navigate(RouteNames.SEARCH);
      }
    });
  };

  console.log("dataPress", dataPress);

  return (
    <div className={`containerForm`}>
      <h1 className="formTitle">Поиск захоронений по Белгородской области</h1>
      {filterOptions.length !== 0 && (
        <div className="containerFormInputs">
          <div className="nameInputsContainer">
            {filterOptions.slice(0, 3).map((item) => (
              <FormInput
                key={item.key}
                type={item.value.type}
                style={`formItem ${dataPress[item.key] ? "focus" : ""}`}
                value={undefined}
                onChange={(e) => {
                  handleChange(item.key, e);
                }}
                subInput={item.value.label}
                required={false}
                error={""}
                keyData={""}
              />
            ))}
          </div>
          {filterOptions.slice(3).map((item) => (
            <FormInput
              key={item.key}
              type={item.value.type}
              style={`formItem ${dataPress[item.key] ? "focus" : ""}`}
              value={undefined}
              onChange={(e) => {
                handleChange(item.key, e);
              }}
              subInput={item.value.label}
              required={false}
              error={""}
              keyData={""}
            />
          ))}
          <Buttons
            text={"Найти"}
            onClick={() => {
              handleSearchDeceased();
            }}
            className="searchButton"
          />
        </div>
      )}
    </div>
  );
};

export default FormComponent;
