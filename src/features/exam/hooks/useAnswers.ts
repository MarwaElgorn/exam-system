import { useState, useCallback } from "react";
import type { AnswerMap, ExamQuestionModel } from "../types";
import { QuestionType } from "../types";

export function useAnswers(questions: ExamQuestionModel[]) {
  const [answers, setAnswers] = useState<AnswerMap>({});

  const selectAnswer = useCallback((questionId: string, optionOrder: number) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return;
    setAnswers((prev) => {
      if (question.type === QuestionType.TrueFalse || question.type === QuestionType.MultipleChoice) {
        return { ...prev, [questionId]: [optionOrder] }; // single-select
      }
      const current = prev[questionId] ?? [];
      const already = current.includes(optionOrder);
      return { ...prev, [questionId]: already ? current.filter((o) => o !== optionOrder) : [...current, optionOrder] };
    });
  }, [questions]);

  const getSelectedOrders = useCallback((questionId: string) => answers[questionId] ?? [], [answers]);

  return {
    answers,
    selectAnswer,
    getSelectedOrders,
    answeredCount: Object.keys(answers).length,
    totalCount: questions.length,
    allAnswered: questions.length > 0 && Object.keys(answers).length === questions.length,
  };
}