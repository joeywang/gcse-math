import React from 'react';
import {
  Box,
  Button,
  SimpleGrid,
  Heading,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

const topics = [
  "01 Algebraic Fractions", "02 Bounds", "04 Completing The Square",
  "05 Compound And Inverse Functions", "06 Congruent Triangles",
  "07 Cubic And Reciprocal Graphs", "08 Cumulative Frequency",
  "09 Direct And Inverse Proportion", "10 Enlargement Negative Scale Factor",
  "11 Error Intervals", "12 Expanding Triple Brackets",
  "13 Factorising Harder Questions", "14 Finding The Area Of Any Triangle",
  "15 Fractional And Negative Indices", "16 Histograms",
  "17 Iteration", "18 Parallel And Perpendicular Lines",
  "21 Probability Equation Questions", "22 Proof Of Circle Theorems",
  "23 Proof", "24 Quadratic Formula", "25 Quadratic Inequalities",
  "26 Quadratic Sequences", "27 Quadratic Simultaneous Equations",
  "28 Ratio Factor Problems", "29 Rearranging Harder Formula",
  "30 Recurring Decimals To Fractions", "31 Repeated Percentage Change",
  "32 Similar Shapes Area And Volume", "33 Similar Shapes",
  "34 Surds", "35 The Cosine Rule", "36 The Equation Of A Line",
  "37 The Gradient Of A Line", "38 The Product Rule Of Counting",
  "39 The Sine Rule", "41 Trig And Exponential Graphs",
  "42 Trigonometry Soh Cah Toa", "43 Vectors Proof Questions",
  "44 Vectors", "45 Velocity Time Graphs",
  "46 Venn Diagrams Given That Questions", "47 Venn Diagrams"
];

const TopicSelection = ({ onSelectTopic }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const hoverBgColor = useColorModeValue('brand.50', 'gray.600');

  return (
    <VStack spacing={8} align="stretch">
      <Heading as="h1" size="xl" textAlign="center">
        Select a GCSE Math Topic
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {topics.map((topic) => (
          <Button
            key={topic}
            onClick={() => onSelectTopic(topic)}
            height="auto"
            whiteSpace="normal"
            textAlign="left"
            py={4}
            bg={bgColor}
            _hover={{ bg: hoverBgColor }}
          >
            {topic}
          </Button>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default TopicSelection;