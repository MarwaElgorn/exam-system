interface SubmitButtonProps {
  onClick: () => void;
  isSubmitting: boolean;
  isSubmitted: boolean;
  disabled: boolean;
}

export default function SubmitButton({
  onClick,
  isSubmitting,
  isSubmitted,
  disabled,
}: SubmitButtonProps) {
  const label = isSubmitted
    ? "تم الإرسال ✓"
    : isSubmitting
      ? "جارٍ الإرسال..."
      : "إرسال الاجابات";
  return (
    <div className="fixed bottom-0 left-0 right-0 px-6 py-4 bg-white border-t border-gray-200 flex justify-center z-50">
      <button
        type="button"
   className={`w-full max-w-3xl px-6 py-4 rounded-lg font-semibold text-white transition ${
  isSubmitted
    ? "bg-green-600"
    : disabled || isSubmitting
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
}`}
        onClick={onClick}
        disabled={disabled || isSubmitting || isSubmitted}
      >
        {label}
      </button>
    </div>
  );
}
