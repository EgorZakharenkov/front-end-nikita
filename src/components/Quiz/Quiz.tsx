// src/components/Quiz.js
import React, { useEffect, useState } from "react";
import Question from "../Question/Question";
import styles from "./style.module.scss";

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface QuestionType {
  title: string;
  answers: Answer[];
}

interface TestType {
  questions: QuestionType[];
}

const Quiz: React.FC<{ data: TestType | undefined }> = ({ data }) => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [score, setScore] = useState<number | null>(null);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState<boolean>(false);

  useEffect(() => {
    if (data && data.questions) {
      setQuestions(data.questions);
    }
  }, [data]);

  const handleAnswerClick = (questionTitle: string, answerText: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionTitle]: answerText,
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((question) => {
      const correctAnswer = question.answers.find(
        (answer) => answer.isCorrect,
      )?.text;
      if (selectedAnswers[question.title] === correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  const handleViewAnswers = () => {
    setShowCorrectAnswers(!showCorrectAnswers);
  };

  return (
    <div className={styles.quizContainer}>
      <h1 className={styles.quizTitle}>Тест</h1>
      {questions.length > 0 ? (
        <div>
          {questions.map((question, index) => (
            <Question
              key={index}
              question={question}
              handleAnswerClick={handleAnswerClick}
              selectedAnswer={selectedAnswers[question.title]}
              showCorrectAnswers={showCorrectAnswers}
            />
          ))}
          <button
            disabled={Object.keys(selectedAnswers).length === 0}
            className={styles.submitButton}
            onClick={handleSubmit}
          >
            Пройти
          </button>
          <button
            className={styles.viewAnswersButton}
            onClick={handleViewAnswers}
          >
            {showCorrectAnswers ? "Скрыть" : "Просмотреть правильные ответы"}
          </button>
          {score !== null && (
            <h2 className={styles.score}>
              Ты ответил правильно на {score} из {questions.length} вопросов
            </h2>
          )}
        </div>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
};

export default Quiz;
