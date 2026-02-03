import type { InventoryItem, Section, NutritionTag, Store } from '../../types';
import { formatRelativeDate, getExpiryStatus, type ExpiryStatus } from '../../utils/helpers';
import { useAppState } from '../../hooks/useAppState';

function getExpiryColorClass(status: ExpiryStatus): string {
  switch (status) {
    case 'expired': return 'text-danger';
    case 'expiring-soon': return 'text-warning';
    default: return 'text-text-light';
  }
}

function getNutritionBgColor(tags?: NutritionTag[]): string {
  if (!tags || tags.length === 0) return 'bg-gray-100';

  const hasProtein = tags.includes('high-protein');
  const hasFiber = tags.includes('high-fiber');

  if (hasProtein && hasFiber) return 'bg-both-light';
  if (hasProtein) return 'bg-protein-light';
  if (hasFiber) return 'bg-fiber-light';
  return 'bg-gray-100';
}

interface FoodItemProps {
  item: InventoryItem;
  section: Section;
  isDualUse?: boolean;
  nutritionTags?: NutritionTag[];
  stores?: Store[];
}

export function FoodItem({ item, section, isDualUse = false, nutritionTags, stores }: FoodItemProps) {
  const { dispatch } = useAppState();
  const isLow = item.quantity <= 2;
  const relativeDate = formatRelativeDate(item.addedDate);
  const expiryStatus = getExpiryStatus(item.expiryDate);

  const handleAddToShoppingList = () => {
    // Add to the first available store for this item
    const store = stores?.[0] || 'grocery';
    dispatch({
      type: 'ADD_TO_SHOPPING_LIST',
      entry: { name: item.name, section, store },
    });
  };

  const bgColor = getNutritionBgColor(nutritionTags);

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-sm transition-all ${bgColor} ${
        isLow ? 'border-l-[3px] border-l-warning' : 'border-l-[3px] border-l-success'
      }`}
    >
      <button
        onClick={() => dispatch({ type: 'DECREMENT_ITEM', section, id: item.id })}
        className="w-11 h-11 flex items-center justify-center bg-danger/10 text-danger rounded-full text-xl font-semibold hover:bg-danger/20 transition-all active:scale-95 shrink-0"
      >
        -
      </button>

      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-[15px] truncate">{item.name}</span>
          {isDualUse && (
            <span
              className="text-[10px] px-1.5 py-0.5 bg-both-light text-both-text rounded-full font-medium shrink-0"
              title="This item appears in both Ready to eat and Ingredients"
            >
              2x
            </span>
          )}
        </div>
        <span className="text-xs text-text-light">{relativeDate}</span>
        {item.expiryDate && (
          <span className={`text-xs ${getExpiryColorClass(expiryStatus)}`}>
            {expiryStatus === 'expired' ? 'Expired' : `Expires: ${new Date(item.expiryDate).toLocaleDateString()}`}
          </span>
        )}
      </div>

      <button
        onClick={handleAddToShoppingList}
        className="w-8 h-8 flex items-center justify-center text-text-light hover:text-primary hover:bg-primary/10 rounded-full transition-all shrink-0"
        aria-label={`Add ${item.name} to shopping list`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>

      <span
        className={`font-bold text-lg px-3.5 py-1.5 bg-white rounded-full min-w-[44px] text-center border-2 ${
          isLow ? 'text-warning border-warning' : 'text-success border-success'
        }`}
      >
        {item.quantity}
      </span>

      <button
        onClick={() => dispatch({ type: 'INCREMENT_ITEM', section, id: item.id })}
        className="w-11 h-11 flex items-center justify-center bg-success/10 text-success rounded-full text-xl font-semibold hover:bg-success/20 transition-all active:scale-95 shrink-0"
      >
        +
      </button>
    </div>
  );
}
