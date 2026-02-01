import type { ShoppingListItem } from '../../types';

type Urgency = 'restock' | 'low' | 'variety';

interface ShoppingItemProps {
  item: ShoppingListItem;
  urgency: Urgency;
}

const URGENCY_STYLES: Record<Urgency, string> = {
  restock: 'bg-red-50 border-l-[3px] border-l-danger',
  low: 'bg-amber-50 border-l-[3px] border-l-warning',
  variety: 'bg-gray-100 border-l-[3px] border-l-gray-300',
};

export function ShoppingItem({ item, urgency }: ShoppingItemProps) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-sm ${URGENCY_STYLES[urgency]}`}>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="font-medium text-[15px] truncate">{item.name}</span>
        {item.currentQty > 0 && (
          <span className="text-xs text-gray-400">{item.currentQty} left</span>
        )}
      </div>
    </div>
  );
}
