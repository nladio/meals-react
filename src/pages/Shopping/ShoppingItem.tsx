import type { ShoppingListItem } from '../../types';

type Urgency = 'restock' | 'low' | 'variety';

interface ShoppingItemProps {
  item: ShoppingListItem;
  urgency: Urgency;
}

const URGENCY_STYLES: Record<Urgency, { border: string }> = {
  restock: { border: 'border-l-red-500' },
  low: { border: 'border-l-orange-400' },
  variety: { border: 'border-l-blue-400' },
};

export function ShoppingItem({ item, urgency }: ShoppingItemProps) {
  const urgencyStyle = URGENCY_STYLES[urgency];

  return (
    <div
      className={`flex items-center gap-3 p-3 bg-white rounded-sm border border-l-4 border-gray-200 ${urgencyStyle.border}`}
    >
      <span className={`w-2 h-2 rounded-full flex-shrink-0`} />

      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="font-medium text-[15px] text-gray-800 truncate">{item.name}</span>
        {item.currentQty > 0 && (
          <span className="text-xs text-gray-400">{item.currentQty} left</span>
        )}
      </div>
    </div>
  );
}
