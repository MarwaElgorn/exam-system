interface AnswerOptionProps {
  text: string;
  order: number;
  isSelected: boolean;
  onSelect: (order: number) => void;
}

export default function AnswerOption({
  text,
  order,
  isSelected,
  onSelect,
}: AnswerOptionProps) {
  return (
    <button
      type="button"
      className={`flex items-center gap-2 px-4 py-2.5 rounded transition-all duration-180 text-sm font-normal text-gray-800 flex-1 min-w-[120px] text-right direction-rtl ${
        isSelected
          ? "border border-blue-400 bg-blue-50"
          : "border border-gray-300 bg-white hover:border-blue-500 hover:bg-blue-50"
      }`}
      onClick={() => onSelect(order)}
    >
      <span
        className={`w-4 h-4 rounded-full flex-shrink-0 transition-all duration-180 relative ${
          isSelected
            ? "border-2 border-blue-500 bg-blue-500"
            : "border-2 border-gray-300"
        }`}
      >
        {isSelected && (
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white" />
        )}
      </span>
      <span className="flex-1">{text}</span>
    </button>
  );
}
