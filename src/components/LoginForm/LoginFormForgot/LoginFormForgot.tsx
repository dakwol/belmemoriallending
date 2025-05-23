import React, { FC, useState } from "react";
import FormInput from "../../FormInput/FormInput";
import { useDispatch } from "react-redux";
import { useTypeSelector } from "../../../hooks/useTypedSelector";
import Buttons from "../../Buttons/Buttons";
import icons from "../../../assets/icons/icons";
import ResetPasswordApiRequest from "../../../api/User/ResetPassword";
import { AuthActionCreators } from "../../../store/reducers/auth/action-creator";

interface LoginForgotProps {
  onAuth: () => void;
}

const LoginFormForgot: FC<LoginForgotProps> = ({ onAuth }) => {
  const dispatch = useDispatch();

  const { error, isLoading } = useTypeSelector((state) => state.authReducer);

  const [email, setEmail] = useState("");
  const resetPasswordApi = new ResetPasswordApiRequest();
  const submit = () => {
    dispatch(AuthActionCreators.setErr(""));
    if (email !== "" && email !== undefined && email !== null) {
      resetPasswordApi.create({ body: { email: email } }).then((resp) => {
        if (resp.success) {
          onAuth();
        } else {
          dispatch(
            AuthActionCreators.setErr("Произошла ошибка обработки запроса")
          );
        }
      });
    } else {
      dispatch(AuthActionCreators.setErr("Поля не заполнены"));
    }
  };
  return (
    <>
      <h1>Восстановление пароля</h1>
      <FormInput
        style={""}
        value={undefined}
        onChange={(e) => {
          setEmail(e);
        }}
        subInput={"Электронная почта"}
        required={true}
        error={error}
        keyData={""}
        loading={isLoading}
        type="email"
        friedlyInput={true}
      />
      <Buttons
        // ico={isLoading ? icons.lock : ""}
        text={"Отправить"}
        onClick={() => {
          submit();
        }}
        className="buttonLogin"
      />
      <p
        className="backButton"
        onClick={() => {
          onAuth();
        }}
      >
        Вернуться назад
      </p>
    </>
  );
};

export default LoginFormForgot;
