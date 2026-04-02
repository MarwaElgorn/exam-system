import { useState } from "react";
import { examRepository } from "../repositories/exam.repository";
import { buildSubmitPayload } from "../utils/exam.mappers";
import type { AnswerMap } from "../types";

export function useSubmitExam({ examId }: { examId: string }) {
  const [attendanceId, setAttendanceId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<Error | null>(null);

  async function submit(answers: AnswerMap) {
    if (!examId) return;
    if (isSubmitting || isSubmitted) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let currentAttendanceId = attendanceId;

      // 1) create attendance
      if (!currentAttendanceId) {
        const res = await examRepository.createAttendance(examId);
        currentAttendanceId = res.examAttendanceId;
        setAttendanceId(currentAttendanceId);
      }

      if (!currentAttendanceId) {
        throw new Error("Attendance ID is missing");
      }

      // 2) submit answers
      await examRepository.submitAnswers(
        examId,
        currentAttendanceId,
        buildSubmitPayload(answers)
      );

      setIsSubmitted(true);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Submit failed");
      setSubmitError(error);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submit, isSubmitting, isSubmitted, submitError };
}