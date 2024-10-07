import React, { useState } from 'react';
import { VStack, Heading, Text, Spinner } from '@chakra-ui/react';
import QuestionCard from './QuestionCard';
import { useQuestions } from '../services/questionLoader';

const QuizComponent = ({ topic }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { questions, isLoading, error } = useQuestions(topic);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz finished logic here
      console.log("Quiz finished!");
    }
  };

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  if (questions.length === 0) {
    return <Text>No questions available for this topic.</Text>;
  }

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
