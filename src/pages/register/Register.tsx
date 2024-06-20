import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "../../axios/axiosBase";
import styles from "./style.module.scss";
import { useAppDispatch } from "../../redux/hooks";
import { fetchRegister } from "../../redux/slices/user";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const register = async () => {
    const values = {
      email,
      password,
    };
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) return alert("Не удалось зарегистрироваться");

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      navigate("/");
    }
  };
  return (
    <div>
      <form className={styles.register} onSubmit={register}>
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
        <Button
          onClick={register}
          variant={"contained"}
          children={"Зарегистрироваться"}
        />
        <span>
          Есть аккаунт? <Link to={"/login"}>Войти</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
