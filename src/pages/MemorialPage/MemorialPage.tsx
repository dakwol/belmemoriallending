import React, { FC, useEffect, useState } from "react";
import "./styles.scss";
import LoginForm from "../../components/LoginForm/LoginForm";
import icons from "../../assets/icons/icons";
import Header from "../../components/Header/Header";
import FormComponent from "../../components/FormComponent/FormComponent";
import ServicesComponent from "../../components/ServicesComponent/ServicesComponent";
import Footer from "../../components/Footer/Footer";
import { useDispatch } from "react-redux";
import { useTypeSelector } from "../../hooks/useTypedSelector";
import { AuthActionCreators } from "../../store/reducers/auth/action-creator";

const MemorialPage: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("forlending@user.com");
  const [password, setPassword] = useState("8hJ-wRU-mSZ-3qB");

  useEffect(() => {
    dispatch(AuthActionCreators.setErr(""));
    if (
      email !== undefined &&
      email !== "" &&
      password !== "" &&
      password != undefined
    ) {
      //@ts-ignore
      dispatch(AuthActionCreators.login(email, password));
    } else {
      dispatch(AuthActionCreators.setErr("Заполните обязательные поля"));
    }
  }, []);

  return (
    <div className="containerFull">
      <img src={icons.bgImg} className="conainerBgImg"></img>
      <div className="containerPage">
        <Header />
        <FormComponent />
      </div>
      <div className="containerPage">
        <ServicesComponent />
      </div>
      <Footer />
    </div>
  );
};

export default MemorialPage;
