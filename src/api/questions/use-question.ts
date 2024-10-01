import { apiClient } from '@/api';
import { useQuery } from '@tanstack/react-query';

const getQuestionsFn = async () => {
  const response = await apiClient.get('/questions');
  return response.data;
};

export function useQuestions() {
  return useQuery({
    queryKey: ['questions'],
    queryFn: getQuestionsFn,
  });
}
