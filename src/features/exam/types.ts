export interface AnswerOptionDto {
  text: string;
  order: number;
}

export interface ExamQuestionDto {
  questionId: string;
  title: string;
  points: number;
  sortOrder: number;
  type: number;
  answerOptions: AnswerOptionDto[];
}

export type ExamQuestionsResponse = ExamQuestionDto[];

export interface ExamMetaDto {
  id: string;
  title: string;
  semesterCourseId: string;
  semesterId: string;
  semesterName: string;
  startDateUtc: string;
  endDate: string;
  durationMinutes: number;
  statusValue: number;
  passingScore: number;
  maxScore: number;
  isActive: boolean;
  questionsCount: number;
}

export interface ExamAnswer {
  text: string;
  order: number;
}

export interface ExamQuestion {
  id: string;
  title: string;
  order: number;
  type: number;
  options: ExamAnswer[];
}

export interface ExamModel {
  id: string;
  title: string;
  semesterName: string;
  durationMinutes: number;
  questions: ExamQuestion[];
}

export interface StudentAttendanceDto {
  examAttendanceId: string;
  endDateUtc: string;
}