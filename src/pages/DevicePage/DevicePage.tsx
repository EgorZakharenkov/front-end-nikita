import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosBase from "../axios/axiosBase";
import { useAppDispatch } from "../redux/hooks";

const TestPage = () => {
  const { id } = useParams();
  const [device, setDevice] = useState<any>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    axiosBase.get(`/device/${id}`).then(({ data }) => {
      setDevice(data);
    });
  }, [id]);
  return device ? (
    <div>Название : {device.name}</div>
  ) : (
    <div>Загрузка данных</div>
  );
};

export default TestPage;
