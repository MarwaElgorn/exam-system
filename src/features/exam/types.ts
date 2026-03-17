// ── LAYER 1: RAW API DTOs ────────────────────────────────────────────────────

export interface ExamListItemDto {
  examId: string;        // list uses "examId" (NOT "id")
  title: string;
  semesterName: string;
  durationMinutes: number;
  passingScore: number;
  isActive: boolean;
}

export interface ExamListResponseDto {
  data: ExamListItemDto[];
}

export interface ExamMetaDto {
  id: string;            // single exam uses "id" (NOT "examId")
  title: string;
  semesterName: string;
  durationMinutes: number;
  passingScore: number;
  isActive: boolean;
}

// attendance kept in repo for later — just not used in the main flow now
export interface StudentAttendanceDto {
  examAttendanceId: string;
  endDateUtc: string;
}

export interface AnswerOptionDto {
  text: string;
  order: number;
}

export interface ExamQuestionWithAnswersDto {
  questionId: string;
  title: string;
  points: number;
  sortOrder: number;
  type: number;
  answerOptions: AnswerOptionDto[];
}

export type ExamQuestionsWithAnswersResponse = ExamQuestionWithAnswersDto[];

export interface SubmitAnswerDto {
  questionId: string;
  selectedOptionOrders: number[];
}

export interface SubmitExamRequestDto {
  studentAnswers: SubmitAnswerDto[];
}

// ── LAYER 2: DOMAIN MODELS ───────────────────────────────────────────────────

export const QuestionType = {
  TrueFalse: 1,
  MultipleChoice: 2,
} as const;
export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];

export interface AnswerOptionModel {
  text: string;
  order: number;
}

export interface ExamQuestionModel {
  id: string;
  title: string;
  sortOrder: number;
  type: QuestionType;
  options: AnswerOptionModel[];
}

export interface ExamMetaModel {
  id: string;
  title: string;
  semesterName: string;
  durationMinutes: number;
  passingScore: number;
}

// ExamModel no longer needs attendance
export interface ExamModel {
  meta: ExamMetaModel;
  questions: ExamQuestionModel[];
}

// ── LAYER 3: UI STATE ────────────────────────────────────────────────────────

export type AnswerMap = Record<string, number[]>;