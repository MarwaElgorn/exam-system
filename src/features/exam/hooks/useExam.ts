import { useQuery } from "@tanstack/react-query";
import { examRepository } from "../repositories/exam.repository";

export function useExam(examId: string) {
  const metaQuery = useQuery({
    queryKey: ["exam-meta", examId],
    queryFn: () => examRepository.getExamMeta(examId),
  });

  const questionsQuery = useQuery({
    queryKey: ["exam-questions", examId],
    queryFn: () => examRepository.getQuestions(examId),
  });

  return {
    meta: metaQuery.data,
    questions: questionsQuery.data,
    isLoading: metaQuery.isLoading || questionsQuery.isLoading,
    isError: metaQuery.isError || questionsQuery.isError,
  };
}