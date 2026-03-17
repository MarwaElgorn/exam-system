import AnswerOption from "./AnswerOption";
import type { ExamQuestionModel } from "../types";

interface QuestionCardProps {
  question: ExamQuestionModel; displayIndex: number;
  selectedOrders: number[]; onSelect: (questionId: string, order: number) => void;
}

export default function QuestionCard({ question, displayIndex, selectedOrders, onSelect }: QuestionCardProps) {
  return (
    <div className="question-card">
      <p className="question-card__title">
        <span className="question-card__index">{displayIndex}. </span>
        {question.title}
      </p>
      <div className="question-card__options">
        {question.options.map((opt) => (
          <AnswerOption
            key={opt.order} text={opt.text} order={opt.order}
            isSelected={selectedOrders.includes(opt.order)}
            onSelect={(order) => onSelect(question.id, order)}
          />
        ))}
      </div>
    </div>
  );
}
