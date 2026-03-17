// ONE method = ONE endpoint. Zero business logic.

import { apiClient } from "../../../services/api.client";
import type {
  ExamListResponseDto,
  ExamMetaDto,
  ExamQuestionsWithAnswersResponse,
  SubmitExamRequestDto,
} from "../types";

export const examRepository = {
  // GET /api/v1/exams?UserId=...&HasQuestions=true&IsActive=true&CurrentPage=1&PerPage=10
  async getExamsList(userId: string): Promise<ExamListResponseDto> {
    const res = await apiClient.get<ExamListResponseDto>("/api/v1/exams", {
      params: { UserId: userId, HasQuestions: true, IsActive: true, CurrentPage: 1, PerPage: 10 },
    });
    return res.data;
  },

  // GET /api/v1/exams/{examId}  →  title + durationMinutes
  async getExamMeta(examId: string): Promise<ExamMetaDto> {
    const res = await apiClient.get<ExamMetaDto>(`/api/v1/exams/${examId}`);
    return res.data;
  },

  // GET /api/v1/exams/{examId}/questions-answers-list  →  questions + options
  async getQuestions(examId: string): Promise<ExamQuestionsWithAnswersResponse> {
    const res = await apiClient.get<ExamQuestionsWithAnswersResponse>(
      `/api/v1/exams/${examId}/questions-answers-list`
    );
    return res.data;
  },

  // PUT /api/v1/exams/{examId}/student-attendance/{attendanceId}  →  submit answers
  // (kept for when attendance flow is added back)
  async submitAnswers(examId: string, attendanceId: string, body: SubmitExamRequestDto): Promise<void> {
    await apiClient.put(
      `/api/v1/exams/${examId}/student-attendance/${attendanceId}`,
      body
    );
  },
};