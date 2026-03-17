import ExamContainer from "../features/exam/containers/ExamContainer";

interface ExamPageProps { userId: string; }

export default function ExamPage({ userId }: ExamPageProps) {
  return <main className="exam-page"><ExamContainer userId={userId} /></main>;
}
