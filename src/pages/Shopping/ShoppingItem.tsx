import type { ShoppingListItem } from '../../types';

type Urgency = 'restock' | 'low' | 'variety';

interface ShoppingItemProps {
  item: ShoppingListItem;
  urgency: Urgency;
}

const URGENCY_BORDER_COLORS: Record<Urgency, string> = {
  restock: 'border-l-red-500',
  low: 'border-l-orange-400',
  variety: 'border-l-blue-400',
};

export function ShoppingItem({ item, urgency }: ShoppingItemProps) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-l-4 border-gray-100 ${URGENCY_BORDER_COLORS[urgency]} shadow-sm hover:shadow-md transition-shadow w-full`}
    >
      <div className="flex flex-col gap-0.5 flex-1">
        <span className="font-medium text-gray-800">{item.name}</span>
        {item.currentQty > 0 && (
          <span className="text-xs text-gray-400">{item.currentQty} left</span>
        )}
      </div>
    </div>
  );
}
