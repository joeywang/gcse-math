import React, { useState } from 'react';
import { Box, VStack, useColorModeValue } from '@chakra-ui/react';
import DarkModeToggle from './components/DarkModeToggle';
import TopicSelection from './components/TopicSelection';
import QuizComponent from './components/QuizComponent';

const App = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box maxWidth="1200px" margin="auto" padding={8} minHeight="100vh" bg={bgColor} color={textColor}>
      <DarkModeToggle />
      <VStack spacing={8}>
        {selectedTopic ? (
          <QuizComponent topic={selectedTopic} />
        ) : (
          <TopicSelection onSelectTopic={handleSelectTopic} />
        )}
      </VStack>
    </Box>
  );
};

export default App;