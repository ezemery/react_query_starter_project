import { QuestionSelectProps } from '@/types';
import { CheckCircleIcon } from './icons/check';
import { Label, Radio, Select, Text, Option } from './ui';

export const QuestionSelect = ({
  questionData,
  selectedAnswer,
  onAnswerSelect,
  correctAnswer,
  isResult,
}: QuestionSelectProps) => {
  return (
    <Select>
      <Text size="medium">{questionData?.question}</Text>
      {questionData?.options.map((option: string, index: number) => (
        <Option key={`option-${index}`}>
          <Label htmlFor={`option-${index}`}>
            <Radio
              id={`option-${index}`}
              name="name"
              type="radio"
              value={option}
              checked={selectedAnswer === option}
              onChange={onAnswerSelect}
              readOnly={isResult}
              disabled={isResult}
            />{' '}
            {option}
          </Label>
          {isResult && option === correctAnswer && <CheckCircleIcon />}
        </Option>
      ))}
    </Select>
  );
};
