interface AnswerOptionProps {
  text: string; order: number;
  isSelected: boolean; onSelect: (order: number) => void;
}

export default function AnswerOption({ text, order, isSelected, onSelect }: AnswerOptionProps) {
  return (
    <button
      type="button"
      className={`answer-option${isSelected ? " answer-option--selected" : ""}`}
      onClick={() => onSelect(order)}
    >
      <span className="answer-option__radio" />
      <span className="answer-option__text">{text}</span>
    </button>
  );
}
