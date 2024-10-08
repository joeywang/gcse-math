import React from 'react';
import {
  Box,
  Button,
  SimpleGrid,
  Heading,
  VStack,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { useTopic } from '../hooks/useTopic';

const TopicSelection = ({ onSelectTopic }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const hoverBgColor = useColorModeValue('brand.50', 'gray.600');
  const { topics, isLoading, error } = useTopic();

  if (isLoading) {
    return (
      <Box textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Loading topics...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={8} align="stretch">
      <Heading as="h1" size="xl" textAlign="center">
        Select a GCSE Math Topic
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {topics.map((topic) => (
          <Button
            key={topic.topic}
            onClick={() => onSelectTopic(topic)}
            height="auto"
            whiteSpace="normal"
            textAlign="left"
            py={4}
            bg={bgColor}
            _hover={{ bg: hoverBgColor }}
          >
            {topic.topic}
          </Button>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default TopicSelection;