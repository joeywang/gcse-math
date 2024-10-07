import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Input,
  VStack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const QuestionCard = ({ question, onNext }) => {
  const [userAnswer, setUserAnswer] = useState(
    Array.isArray(question.answer) ? Array(question.answer.length).fill('') : ''
  );
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    setUserAnswer(Array.isArray(question.answer) ? Array(question.answer.length).fill('') : '');
    setIsAnswered(false);
    setIsCorrect(false);
    setIsSubmitDisabled(true);
  }, [question]);

  useEffect(() => {
    // Check if all answers are filled
    const allAnswersFilled = Array.isArray(userAnswer)
      ? userAnswer.every(answer => answer.trim() !== '')
      : userAnswer.trim() !== '';
    setIsSubmitDisabled(!allAnswersFilled);
  }, [userAnswer]);

  const handleInputChange = (index, value) => {
    if (Array.isArray(userAnswer)) {
      const newAnswer = [...userAnswer];
      newAnswer[index] = value;
      setUserAnswer(newAnswer);
    } else {
      setUserAnswer(value);
    }
  };

  const checkAnswer = () => {
    let correct;
    if (Array.isArray(question.answer)) {
      correct = JSON.stringify(userAnswer) === JSON.stringify(question.answer);
    } else {
      correct = userAnswer.toString() === question.answer.toString();
    }
    setIsCorrect(correct);
    setIsAnswered(true);
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <Card maxW="xl" m="auto" boxShadow="lg" borderRadius="lg">
      <CardHeader bg="brand.50" borderTopRadius="lg">
        <Heading size="md" color="brand.600">Question {question.id}</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <Text>{question.text}</Text>
          {question.sequence && (
            <Text fontWeight="semibold">
              Sequence: {question.sequence.join(', ')}, ...
            </Text>
          )}
          {question.nthTerm && (
            <Text fontWeight="semibold">nth term: {question.nthTerm}</Text>
          )}
          {Array.isArray(question.answer) ? (
            question.answer.map((_, index) => (
              <Input
                key={index}
                placeholder={`Answer ${index + 1}`}
                value={userAnswer[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                isDisabled={isAnswered}
              />
            ))
          ) : (
            <Input
              placeholder="Your answer"
              value={userAnswer}
              onChange={(e) => handleInputChange(0, e.target.value)}
              isDisabled={isAnswered}
            />
          )}
        </VStack>
      </CardBody>
      <CardFooter flexDirection="column">
        {!isAnswered ? (
          <Button 
            onClick={checkAnswer} 
            colorScheme="brand" 
            w="full"
            isDisabled={isSubmitDisabled}
          >
            Submit Answer
          </Button>
        ) : (
          <Box w="full">
            <Alert
              status={isCorrect ? "success" : "error"}
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius="md"
              mb={4}
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                {isCorrect ? "Correct!" : "Incorrect"}
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                {isCorrect 
                  ? "Great job! You've got it right." 
                  : `The correct answer is: ${Array.isArray(question.answer) ? question.answer.join(', ') : question.answer}`
                }
              </AlertDescription>
            </Alert>
            <Text fontSize="sm" mb={4}>{question.explanation}</Text>
            <Button onClick={handleNext} colorScheme="brand" w="full">
              Next Question
            </Button>
          </Box>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;