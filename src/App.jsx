import React, { useState } from 'react';
import { Box, VStack, useColorModeValue } from '@chakra-ui/react';
import QuestionCard from './components/QuestionCard';
import DarkModeToggle from './components/DarkModeToggle';
import TopicSelection from './components/TopicSelection';
import quizData from './data/quadraticSequences.json';

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz finished logic here
      console.log("Quiz finished!");
      setSelectedTopic(null); // Reset to topic selection
    }
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setCurrentQuestionIndex(0); // Reset question index when new topic is selected
  };

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box maxWidth="1200px" margin="auto" padding={8} minHeight="100vh" bg={bgColor} color={textColor}>
      <DarkModeToggle />
      <VStack spacing={8}>
        {selectedTopic ? (
          <>
            <h1>{selectedTopic} Quiz</h1>
            <QuestionCard 
              question={quizData.questions[currentQuestionIndex]}
              onNext={handleNextQuestion}
            />
          </>
        ) : (
          <TopicSelection onSelectTopic={handleSelectTopic} />
        )}
      </VStack>
    </Box>
  );
};

export default App;
