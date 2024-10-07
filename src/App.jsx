import React, { useState } from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import QuestionCard from './components/QuestionCard';
import quizData from './data/quadraticSequences.json';

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz finished logic here
      console.log("Quiz finished!");
    }
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="xl" color="brand.600">
          {quizData.quizTitle}
        </Heading>
        <QuestionCard 
          question={quizData.questions[currentQuestionIndex]}
          onNext={handleNextQuestion}
        />
      </VStack>
    </Box>
  );
};

export default App;
