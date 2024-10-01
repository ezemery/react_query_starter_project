import { useAnswers, useQuestions } from '@/api';
import { QuestionSelect } from '@/components';
import { Box, Button, Container, Header, Text } from '@/components/ui';
import { SelectedAnswer } from '@/types';
import { calculateScore } from '@/utils';
import { useState } from 'react';

export function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [results, setResults] = useState(false);
  const questions = useQuestions();
  const answers = useAnswers();

  let selectedAnswers: SelectedAnswer[] = [];
  const handleAnswerSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(e.target.value);
    selectedAnswers.map((answerObj, index) => {
      if (index === currentQuestion) {
        answerObj['selectedAnswer'] = e.target.value;
      }
    });
  };
  const handleSubmitQuestion = () => {
    answers.mutate();
    setResults(true);
    setCurrentQuestion(0);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  let currentSelectedAnswers;
  let currentQuestionData;
  let score = 0;

  if (!questions.isPending && questions.isSuccess) {
    currentQuestionData = questions.data[currentQuestion];
    selectedAnswers = questions.data;
  }

  if (!answers.isPending && answers.isSuccess) {
    currentSelectedAnswers = selectedAnswers[currentQuestion];
    score = calculateScore(answers, selectedAnswers);
  }

  return (
    <Container>
      <Box>
        <Header>
          <Text size="large">Quiz Application</Text>
        </Header>
        {questions.error && 'An error has occurred: ' + questions.error.message}
        {answers.error && 'An error has occurred: ' + answers.error.message}
        {results
          ? answers.isPending
            ? 'Loading Results ...'
            : answers.isSuccess && (
                <>
                  <QuestionSelect
                    questionData={currentSelectedAnswers}
                    selectedAnswer={currentSelectedAnswers?.selectedAnswer}
                    correctAnswer={answers.data[currentQuestion].correctAnswer}
                    isResult={true}
                  />
                  {currentQuestion < answers.data.length - 1 ? (
                    <Button onClick={handleNextQuestion}>Next Question</Button>
                  ) : (
                    <Text size="medium">{`You scored: ${score}/${answers.data.length}`}</Text>
                  )}
                </>
              )
          : questions.isPending
            ? 'Loading Questions ...'
            : questions.isSuccess && (
                <>
                  <QuestionSelect
                    questionData={currentQuestionData}
                    selectedAnswer={selectedAnswer}
                    onAnswerSelect={handleAnswerSelect}
                  />
                  {currentQuestion < questions.data.length - 1 ? (
                    <Button
                      onClick={handleNextQuestion}
                      disabled={
                        !!!selectedAnswers[currentQuestion]?.selectedAnswer
                      }
                    >
                      Next Question
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmitQuestion}
                      disabled={
                        !!!selectedAnswers[currentQuestion]?.selectedAnswer
                      }
                    >
                      Submit Questions
                    </Button>
                  )}
                </>
              )}
      </Box>
    </Container>
  );
}
