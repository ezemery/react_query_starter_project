export type SelectedAnswer = {
  question: string;
  options: string[];
  selectedAnswer?: string;
};

export type DataType = {
  name: string;
  branch: string;
  latitude: number;
  longitude: number;
  country: string;
  operatorCountry: string;
  operationStartDate: string;
};

export type QuestionSelectProps = {
  questionData: SelectedAnswer | undefined;
  selectedAnswer?: string;
  onAnswerSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  correctAnswer?: string;
  isResult?: boolean;
};
