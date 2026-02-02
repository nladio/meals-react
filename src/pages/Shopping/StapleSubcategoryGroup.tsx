import { useState } from 'react';
import type { Section, ShoppingListItem, Store } from '../../types';
import { ShoppingItem } from './ShoppingItem';

type Variant = 'staple' | 'user-list';

interface ShoppingSubcategoryGroupProps {
  category: string;
  items: ShoppingListItem[];
  store: Store;
  variant: Variant;
  onAddToList?: (name: string, section: Section) => void;
  onRemove?: (name: string) => void;
}

export function ShoppingSubcategoryGroup({
  category,
  items,
  store,
  variant,
  onAddToList,
  onRemove,
}: ShoppingSubcategoryGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-t-lg hover:bg-gray-100 transition-all active:scale-[0.98] text-left"
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
          >
            ▶
          </span>
          <span className="font-medium text-sm text-gray-700">{category}</span>
        </div>
        <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full">
          {items.length}
        </span>
      </button>

      {isExpanded && (
        <div className="flex flex-col gap-2 pt-2">
          {items.map(item => (
            <ShoppingItem
              key={`${variant}-${store}-${category}-${item.name}`}
              item={item}
              variant={variant}
              onAddToList={variant === 'staple' && onAddToList ? () => onAddToList(item.name, item.section) : undefined}
              onRemove={variant === 'user-list' && onRemove ? () => onRemove(item.name) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Backwards-compatible alias
export const StapleSubcategoryGroup = ShoppingSubcategoryGroup;
