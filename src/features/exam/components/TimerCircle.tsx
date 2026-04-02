interface TimerCircleProps {
  display: string;
  isExpired: boolean;
}

export default function TimerCircle({ display, isExpired }: TimerCircleProps) {
  return (
    <div
      className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center bg-white transition-colors duration-300 ${
        isExpired ? "border-red-500" : "border-blue-500"
      }`}
      style={
        isExpired
          ? { boxShadow: "0 0 0 4px rgba(239, 68, 68, 0.12)" }
          : { boxShadow: "0 0 0 4px rgba(74, 144, 217, 0.12)" }
      }
    >
      <span
        className={`text-2xl font-bold tracking-wider tabular-nums ${isExpired ? "text-red-500" : "text-gray-800"}`}
      >
        {display}
      </span>
      <span className="text-xs text-gray-500 whitespace-nowrap">
        الوقت المتبقي
      </span>
    </div>
  );
}
