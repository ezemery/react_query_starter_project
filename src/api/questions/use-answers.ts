import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api';

const getAnswersFunction = async () => {
  const response = await apiClient.post('/questions');
  return response.data;
};

// https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
export function useAnswers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['answers'],
    mutationFn: getAnswersFunction,
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  });
}
