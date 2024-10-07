import { useState, useEffect } from 'react';

const generateFileName = (topic) => {
  // Remove digits and leading/trailing spaces
  const cleanTopic = topic.replace(/\d+/g, '').trim();
  // Split into words, convert to lowercase, and join
  const words = cleanTopic.split(' ').map(word => word.toLowerCase());
  // Capitalize the first letter of each word except the first one
  const camelCaseWords = words.map((word, index) => 
    index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
  );
  // Join the words and add .json extension
  return camelCaseWords.join('');
};

export const useQuestions = (topic) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const fileName = generateFileName(topic);
        const module = await import(`../data/${fileName}.json`);
        setQuestions(module.default.questions);
      } catch (err) {
        console.error('Error loading questions:', err);
        setError(`Failed to load questions for ${topic}. Please try again later.`);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [topic]);

  return { questions, isLoading, error };
};