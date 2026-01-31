import type { ShoppingListItem } from '../../types';
import { formatRelativeDate } from '../../utils/helpers';
import { useAppState } from '../../hooks/useAppState';
import { QuantityControl } from '../../components/ui/QuantityControl';

interface ShoppingItemProps {
  item: ShoppingListItem;
}

export function ShoppingItem({ item }: ShoppingItemProps) {
  const { state, dispatch } = useAppState();

  const checkboxId = `shop-${item.section}-${item.name.replace(/\s+/g, '-')}`;
  const isChecked = Boolean(state.shoppingChecked[checkboxId]);
  const qty = (state.shoppingChecked[`${checkboxId}-qty`] as number) || item.suggestedQty;

  const lastBoughtText = item.lastBought
    ? formatRelativeDate(item.lastBought)
    : 'Never bought';

  const handleCheckChange = (checked: boolean) => {
    dispatch({ type: 'SET_SHOPPING_CHECKED', key: checkboxId, value: checked });
  };

  const handleQtyChange = (newQty: number) => {
    dispatch({ type: 'SET_SHOPPING_CHECKED', key: `${checkboxId}-qty`, value: newQty });
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 bg-white rounded-sm border transition-all ${
        isChecked ? 'bg-green-50 border-success' : 'border-gray-200'
      }`}
    >
      {/* Checkbox */}
      <label className="relative flex items-center cursor-pointer">
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

      {/* Item Details */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="font-medium text-[15px] text-gray-800">{item.name}</span>
        <span className="text-xs text-gray-400">
          {item.currentQty > 0 && `[${item.currentQty} left] `}
          {lastBoughtText}
        </span>
      </div>

      {/* Quantity Control */}
      <QuantityControl value={qty} onChange={handleQtyChange} size="sm" />
    </div>
  );
}
