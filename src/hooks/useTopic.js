import { useState, useEffect } from 'react';
import Topics from '../data/Topics';

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

export const useTopic = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTopics = async () => {
      setIsLoading(true);
      setError(null);

      const availableTopics = await Promise.all(
        Topics.map(async (topic) => {
          try {
            const fileName = generateFileName(topic);
            const module = await import(`../data/${fileName}.json`);
            console.log(`Loading ${topic}`, fileName);
            return { topic: topic, data: module.default };
          } catch (err) {
            // empty ones
            //console.error('Error loading topics:', err);
            //setError('Failed to load topics. Please try again later.');
            return null;
          }
        })
      )
      const validTopics = availableTopics.filter(topic => topic !== null)

      setTopics(validTopics);
      setIsLoading(false);
    };
    loadTopics();
  }, []);

  return { topics, isLoading, error };
};