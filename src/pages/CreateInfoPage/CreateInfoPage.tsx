import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { Button, TextField } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import axiosBase from "../../axios/axiosBase";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router";

const CreateInfoPage = () => {
  const [name, setName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const deviceName = useAppSelector((state) => state.device.testName);
  const location = useLocation();
  const handleCreate = async () => {
    location.pathname.includes("editCard")
      ? axiosBase.put(`/info/${id}`, { name, description, image }).then(() => {
          setName("");
          setDescription("");
          setImage("");
        })
      : axiosBase.post(`/info/${id}`, { name, description, image }).then(() => {
          navigate(`/${id}`);
        });
  };
  useEffect(() => {
    if (location.pathname.includes("editCard")) {
      axiosBase.get(`/info/${id}`).then(({ data }) => {
        setName(data.name);
        setDescription(data.description);
        setImage(data.image);
      });
    }
  }, [location]);
  return (
    <div className={styles.createInfo}>
      <form onSubmit={handleCreate}>
        <h2>Создание карточки для: {deviceName}</h2>
        <TextField
          label={"Название"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label={"Описание"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label={"Ссылка на картинку"}
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button
          onClick={handleCreate}
          variant={"contained"}
          size={"medium"}
          children={"Создать"}
        />
      </form>
    </div>
  );
};

export default CreateInfoPage;
