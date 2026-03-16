import { apiClient } from "../../../services/api.client";

import type {
  ExamMetaDto,
  ExamModel,
  ExamQuestionDto,
  ExamQuestionsResponse,
  StudentAttendanceDto,
} from "../types";

export const examRepository = {
  async getExamMeta(examId: string): Promise<ExamMetaDto> {
    const response = await apiClient.get(`/api/v1/exams/${examId}`);
    return response.data;
  },

  async getQuestions(examId: string): Promise<ExamQuestionsResponse> {
    const response = await apiClient.get(
      `/api/v1/exams/${examId}/questions-answers-list`
    );
    return response.data;
  },

  async startExam(examId: string): Promise<StudentAttendanceDto> {
    const response = await apiClient.post(
      `/api/v1/exams/${examId}/student-attendance`
    );
    return response.data;
  },

  async getExam(examId: string): Promise<ExamModel> {
    const [meta, questions] = await Promise.all([
      this.getExamMeta(examId),
      this.getQuestions(examId),
    ]);

    return {
      id: meta.id,
      title: meta.title,
      semesterName: meta.semesterName,
      durationMinutes: meta.durationMinutes,
      questions: questions.map((question: ExamQuestionDto) => ({
        id: question.questionId,
        title: question.title,
        order: question.sortOrder,
        type: question.type,
        options: question.answerOptions,
      })),
    };
  },
};