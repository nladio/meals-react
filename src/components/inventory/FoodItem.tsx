import type { InventoryItem, Section, NutritionTag } from '../../types';
import { formatRelativeDate, getExpiryStatus, type ExpiryStatus } from '../../utils/helpers';
import { useAppState } from '../../hooks/useAppState';
import { NutritionBadges } from '../../components/ui/NutritionBadge';

function getExpiryColorClass(status: ExpiryStatus): string {
  switch (status) {
    case 'expired': return 'text-red-500';
    case 'expiring-soon': return 'text-amber-500';
    default: return 'text-gray-400';
  }
}

interface FoodItemProps {
  item: InventoryItem;
  section: Section;
  isDualUse?: boolean;
  nutritionTags?: NutritionTag[];
}

export function FoodItem({ item, section, isDualUse = false, nutritionTags }: FoodItemProps) {
  const { dispatch } = useAppState();
  const isLow = item.quantity <= 2;
  const relativeDate = formatRelativeDate(item.addedDate);
  const expiryStatus = getExpiryStatus(item.expiryDate);

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-sm transition-all ${
        isLow ? 'bg-amber-50 border-l-[3px] border-l-warning' : 'bg-gray-100 border-l-[3px] border-l-success'
      }`}
    >
      <button
        onClick={() => dispatch({ type: 'DECREMENT_ITEM', section, id: item.id })}
        className="w-11 h-11 flex items-center justify-center bg-red-50 text-danger rounded-full text-xl font-semibold hover:bg-red-100 transition-all active:scale-95 shrink-0"
      >
        -
      </button>

      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-[15px] truncate">{item.name}</span>
          {isDualUse && (
            <span
              className="text-[10px] px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded-full font-medium shrink-0"
              title="This item appears in both Ready to eat and Ingredients"
            >
              2x
            </span>
          )}
          <NutritionBadges tags={nutritionTags} />
        </div>
        <span className="text-xs text-gray-400">{relativeDate}</span>
        {item.expiryDate && (
          <span className={`text-xs ${getExpiryColorClass(expiryStatus)}`}>
            {expiryStatus === 'expired' ? 'Expired' : `Expires: ${new Date(item.expiryDate).toLocaleDateString()}`}
          </span>
        )}
      </div>

      <span
        className={`font-bold text-lg px-3.5 py-1.5 bg-white rounded-full min-w-[44px] text-center border-2 ${
          isLow ? 'text-warning border-warning' : 'text-success border-success'
        }`}
      >
        {item.quantity}
      </span>

      <button
        onClick={() => dispatch({ type: 'INCREMENT_ITEM', section, id: item.id })}
        className="w-11 h-11 flex items-center justify-center bg-green-50 text-success rounded-full text-xl font-semibold hover:bg-green-100 transition-all active:scale-95 shrink-0"
      >
        +
      </button>
    </div>
  );
}
