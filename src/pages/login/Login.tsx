import React, { useState } from "react";
import styles from "../register/style.module.scss";
import { Button, TextField } from "@mui/material";
import { fetchRegister, fetchUserData } from "../../redux/slices/user";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const login = async () => {
    const values = {
      email,
      password,
    };
    const data = await dispatch(fetchUserData(values));
    if (!data.payload) return alert("Не удалось зарегистрироваться");

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      navigate("/");
    }
  };
  return (
    <div>
      <form onSubmit={login} className={styles.register}>
        <TextField
          label={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"email"}
        />
        <TextField
          label={"пароль"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"пароль"}
        />
        <Button onClick={login} variant={"contained"} children={"Войти"} />
        <span>
          Нет аккаунта? <Link to={"/register"}>Зарегистрироваться</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
