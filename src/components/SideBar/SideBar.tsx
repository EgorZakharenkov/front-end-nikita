import React, { useState } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const user = useAppSelector((state) => state.user.data);
  const navigate = useNavigate();
  const location = useLocation();
  const items = [
    { label: "Системный блок", link: "systemBlock" },
    { label: "Процессор", link: "processor" },
    { label: "Материнская плата", link: "motherPlate" },
    { label: "Видеокарта", link: "videoCard" },
    { label: "Внутренняя память", link: "ozu" },
    { label: "Внешняя память", link: "hdd" },
    { label: "Периферийные устройства", link: "preferably" },
  ];
  const devices = useAppSelector((state) => state.device.devices);
  console.log(devices);
  return (
    <div
      className={classNames(styles.sidebar, {
        [styles.open]: open,
      })}
    >
      <button
        className={classNames({ [styles.active]: open })}
        onClick={() => setOpen(!open)}
      >
        {open ? "Закрыть" : "Открыть"}
      </button>
      <div className={styles.content}>
        {devices.map((item: any) => (
          <div
            onClick={() => navigate(`/${item._id}`)}
            className={classNames(styles.item, {
              [styles.hidden]: !open,
              [styles.active]: location.pathname === item._id,
            })}
          >
            {item.name}
            <div className={styles.hoverLine}></div>
          </div>
        ))}
      </div>
      {user && user.role === "admin" && (
        <div style={{ marginLeft: "18px" }}>
          <Link to={"/createDevice"}>Создать</Link>
        </div>
      )}
    </div>
  );
};

export default SideBar;
