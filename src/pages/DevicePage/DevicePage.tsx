// src/components/DevicePage.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosBase from "../../axios/axiosBase";
import styles from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Button } from "@mui/material";
import { setTestName } from "../../redux/slices/DeviceSlice";

const DevicePage = () => {
  const { id } = useParams();
  const [device, setDevice] = useState<any>();
  const [showTests, setShowTests] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateTest = () => {
    navigate(`/createTest/${id}`);
    dispatch(setTestName(device.name));
  };
  const handleRemoveCard = async (id: string) => {
    await axiosBase.delete(`/info/${id}`).then(() => {
      navigate("/");
    });
  };
  const handleEditCard = async (id: string) => {
    navigate(`/editCard/${id}`);
  };
  const handleCreateCard = () => {
    navigate(`/createInfo/${id}`);
    dispatch(setTestName(device.name));
  };

  useEffect(() => {
    axiosBase.get(`/device/${id}`).then(({ data }) => {
      setDevice(data);
    });
  }, [id]);

  return device ? (
    <div className={styles.device}>
      <div>Название : {device.name}</div>
      <div>Описание : {device.description}</div>
      <img src={device.image} alt="" />
      {user && user.role === "admin" && (
        <div>
          <Button onClick={handleCreateTest}>Создать тест</Button>
          <Button onClick={handleCreateCard}>Создать карточку</Button>
        </div>
      )}
      <Button onClick={() => setShowTests(!showTests)}>
        {showTests ? "Скрыть" : "Пройти тесты"}
      </Button>
      <Button onClick={() => setShowCard(!showCard)}>
        {showCard ? "Скрыть" : "Показать карточки"}
      </Button>
      {showTests && (
        <div className={styles.wrapperTest}>
          <h2>Нажмите чтобы пройти тест</h2>
          <div className={styles.tests}>
            {device.tests.map((test: any) => (
              <Link to={`/test/${test._id}`} key={test._id}>
                <Button variant={"contained"}>{test.title}</Button>
              </Link>
            ))}
          </div>
        </div>
      )}
      <div>
        {showCard && (
          <div>
            <h2>Карточки с информацией о: {device.name}</h2>
            <div className={styles.cards}>
              {device.infos.map(
                (info: {
                  _id: string;
                  name: string;
                  description: string;
                  image: string;
                }) => (
                  <div className={styles.infoCard} key={info.name}>
                    <img src={info.image} alt="" />
                    <h2>{info.name}</h2>
                    <p>{info.description}</p>
                    {user && user.role === "admin" && (
                      <div style={{ display: "flex", gap: "10px" }}>
                        <Button
                          variant={"contained"}
                          onClick={() => handleEditCard(info._id)}
                        >
                          Изменить
                        </Button>
                        <Button
                          onClick={() => handleRemoveCard(info._id)}
                          color={"error"}
                          variant={"contained"}
                        >
                          Удалить
                        </Button>
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>Загрузка данных</div>
  );
};

export default DevicePage;
