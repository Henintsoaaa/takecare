"use client";

import React, { useState, useEffect } from "react";

type Domain = {
  domain: string;
  questions: {
    question: string;
    options: { [key: string]: string };
    correct_answer_index: number;
  }[];
};

interface AnswerSelectionProps {
  index: number;
}

const Quiz = () => {
  const [questionsData, setQuestionsData] = useState<Domain[] | null>(null);
  const [selectedDomainIndex, setSelectedDomainIndex] = useState<number | null>(
    null
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Fetching JSON data from the public folder
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/questions.json");
        const data = await response.json();
        setQuestionsData(data.quiz);
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  if (!questionsData) {
    return (
      <div className="flex justify-center items-center h-full bg-gray-200">
        <p className="text-gray-700 text-xl">Loading questions...</p>
      </div>
    );
  }

  const handleStartQuiz = (index: number) => {
    setSelectedDomainIndex(index);
  };

  const handleAnswerSelection = ({ index }: AnswerSelectionProps) => {
    setSelectedAnswer(index);
    if (index === currentQuestion.correct_answer_index) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestionIndex < currentDomain.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setSelectedDomainIndex(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  if (selectedDomainIndex === null) {
    return (
      <div className="flex flex-col justify-center items-center h-full bg-gradient-to-br from-primary-light via-secondary-light to-pink-500 text-white">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold mb-4">
            🎓 Welcome to the Quiz
          </h1>
          <p className="text-lg">Choose a domain to start!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {questionsData.map((domain: Domain, index: number) => (
            <button
              key={index}
              className="px-8 py-6 bg-white text-primary-light font-semibold text-lg rounded-lg shadow-md hover:scale-105 transform transition duration-300"
              onClick={() => handleStartQuiz(index)}
            >
              {domain.domain}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const currentDomain = questionsData[selectedDomainIndex];
  const currentQuestion = currentDomain.questions[currentQuestionIndex];

  const isCorrectAnswer =
    selectedAnswer === currentQuestion.correct_answer_index;
  const correctAnswerText =
    currentQuestion.options[currentQuestion.correct_answer_index];

  if (quizFinished) {
    return (
      <div className="flex flex-col justify-center items-center h-full bg-gradient-to-br from-primary-light via-secondary-light to-pink-500 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Quiz Finished!</h1>
        <p className="text-2xl">Your final score is:</p>
        <p className="text-5xl font-bold mt-2">
          {score} / {currentDomain.questions.length}
        </p>
        <button
          className="mt-6 px-6 py-3 bg-white text-primary-light font-bold rounded-lg shadow-md hover:scale-105 transform transition"
          onClick={handleRestartQuiz}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {currentDomain.domain}
        </h1>
        <h2 className="text-xl font-semibold text-gray-700">
          {currentQuestion.question}
        </h2>
        <div className="mt-6">
          {Object.entries(currentQuestion.options).map(([key, option]) => (
            <button
              key={key}
              className={`w-full text-left py-3 px-4 mb-4 rounded-lg border transition ${
                selectedAnswer !== null
                  ? selectedAnswer === parseInt(key)
                    ? selectedAnswer === currentQuestion.correct_answer_index
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-red-500 text-white border-red-500"
                    : "bg-gray-200 text-gray-800"
                  : "bg-white hover:bg-gray-100 border-gray-300"
              }`}
              onClick={() => handleAnswerSelection({ index: parseInt(key) })}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
        {selectedAnswer !== null && (
          <div className="mt-4">
            {isCorrectAnswer ? (
              <p className="text-green-600 font-bold">Correct answer! 🎉</p>
            ) : (
              <p className="text-red-600 font-bold">
                Wrong answer. The correct answer was: {correctAnswerText}.
              </p>
            )}
            <button
              className="mt-6 w-full py-3 bg-primary-light text-white rounded-lg hover:bg-primary-light transition"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
