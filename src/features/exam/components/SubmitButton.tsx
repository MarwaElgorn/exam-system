interface SubmitButtonProps {
  onClick: () => void; isSubmitting: boolean; isSubmitted: boolean; disabled: boolean;
}

export default function SubmitButton({ onClick, isSubmitting, isSubmitted, disabled }: SubmitButtonProps) {
  const label = isSubmitted ? "تم الإرسال ✓" : isSubmitting ? "جارٍ الإرسال..." : "إرسال الاجابات";
  return (
    <div className="submit-bar">
      <button
        type="button"
        className={`submit-button${isSubmitted ? " submit-button--done" : ""}`}
        onClick={onClick}
        disabled={disabled || isSubmitting || isSubmitted}
      >
        {label}
      </button>
    </div>
  );
}
