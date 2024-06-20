import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Quiz from "../../components/Quiz/Quiz";
import axiosBase from "../../axios/axiosBase";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

const TestPage = () => {
  const { id } = useParams();
  const [test, setTest] = useState<any>();
  const user = useAppSelector((state) => state.user.data);
  const navigate = useNavigate();
  useEffect(() => {
    axiosBase.get(`/test/${id}`).then(({ data }) => {
      setTest(data);
      console.log(data);
    });
  }, []);
  const handleEditTest = async (id: string) => {
    navigate(`/editTest/${id}`);
  };
  const handleRemoveTest = async (id: string) => {
    axiosBase.delete(`/test/${id}`).then(() => {
      navigate("/");
    });
  };
  return (
    <div>
      <Quiz data={test} />
      {user && user.role === "admin" && (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant={"contained"}
            onClick={() => handleEditTest(test._id)}
          >
            Изменить
          </Button>
          <Button
            onClick={() => handleRemoveTest(test._id)}
            color={"error"}
            variant={"contained"}
          >
            Удалить
          </Button>
        </div>
      )}
    </div>
  );
};

export default TestPage;
