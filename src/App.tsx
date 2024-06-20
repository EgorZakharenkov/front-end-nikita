import React, { useEffect } from "react";
import SideBar from "./components/SideBar/SideBar";
import { Route, Routes } from "react-router-dom";
import DevicePage from "./pages/DevicePage/DevicePage";
import CreateDevice from "./pages/CreateDevice/CreateDevice";
import { useAppDispatch } from "./redux/hooks";
import { getDevices } from "./redux/slices/DeviceSlice";
import Main from "./pages/MainPage/Main";
import Header from "./components/Header/Header";
import CreateTest from "./pages/CreateTest/CreateTest";
import TestPage from "./pages/TestPage/TestPage";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { fetchAuthMe } from "./redux/slices/user";
import styles from "./style.module.scss";
import CreateInfoPage from "./pages/CreateInfoPage/CreateInfoPage";
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDevices());
    dispatch(fetchAuthMe());
  }, []);
  return (
    <div className={styles.app}>
      <SideBar />
      <div className={styles.content}>
        <Header />
        <Routes>
          <Route element={<DevicePage />} path={"/:id"} />
          <Route element={<Main />} path={"/"} />
          <Route element={<CreateTest />} path={"/createTest/:id"} />
          <Route element={<CreateTest />} path={"/editTest/:id"} />
          <Route element={<CreateInfoPage />} path={"/createInfo/:id"} />
          <Route element={<CreateInfoPage />} path={"/editCard/:id"} />
          <Route element={<CreateDevice />} path={"/createDevice"} />
          <Route element={<TestPage />} path={"/test/:id"} />
          <Route element={<Register />} path={"/register"} />
          <Route element={<Login />} path={"/login"} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
