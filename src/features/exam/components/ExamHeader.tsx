interface ExamHeaderProps {
  title: string;
  semesterName: string;
}

export default function ExamHeader({ title, semesterName }: ExamHeaderProps) {
  return (
    <div className="text-center flex flex-col items-center gap-1.5">
      <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2.5">
        📋 {title}
      </h1>
      <p className="text-sm text-gray-500">{semesterName}</p>
    </div>
  );
}
