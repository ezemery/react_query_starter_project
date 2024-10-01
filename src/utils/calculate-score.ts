import { SelectedAnswer } from '@/types';
import {
  MutationObserverSuccessResult,
  Override,
  UseMutateAsyncFunction,
  UseMutateFunction,
} from '@tanstack/react-query';

export function calculateScore(
  mutation: Override<
    MutationObserverSuccessResult<any, Error, void, unknown>,
    { mutate: UseMutateFunction<any, Error, void, unknown> }
  > & { mutateAsync: UseMutateAsyncFunction<any, Error, void, unknown> },
  selectedAnswers: SelectedAnswer[]
) {
  let score = 0;
  for (let i = 0; i < mutation.data.length; i++) {
    if (selectedAnswers[i].selectedAnswer === mutation.data[i].correctAnswer) {
      score++;
    }
  }
  return score;
}
