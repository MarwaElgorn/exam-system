import { useQuery} from "@tanstack/react-query";
import { useMemo } from "react";
import { examRepository } from "../repositories/exam.repository";
import { mapExamMetaDto, mapQuestionWithAnswersDtoList } from "../utils/exam.mappers";
import type { ExamModel } from "../types";

export function useExam(examId: string) {
  // meta + questions fire IN PARALLEL — both enabled as soon as examId exists
  const metaQuery = useQuery({
    queryKey: ["exam-meta", examId],
    queryFn: async () => mapExamMetaDto(await examRepository.getExamMeta(examId)),
    enabled: !!examId,
    staleTime: Infinity,
    retry: 2,
  });

  const questionsQuery = useQuery({
    queryKey: ["exam-questions", examId],
    queryFn: async () => mapQuestionWithAnswersDtoList(await examRepository.getQuestions(examId)),
    enabled: !!examId, // ← same condition as meta, fires at the same time
    staleTime: Infinity,
    retry: 2,
  });

  const exam = useMemo<ExamModel | undefined>(() => {
    if (!metaQuery.data || !questionsQuery.data) return undefined;
    return { meta: metaQuery.data, questions: questionsQuery.data };
  }, [metaQuery.data, questionsQuery.data]);

  return {
    exam,
    isLoading: metaQuery.isLoading || questionsQuery.isLoading,
    isError: metaQuery.isError || questionsQuery.isError,
    error: (metaQuery.error ?? questionsQuery.error) as Error | null,
  };
}