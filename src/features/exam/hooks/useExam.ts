import { useQuery } from "@tanstack/react-query";
import { examRepository } from "../repositories/exam.repository";

export function useExam(examId: string) {
  return useQuery({
    queryKey: ["exam", examId],
    queryFn: () => examRepository.getExam(examId),
    enabled: !!examId,
  });
}