interface TimerCircleProps { display: string; isExpired: boolean; }

export default function TimerCircle({ display, isExpired }: TimerCircleProps) {
  return (
    <div className={`timer-circle${isExpired ? " timer-circle--expired" : ""}`}>
      <span className="timer-circle__time">{display}</span>
      <span className="timer-circle__label">الوقت المتبقي</span>
    </div>
  );
}
