import AnswerOption from "./AnswerOption";
import type { ExamQuestionModel } from "../types";

interface QuestionCardProps {
  question: ExamQuestionModel;
  displayIndex: number;
  selectedOrders: number[];
  onSelect: (questionId: string, order: number) => void;
}

export default function QuestionCard({
  question,
  displayIndex,
  selectedOrders,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm leading-relaxed text-gray-800 text-right">
        <span className="font-bold text-blue-500 ml-1">{displayIndex}. </span>
        {question.title}
      </p>
      <div className="flex flex-wrap gap-2.5">
        {question.options.map((opt) => (
          <AnswerOption
            key={opt.order}
            text={opt.text}
            order={opt.order}
            isSelected={selectedOrders.includes(opt.order)}
            onSelect={(order) => onSelect(question.id, order)}
          />
        ))}
      </div>
    </div>
  );
}
