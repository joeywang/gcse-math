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
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';

const QuestionCard = ({ question, onNext }) => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const bgColor = useColorModeValue('white', 'gray.700')
  const headerBgColor = useColorModeValue('brand.50', 'gray.600')
  const headerTextColor = useColorModeValue('brand.600', 'white')

  useEffect(() => {
    if (question.parts) {
      setUserAnswers(question.parts.map(() => ''));
    } else {
      setUserAnswers(Array.isArray(question.answer) ? Array(question.answer.length).fill('') : ['']);
    }
    setIsAnswered(false);
    setIsCorrect([]);
    setIsSubmitDisabled(true);
  }, [question]);

  useEffect(() => {
    const allAnswersFilled = userAnswers.every(answer => answer.trim() !== '');
    setIsSubmitDisabled(!allAnswersFilled);
  }, [userAnswers]);

  const handleInputChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const checkAnswer = () => {
    let correct;
    if (question.parts) {
      correct = question.parts.map((part, index) => 
        userAnswers[index].toString().toLowerCase() === part.answer.toString().toLowerCase()
      );
    } else if (Array.isArray(question.answer)) {
      correct = question.answer.map((ans, index) => 
        userAnswers[index].toString().toLowerCase() === ans.toString().toLowerCase()
      );
    } else {
      correct = [userAnswers[0].toString().toLowerCase() === question.answer.toString().toLowerCase()];
    }
    setIsCorrect(correct);
    setIsAnswered(true);
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <Card maxW="xl" m="auto" boxShadow="lg" borderRadius="lg" bg={bgColor}>
      <CardHeader bg={headerBgColor} borderTopRadius="lg">
        <Heading size="md" color={headerTextColor}>Question {question.number}</Heading>
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
          {question.parts ? (
            question.parts.map((part, index) => (
              <Box key={index}>
                <Text mb={2}>{part.text}</Text>
                <Input
                  placeholder={`Answer for part ${index + 1}`}
                  value={userAnswers[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  isDisabled={isAnswered}
                />
              </Box>
            ))
          ) : Array.isArray(question.answer) ? (
            question.answer.map((_, index) => (
              <Input
                key={index}
                placeholder={`Answer ${index + 1}`}
                value={userAnswers[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                isDisabled={isAnswered}
              />
            ))
          ) : (
            <Input
              placeholder="Your answer"
              value={userAnswers[0]}
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
            {question.parts ? (
              question.parts.map((part, index) => (
                <Box key={index} mb={4}>
                  <Alert
                    status={isCorrect[index] ? "success" : "error"}
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    borderRadius="md"
                    mb={2}
                  >
                    <AlertIcon boxSize="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                      Part {index + 1}: {isCorrect[index] ? "Correct!" : "Incorrect"}
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">
                      {isCorrect[index] 
                        ? "Great job! You've got it right." 
                        : `The correct answer is: ${part.answer}`
                      }
                    </AlertDescription>
                  </Alert>
                  <Text fontSize="sm">{part.explanation}</Text>
                  {index < question.parts.length - 1 && <Divider my={2} />}
                </Box>
              ))
            ) : (
              <Alert
                status={isCorrect[0] ? "success" : "error"}
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
                  {isCorrect[0] ? "Correct!" : "Incorrect"}
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  {isCorrect[0] 
                    ? "Great job! You've got it right." 
                    : `The correct answer is: ${Array.isArray(question.answer) ? question.answer.join(', ') : question.answer}`
                  }
                </AlertDescription>
              </Alert>
            )}
            {question.explanation && <Text fontSize="sm" mb={4}>{question.explanation}</Text>}
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