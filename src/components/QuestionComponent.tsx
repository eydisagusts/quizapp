import { useState } from "react";
import HeaderComponent from "./HeaderComponent";

const QUESTIONS = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", isCorrect: true },
      { text: "London", isCorrect: false },
      { text: "Berlin", isCorrect: false },
      { text: "Rome", isCorrect: false },
    ],
  },
  {
    question: "Which planet is known as the red planet?",
    answers: [
      { text: "Earth", isCorrect: false },
      { text: "Mars", isCorrect: true },
      { text: "Jupiter", isCorrect: false },
      { text: "Venus", isCorrect: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", isCorrect: false },
      { text: "Indian Ocean", isCorrect: false },
      { text: "Arctic Ocean", isCorrect: false },
      { text: "Pacific Ocean", isCorrect: true },
    ],
  },
] as const;

type Question = (typeof QUESTIONS)[number];
type Answer = Question["answers"][number];

const TOTAL_QUESTION_COUNT = QUESTIONS.length;

type AnsweredQuestions = {
  [key: number]: { isCorrect: boolean; selectedAnswer: number | null };
};

const QuestionsComponent = () => {
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestions>(
    {}
  );

  const handleAnswer = (
    questionIndex: number,
    answerIndex: number,
    isCorrect: boolean
  ) => {
    if (answeredQuestions[questionIndex] === undefined) {
      setAnsweredQuestions({
        ...answeredQuestions,
        [questionIndex]: { isCorrect, selectedAnswer: answerIndex },
      });
      if (isCorrect) {
        setScore(score + 1);
      }
    }
  };

  const resetGame = () => {
    setScore(0);
    setAnsweredQuestions({});
  };

  return (
    <div className="flex flex-col items-center text-center bg-gray-100 text-black p-8">
      <HeaderComponent score={score} totalQuestions={TOTAL_QUESTION_COUNT} />

      {QUESTIONS.map((q, qIndex) => (
        <Question
          q={q}
          qIndex={qIndex}
          key={q.question}
          handleAnswer={handleAnswer}
          answeredQuestions={answeredQuestions}
        />
      ))}

      {Object.keys(answeredQuestions).length === TOTAL_QUESTION_COUNT && (
        <div className="text-green-500 font-bold mt-4">
          Congratulations you have finished the quiz! Your final score is{" "}
          {score} out of {TOTAL_QUESTION_COUNT}
        </div>
      )}

      <button
        type="button"
        onClick={resetGame}
        className="mt-5 border text-white bg-blue-500 p-2 rounded-lg"
      >
        Reset Game
      </button>
    </div>
  );
};

type QuestionProps = {
  q: Question;
  qIndex: number;
  answeredQuestions: AnsweredQuestions;
  handleAnswer: (
    questionIndex: number,
    answerIndex: number,
    isCorrect: boolean
  ) => void;
};

const Question = ({
  q,
  qIndex,
  answeredQuestions,
  handleAnswer,
}: QuestionProps) => {
  return (
    <div key={q.question} className="bg-white p-2 w-96 mx-auto mb-4">
      <div>
        <h1 className="p-2 font-bold text-left">{q.question}</h1>
      </div>
      <div className="">
        <ul>
          {q.answers.map((a, aIndex) => {
            return (
              <Answer
                key={a.text}
                a={a}
                qIndex={qIndex}
                aIndex={aIndex}
                answeredQuestions={answeredQuestions}
                handleAnswer={handleAnswer}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

type AnswerProps = {
  a: (typeof QUESTIONS)[number]["answers"][number];
  qIndex: number;
  aIndex: number;
  answeredQuestions: AnsweredQuestions;
  handleAnswer: (
    questionIndex: number,
    answerIndex: number,
    isCorrect: boolean
  ) => void;
};

const Answer = ({
  a,
  handleAnswer,
  qIndex,
  aIndex,
  answeredQuestions,
}: AnswerProps) => {
  const isAnswered = answeredQuestions[qIndex] !== undefined;
  const isSelectedAnswer = answeredQuestions[qIndex]?.selectedAnswer === aIndex;
  const isCorrectAnswer = a.isCorrect;
  const buttonClass = isAnswered
    ? isCorrectAnswer
      ? "bg-green-500 text-white"
      : isSelectedAnswer
      ? "bg-red-500 text-white"
      : "bg-gray-100"
    : "bg-gray-100";
  return (
    <li key={`${qIndex}-${a.text}`} className="bg-gray-100 mt-2 p-2 rounded-lg">
      <button
        type="button"
        onClick={() => handleAnswer(qIndex, aIndex, a.isCorrect)}
        className={`p-2 rounded-lg w-full ${buttonClass}`}
        disabled={isAnswered}
      >
        {a.text}
      </button>
    </li>
  );
};

export default QuestionsComponent;
