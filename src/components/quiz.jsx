import React, { useState } from 'react';
import quizData from '../data/quadraticSequences.json';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = quizData.questions[currentQuestionIndex];

  // Render the question based on its type
  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'sequence':
        return (
          <div>
            <p>{currentQuestion.text}</p>
            <p>Sequence: {currentQuestion.sequence.join(', ')}, ...</p>
            {/* Add input fields for user answer */}
          </div>
        );
      case 'nthTerm':
        return (
          <div>
            <p>{currentQuestion.text}</p>
            <p>nth term: {currentQuestion.nthTerm}</p>
            {/* Add input field for user answer */}
          </div>
        );
      // Add cases for other question types
    }
  };

  return (
    <div>
      <h1>{quizData.quizTitle}</h1>
      {renderQuestion()}
      {/* Add navigation buttons, answer checking logic, etc. */}
    </div>
  );
};

export default Quiz;
