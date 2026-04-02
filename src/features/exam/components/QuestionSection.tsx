import QuestionCard from "./QuestionCard";
import type { ExamQuestionModel } from "../types";
import { QuestionType } from "../types";

const SECTION_LABELS: Record<number, string> = {
  [QuestionType.TrueFalse]: "أجب بصواب او خطأ",
  [QuestionType.MultipleChoice]: "اختر الاجابة الصحيحة",
};

interface QuestionSectionProps {
  type: number;
  questions: ExamQuestionModel[];
  getSelectedOrders: (id: string) => number[];
  onSelect: (questionId: string, order: number) => void;
}

export default function QuestionSection({
  type,
  questions,
  getSelectedOrders,
  onSelect,
}: QuestionSectionProps) {
  if (!questions.length) return null;
  return (
    <section className="bg-white rounded-lg p-5 shadow-card border border-gray-300 w-full">
      <div className="flex justify-between items-center mb-5 flex-row-reverse">
        <h2 className="text-base font-bold text-gray-800">
          {SECTION_LABELS[type] ?? "أسئلة"}
        </h2>
        <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full">
          {questions.length} أسئلة
        </span>
      </div>
      <div className="flex flex-col gap-6">
        {questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            displayIndex={i + 1}
            selectedOrders={getSelectedOrders(q.id)}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
