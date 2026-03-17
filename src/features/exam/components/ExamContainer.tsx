import { useMemo, useCallback, useRef } from "react";
import { useStudentExam } from "../hooks/useStudentExam";
import { useSubmitExam } from "../hooks/useSubmitExam";
import { useAnswers } from "../hooks/useAnswers";
import { useTimer } from "../hooks/useTimer";
import { QuestionType } from "../types";
import ExamHeader from "../components/ExamHeader";
import TimerCircle from "../components/TimerCircle";
import QuestionSection from "../components/QuestionSection";
import SubmitButton from "../components/SubmitButton";

const SECTION_ORDER = [QuestionType.TrueFalse, QuestionType.MultipleChoice];

interface ExamContainerProps { userId: string; }

export default function ExamContainer({ userId }: ExamContainerProps) {
  const { exam, isLoading, isError, error } = useStudentExam(userId);
  const questions = exam?.questions ?? [];

  const { answers, selectAnswer, getSelectedOrders, allAnswered, answeredCount } = useAnswers(questions);

  const { submit, isSubmitting, isSubmitted, submitError } = useSubmitExam({
    examId: exam?.meta.id ?? "",
    attendanceId: exam?.attendance.attendanceId ?? "",
    onSuccess: () => console.log("Submitted"),
    onError: (err) => console.error(err.message),
  });

  // Ref pattern: stable timer callback that always sees latest answers
  const liveRef = useRef({ submit, isSubmitted, answers });
  liveRef.current = { submit, isSubmitted, answers };

  const handleTimeExpired = useCallback(() => {
    const { submit: s, isSubmitted: done, answers: a } = liveRef.current;
    if (!done) s(a);
  }, []);

  const endDateUtc = exam?.attendance.endDateUtc ?? new Date(Date.now() + 60_000).toISOString();
  const timer = useTimer(endDateUtc, handleTimeExpired);

  const questionsByType = useMemo(() => {
    const groups: Record<number, typeof questions> = {};
    for (const q of questions) {
      if (!groups[q.type]) groups[q.type] = [];
      groups[q.type].push(q);
    }
    return groups;
  }, [questions]);

  if (isLoading) return (
    <div className="exam-state exam-state--loading">
      <div className="exam-state__spinner" />
      <p>جاري تحميل الاختبار...</p>
    </div>
  );

  if (isError) return (
    <div className="exam-state exam-state--error" role="alert">
      <p>حدث خطأ أثناء تحميل الاختبار</p>
      {error && <p className="exam-state__detail">{error.message}</p>}
    </div>
  );

  if (!exam) return null;

  return (
    <div className="exam-container" dir="rtl">
      <ExamHeader title={exam.meta.title} semesterName={exam.meta.semesterName} />
      <TimerCircle display={timer.display} isExpired={timer.isExpired} />

      <div className="exam-container__sections">
        {SECTION_ORDER.map((type) => {
          const qs = questionsByType[type];
          if (!qs?.length) return null;
          return (
            <QuestionSection
              key={type} type={type} questions={qs}
              getSelectedOrders={getSelectedOrders} onSelect={selectAnswer}
            />
          );
        })}
      </div>

      {questions.length > 0 && (
        <p className="exam-container__progress">
          {answeredCount} / {questions.length} سؤال تمت الإجابة عليه
        </p>
      )}

      {submitError && <div className="exam-error-banner" role="alert">فشل الإرسال — يرجى المحاولة مرة أخرى</div>}

      <SubmitButton
        onClick={() => submit(answers)}
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
        disabled={!exam || !allAnswered || timer.isExpired || isSubmitted}
      />
    </div>
  );
}
