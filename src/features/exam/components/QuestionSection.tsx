import QuestionCard from "./QuestionCard";
import type { ExamQuestionModel } from "../types";
import { QuestionType } from "../types";

const SECTION_LABELS: Record<number, string> = {
  [QuestionType.TrueFalse]: "أجب بصواب او خطأ",
  [QuestionType.MultipleChoice]: "اختر الاجابة الصحيحة",
};

interface QuestionSectionProps {
  type: number; questions: ExamQuestionModel[];
  getSelectedOrders: (id: string) => number[];
  onSelect: (questionId: string, order: number) => void;
}

export default function QuestionSection({ type, questions, getSelectedOrders, onSelect }: QuestionSectionProps) {
  if (!questions.length) return null;
  return (
    <section className="question-section">
      <div className="question-section__header">
        <h2 className="question-section__title">{SECTION_LABELS[type] ?? "أسئلة"}</h2>
        <span className="question-section__badge">{questions.length} أسئلة</span>
      </div>
      <div className="question-section__list">
        {questions.map((q, i) => (
          <QuestionCard
            key={q.id} question={q} displayIndex={i + 1}
            selectedOrders={getSelectedOrders(q.id)}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
