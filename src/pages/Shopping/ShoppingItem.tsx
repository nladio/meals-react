import type { ShoppingListItem } from '../../types';

type Urgency = 'restock' | 'low' | 'variety';
type Variant = 'user-list' | 'staple' | 'suggestion';

interface ShoppingItemProps {
  item: ShoppingListItem;
  urgency?: Urgency;
  variant: Variant;
  onAddToList?: () => void;
  onRemove?: () => void;
}

const URGENCY_STYLES: Record<Urgency, string> = {
  restock: 'bg-red-50 border-l-[3px] border-l-danger',
  low: 'bg-amber-50 border-l-[3px] border-l-warning',
  variety: 'bg-gray-100 border-l-[3px] border-l-gray-300',
};

const VARIANT_STYLES: Record<Variant, string> = {
  'user-list': 'bg-blue-50 border-l-[3px] border-l-primary',
  staple: 'bg-gray-100 border-l-[3px] border-l-gray-300',
  suggestion: 'bg-gray-100 border-l-[3px] border-l-gray-300',
};

export function ShoppingItem({ item, urgency, variant, onAddToList, onRemove }: ShoppingItemProps) {
  const style = variant === 'suggestion' && urgency ? URGENCY_STYLES[urgency] : VARIANT_STYLES[variant];

  return (
    <div className={`flex items-center gap-3 p-3 rounded-sm ${style}`}>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="font-medium text-[15px] truncate">{item.name}</span>
        {item.currentQty > 0 && (
          <span className="text-xs text-gray-400">{item.currentQty} left</span>
        )}
      </div>

      {variant === 'user-list' && onRemove && (
        <button
          onClick={onRemove}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-danger hover:bg-red-50 rounded-full transition-all"
          aria-label={`Remove ${item.name} from list`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {(variant === 'staple' || variant === 'suggestion') && onAddToList && (
        <button
          onClick={onAddToList}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-blue-50 rounded-full transition-all"
          aria-label={`Add ${item.name} to shopping list`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      )}
    </div>
  );
}
