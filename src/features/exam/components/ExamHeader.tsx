interface ExamHeaderProps { title: string; semesterName: string; }

export default function ExamHeader({ title, semesterName }: ExamHeaderProps) {
  return (
    <div className="exam-header">
      <h1 className="exam-header__title">{title}</h1>
      <p className="exam-header__subtitle">{semesterName}</p>
    </div>
  );
}
