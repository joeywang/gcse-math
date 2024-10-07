import React, { useState } from 'react';
import { Box, Heading, VStack, useColorModeValue } from '@chakra-ui/react';
import QuestionCard from './components/QuestionCard';
import DarkModeToggle from './components/DarkModeToggle';
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

  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.800', 'white')

  return (
    <Box maxWidth="800px" margin="auto" padding={8} minHeight="100vh" bg={bgColor}>
      <DarkModeToggle />
      <VStack spacing={8}>
        <Heading as="h1" size="xl" color={textColor}>
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
