import { useMemo } from "react";
import { useStudentExam } from "../hooks/useStudentExam";
import { useAnswers } from "../hooks/useAnswers";
import { useTimer } from "../hooks/useTimer";
import { useSubmitExam } from "../hooks/useSubmitExam";
import { QuestionType } from "../types";
import ExamHeader from "../components/ExamHeader";
import TimerCircle from "../components/TimerCircle";
import QuestionSection from "../components/QuestionSection";
import SubmitButton from "../components/SubmitButton";

const SECTION_ORDER = [QuestionType.TrueFalse, QuestionType.MultipleChoice];

interface ExamContainerProps {
  userId: string;
}

export default function ExamContainer({ userId }: ExamContainerProps) {
  const { exam, isLoading, isError, error } = useStudentExam(userId);

  const questions = useMemo(() => exam?.questions ?? [], [exam]);

  const {
    answers,
    selectAnswer,
    getSelectedOrders,
    allAnswered,
    answeredCount,
  } = useAnswers(questions);

  const timer = useTimer(exam?.meta.durationMinutes ?? 0);

  // مهم: الهوك دايمًا فوق
  const { submit, isSubmitting, isSubmitted, submitError } = useSubmitExam({
    examId: exam?.meta.id || "",
  });

  const questionsByType = useMemo(() => {
    const groups: Record<number, typeof questions> = {};
    for (const q of questions) {
      if (!groups[q.type]) groups[q.type] = [];
      groups[q.type].push(q);
    }
    return groups;
  }, [questions]);

  // conditions تحت
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center text-gray-500 text-base">
        <div className="spinner" />
        <p>Loading exam...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen gap-4 text-center text-red-500 text-base"
        role="alert"
      >
        <p>Failed to load exam</p>
        {error && (
          <p className="text-xs text-gray-500 max-w-sm">
            {error.message}
          </p>
        )}
      </div>
    );
  }

  if (!exam) return null;

  // if (exam.hasExpired) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <h2 className="text-3xl font-bold text-red-600">الامتحان انتهى</h2>
  //     </div>
  //   );
  // }

  return (
    <div
      className="max-w-3xl mx-auto px-4 py-8 pb-32 flex flex-col items-center gap-6"
      dir="rtl"
    >
      <ExamHeader
        title={exam.meta.title}
        semesterName={exam.meta.semesterName}
      />

      <TimerCircle display={timer.display} isExpired={timer.isExpired} />

      <div className="w-full flex flex-col gap-5">
        {SECTION_ORDER.map((type) => {
          const qs = questionsByType[type];
          if (!qs?.length) return null;

          return (
            <QuestionSection
              key={type}
              type={type}
              questions={qs}
              getSelectedOrders={getSelectedOrders}
              onSelect={selectAnswer}
            />
          );
        })}
      </div>

      {questions.length > 0 && (
        <p className="text-xs text-gray-500 text-center">
          {answeredCount} / {questions.length} questions answered
        </p>
      )}

      {submitError && (
        <p className="text-sm text-red-600">{submitError.message}</p>
      )}

      <SubmitButton
        onClick={() => submit(answers)}
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
        disabled={!allAnswered || timer.isExpired}
      />
    </div>
  );
}
