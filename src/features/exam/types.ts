export interface AnswerOption {
  text: string;
  order: number;
}

export interface ExamQuestion {
  questionId: string;
  title: string;
  points: number;
  sortOrder: number;
  type: number;
  answerOptions: AnswerOption[];
}

export type ExamQuestionsResponse = ExamQuestion[];

export interface ExamMeta {
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

export interface StudentAttendance {
  examAttendanceId: string;
  endDateUtc: string;
}