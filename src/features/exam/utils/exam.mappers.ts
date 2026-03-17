import type {
  ExamMetaDto, StudentAttendanceDto, ExamQuestionWithAnswersDto,
  ExamMetaModel, ExamAttendanceModel, ExamQuestionModel,
  AnswerMap, SubmitExamRequestDto,
} from "../types";
import { QuestionType } from "../types";

export function mapExamMetaDto(dto: ExamMetaDto): ExamMetaModel {
  return {
    id: dto.id,
    title: dto.title,
    semesterName: dto.semesterName,
    durationMinutes: dto.durationMinutes,
    passingScore: dto.passingScore,
  };
}

export function mapAttendanceDto(dto: StudentAttendanceDto): ExamAttendanceModel {
  return {
    attendanceId: dto.examAttendanceId,
    endDateUtc: dto.endDateUtc,
  };
}

export function mapQuestionWithAnswersDtoList(dtos: ExamQuestionWithAnswersDto[]): ExamQuestionModel[] {
  const knownTypes = Object.values(QuestionType) as number[];
  return [...dtos]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((dto) => ({
      id: dto.questionId,
      title: dto.title,
      sortOrder: dto.sortOrder,
      type: (knownTypes.includes(dto.type) ? dto.type : QuestionType.MultipleChoice) as QuestionType,
      options: [...dto.answerOptions]
        .sort((a, b) => a.order - b.order)
        .map((opt) => ({ text: opt.text, order: opt.order })),
    }));
}

export function buildSubmitPayload(answerMap: AnswerMap): SubmitExamRequestDto {
  return {
    studentAnswers: Object.entries(answerMap).map(([questionId, selectedOptionOrders]) => ({
      questionId,
      selectedOptionOrders,
    })),
  };
}