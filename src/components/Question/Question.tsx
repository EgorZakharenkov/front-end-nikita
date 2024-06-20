// src/components/Question.js
import React from "react";
import styles from "./style.module.scss";

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface QuestionProps {
  question: {
    title: string;
    answers: Answer[];
  };
  handleAnswerClick: (questionTitle: string, answerText: string) => void;
  selectedAnswer: string;
  showCorrectAnswers: boolean;
}

const Question: React.FC<QuestionProps> = ({
  question,
  handleAnswerClick,
  selectedAnswer,
  showCorrectAnswers,
}) => {
  return (
    <div className={styles.questionContainer}>
      <h3 className={styles.questionTitle}>{question.title}</h3>
      <div className={styles.answers}>
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(question.title, answer.text)}
            className={`${styles.answerButton} ${
              selectedAnswer === answer.text ? styles.selected : ""
            } ${showCorrectAnswers && answer.isCorrect ? styles.correctAnswer : ""}`}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
