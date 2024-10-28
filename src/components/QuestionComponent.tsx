import { useState } from "react";
import HeaderComponent from "./HeaderComponent";

const QuestionsComponent = () => {
    const [score, setScore] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState<{ [key: number]: { isCorrect: boolean, selectedAnswer: number | null } }>({});
    const totalQuestions = 3;

    const handleAnswer = (questionIndex: number, answerIndex: number, isCorrect: boolean) => {
        if (answeredQuestions[questionIndex] === undefined) {
            setAnsweredQuestions({
                ...answeredQuestions,
                [questionIndex]: { isCorrect, selectedAnswer: answerIndex }
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

    const questions = [
        {
            question: "What is the capital of France?",
            answers: [
                { text: "Paris", isCorrect: true },
                { text: "London", isCorrect: false },
                { text: "Berlin", isCorrect: false },
                { text: "Rome", isCorrect: false }
            ]
        },
        {
            question: "Which planet is known as the red planet?",
            answers: [
                { text: "Earth", isCorrect: false },
                { text: "Mars", isCorrect: true },
                { text: "Jupiter", isCorrect: false },
                { text: "Venus", isCorrect: false }
            ]
        },
        {
            question: "What is the largest ocean on Earth?",
            answers: [
                { text: "Atlantic Ocean", isCorrect: false },
                { text: "Indian Ocean", isCorrect: false },
                { text: "Arctic Ocean", isCorrect: false },
                { text: "Pacific Ocean", isCorrect: true }
            ]
        }
    ];

    return (
        <div className="flex flex-col items-center text-center bg-gray-100 text-black p-8">
            <HeaderComponent score={score} totalQuestions={totalQuestions} />

            {questions.map((q, qIndex) => (
                <div key={q.question} className="bg-white p-2 w-96 mx-auto mb-4">
                    <div>
                        <h1 className="p-2 font-bold text-left">{q.question}</h1>
                    </div>
                    <div className="">
                        <ul>
                            {q.answers.map((a, aIndex) => {
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
                            })}
                        </ul>
                    </div>
                </div>
            ))}

            {Object.keys(answeredQuestions).length === totalQuestions && (
                <div className="text-green-500 font-bold mt-4">
                    Congratulations you have finished the quiz! Your final score is {score} out of {totalQuestions}
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
}

export default QuestionsComponent;