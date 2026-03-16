import  { apiClient } from "../../../services/api.client";

import type {
  ExamMeta,
  ExamQuestionsResponse,
  StudentAttendance,
} from "../types";

export const examRepository = {
  async getExamMeta(examId: string): Promise<ExamMeta> {
    const response = await apiClient.get(`/api/v1/exams/${examId}`);
    return response.data;
  },

  async getQuestions(examId: string): Promise<ExamQuestionsResponse> {
    const response = await apiClient.get(
      `/api/v1/exams/${examId}/questions-answers-list`
    );
    return response.data;
  },

  async startExam(examId: string): Promise<StudentAttendance> {
    const response = await apiClient.post(
      `/api/v1/exams/${examId}/student-attendance`
    );
    return response.data;
  },
};