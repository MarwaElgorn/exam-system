import { useState } from "react";
import { examRepository } from "../repositories/exam.repository";
import { buildSubmitPayload } from "../utils/exam.mappers";
import type { AnswerMap } from "../types";

interface UseSubmitExamOptions {
  examId: string;
  attendanceId: string;
  onSuccess?: () => void;
  onError?: (err: Error) => void;
}

export function useSubmitExam({ examId, attendanceId, onSuccess, onError }: UseSubmitExamOptions) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<Error | null>(null);

  async function submit(answers: AnswerMap) {
    if (isSubmitting || isSubmitted) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await examRepository.submitAnswers(examId, attendanceId, buildSubmitPayload(answers));
      setIsSubmitted(true);
      onSuccess?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setSubmitError(error);
      onError?.(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submit, isSubmitting, isSubmitted, submitError };
}
