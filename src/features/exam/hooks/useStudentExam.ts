import { useQuery } from "@tanstack/react-query";
import { examRepository } from "../repositories/exam.repository";
import { useExam } from "./useExam";
import type { ExamListItemDto } from "../types";

export function useStudentExam(userId: string | null) {
  const examListQuery = useQuery({
    queryKey: ["student-exams", userId],
    queryFn: async () => {
      const response = await examRepository.getExamsList(userId!);
      const list: ExamListItemDto[] = Array.isArray(response)
        ? (response as unknown as ExamListItemDto[])
        : (response.data ?? []);
      if (list.length === 0) throw new Error("No exam available for this student");
      return list[0];
    },
    enabled: !!userId,
    staleTime: Infinity,
    retry: 2,
  });

  // list uses "examId" field (NOT "id")
  const examId = examListQuery.data?.examId ?? "";
  const examResult = useExam(examId);

  return {
    exam: examResult.exam,
    isLoading: examListQuery.isLoading || examResult.isLoading,
    isError: examListQuery.isError || examResult.isError,
    error: (examListQuery.error ?? examResult.error) as Error | null,
  };
}