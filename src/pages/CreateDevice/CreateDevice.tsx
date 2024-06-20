import React, { useState } from "react";
import styles from "./style.module.scss";
import { Button, TextField } from "@mui/material";
import axiosBase from "../../axios/axiosBase";
const CreateDevice = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    await axiosBase.post("/device", { name, image, description });
  };
  return (
    <div className={styles.form}>
      <h2>Добавить устройство</h2>
      <form onSubmit={handleCreate}>
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

export default CreateDevice;
