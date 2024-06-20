import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "./style.module.scss";
import { useAppSelector } from "../../redux/hooks";
import axiosBase from "../../axios/axiosBase";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router";

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  title: string;
  answers: Answer[];
}

const CreateTest: React.FC = () => {
  const [formData, setFormData] = useState<{
    title: string;
    questions: Question[];
  }>({
    title: "",
    questions: [],
  });
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const testName = useAppSelector((state) => state.device.testName);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (value: string, index: number) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = { ...newQuestions[index], title: value };
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { title: "", answers: [] }],
    });
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...formData.questions];
    newQuestions.splice(index, 1);
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleAnswerChange = (
    value: string,
    questionIndex: number,
    answerIndex: number,
  ) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].answers[answerIndex].text = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleCorrectChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    answerIndex: number,
  ) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].answers[answerIndex].isCorrect =
      e.target.checked;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleAddAnswer = (questionIndex: number) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].answers.push({ text: "", isCorrect: false });
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleRemoveAnswer = (questionIndex: number, answerIndex: number) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].answers.splice(answerIndex, 1);
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    location.pathname.includes("editTest")
      ? axiosBase.put(`/test/${id}`, formData).then(() => navigate("/"))
      : axiosBase.post(`/test/${id}`, formData).then(() => {
          navigate(`/${id}`);
        });
  };

  useEffect(() => {
    if (location.pathname.includes("editTest")) {
      axiosBase.get(`/test/${id}`).then(({ data }) => {
        setFormData({
          title: data.title,
          questions: data.questions,
        });
      });
    }
  }, [location, id]);

  return (
    <div>
      <h2>
        Создание теста для : {testName != null ? testName : "Загрузка..."}
      </h2>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div>
          <TextField
            label={"Название теста"}
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        {formData.questions.map((question, questionIndex) => (
          <div key={questionIndex} className={styles.questionContainer}>
            <TextField
              label={`Вопрос ${questionIndex + 1}`}
              value={question.title}
              onChange={(e) =>
                handleQuestionChange(e.target.value, questionIndex)
              }
            />
            <Button onClick={() => handleAddAnswer(questionIndex)}>
              Добавить ответ
            </Button>
            <Button onClick={() => handleRemoveQuestion(questionIndex)}>
              Удалить вопрос
            </Button>
            {question.answers.map((answer, answerIndex) => (
              <div style={{ marginTop: "10px" }} key={answerIndex}>
                <TextField
                  label={`Ответ ${answerIndex + 1}`}
                  value={answer.text}
                  onChange={(e) =>
                    handleAnswerChange(
                      e.target.value,
                      questionIndex,
                      answerIndex,
                    )
                  }
                />
                <label>
                  <input
                    type="checkbox"
                    checked={answer.isCorrect}
                    onChange={(e) =>
                      handleCorrectChange(e, questionIndex, answerIndex)
                    }
                  />
                  Correct
                </label>
                <Button
                  onClick={() => handleRemoveAnswer(questionIndex, answerIndex)}
                >
                  Удалить ответ
                </Button>
              </div>
            ))}
          </div>
        ))}
        <div>
          <Button type="button" onClick={handleAddQuestion}>
            Добавить вопрос
          </Button>
          <Button variant={"contained"} type="submit">
            Создать тест
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTest;
