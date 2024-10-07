import React, { useState } from 'react';
import { VStack, Heading } from '@chakra-ui/react';
import QuestionCard from './QuestionCard';
import iterationQuestions from '../data/iteration.json';
import quadraticSequences from '../data/quadraticSequences.json';

const QuizComponent = ({ topic }) => {
  const quizData = [
    iterationQuestions,
    quadraticSequences,
  ]
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions = quizData[Math.round(Math.random()*10) % 2].questions;

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz finished logic here
      console.log("Quiz finished!");
    }
  };

  return (
    <VStack spacing={8}>
      <Heading as="h2" size="xl">
        {topic} Quiz
      </Heading>
      <QuestionCard
        question={questions[currentQuestionIndex]}
        onNext={handleNextQuestion}
      />
    </VStack>
  );
};

export default QuizComponent;
