interface QuantityControlProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md';
}

export function QuantityControl({
  value,
  min = 1,
  max = 20,
  onChange,
  size = 'md',
}: QuantityControlProps) {
  const buttonSize = size === 'sm' ? 'w-7 h-7 text-base' : 'w-8 h-8 text-lg';
  const valueSize = size === 'sm' ? 'text-sm min-w-6' : 'text-base min-w-7';

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-sm p-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${buttonSize} flex items-center justify-center bg-white rounded-full font-semibold text-gray-600 hover:bg-gray-200 transition-all active:scale-95`}
      >
        -
      </button>
      <span className={`${valueSize} font-semibold text-center`}>{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className={`${buttonSize} flex items-center justify-center bg-white rounded-full font-semibold text-gray-600 hover:bg-gray-200 transition-all active:scale-95`}
      >
        +
      </button>
    </div>
  );
}
