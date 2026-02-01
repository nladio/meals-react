import type { ShoppingListItem } from '../../types';
import { useAppState } from '../../hooks/useAppState';
import { QuantityControl } from '../../components/ui/QuantityControl';

type Urgency = 'restock' | 'low' | 'variety';

interface ShoppingItemProps {
  item: ShoppingListItem;
  urgency: Urgency;
}

const URGENCY_STYLES: Record<Urgency, { dot: string; border: string }> = {
  restock: { dot: 'bg-red-500', border: 'border-l-red-500' },
  low: { dot: 'bg-orange-400', border: 'border-l-orange-400' },
  variety: { dot: 'bg-blue-400', border: 'border-l-blue-400' },
};

export function ShoppingItem({ item, urgency }: ShoppingItemProps) {
  const { state, dispatch } = useAppState();

  const checkboxId = `shop-${item.section}-${item.name.replace(/\s+/g, '-')}`;
  const isChecked = Boolean(state.shoppingChecked[checkboxId]);
  const qty = (state.shoppingChecked[`${checkboxId}-qty`] as number) || item.suggestedQty;

  const handleCheckChange = (checked: boolean) => {
    dispatch({ type: 'SET_SHOPPING_CHECKED', key: checkboxId, value: checked });
  };

  const handleQtyChange = (newQty: number) => {
    dispatch({ type: 'SET_SHOPPING_CHECKED', key: `${checkboxId}-qty`, value: newQty });
  };

  const urgencyStyle = URGENCY_STYLES[urgency];

  return (
    <div
      className={`flex items-center gap-3 p-3 bg-white rounded-sm border border-l-4 transition-all ${
        isChecked ? 'bg-green-50 border-success border-l-success' : `border-gray-200 ${urgencyStyle.border}`
      }`}
    >
      {/* Urgency indicator dot */}
      {!isChecked && (
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${urgencyStyle.dot}`} />
      )}

      {/* Checkbox */}
      <label className="relative flex items-center cursor-pointer flex-shrink-0">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={e => handleCheckChange(e.target.checked)}
          className="absolute opacity-0 w-0 h-0"
        />
        <span
          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
            isChecked ? 'bg-success border-success' : 'bg-gray-100 border-gray-200'
          }`}
        >
          {isChecked && (
            <span className="w-1.5 h-2.5 border-r-2 border-b-2 border-white rotate-45 translate-y-[-1px]" />
          )}
        </span>
      </label>

      {/* Item Details - min-w-0 allows flex shrinking, truncate handles text overflow */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="font-medium text-[15px] text-gray-800 truncate">{item.name}</span>
        {item.currentQty > 0 && (
          <span className="text-xs text-gray-400">{item.currentQty} left</span>
        )}
      </div>

      {/* Quantity Control - flex-shrink-0 prevents squishing */}
      <div className="flex-shrink-0">
        <QuantityControl value={qty} onChange={handleQtyChange} size="sm" />
      </div>
    </div>
  );
}
