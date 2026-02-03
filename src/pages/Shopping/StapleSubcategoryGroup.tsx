import { useState } from 'react';
import type { KnownItem, Section, ShoppingListItem, Store } from '../../types';
import { ShoppingItem } from './ShoppingItem';

type Variant = 'staple' | 'user-list';

interface ShoppingSubcategoryGroupProps {
  category: string;
  items: ShoppingListItem[];
  store: Store;
  variant: Variant;
  knownMap?: Map<string, KnownItem>;
  onAddToList?: (name: string, section: Section) => void;
  onRemove?: (name: string) => void;
}

export function ShoppingSubcategoryGroup({
  category,
  items,
  store,
  variant,
  knownMap,
  onAddToList,
  onRemove,
}: ShoppingSubcategoryGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg hover:from-gray-100 hover:to-gray-50 transition-all active:scale-[0.99] text-left"
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-primary/60 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
            style={{ transitionTimingFunction: 'var(--ease-bounce)' }}
          >
            ▶
          </span>
          <span className="font-medium text-sm text-gray-700">{category}</span>
        </div>
        <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          {items.length}
        </span>
      </button>

      {isExpanded && (
        <div className="flex flex-col gap-2 pt-2 animate-slide-down">
          {items.map(item => (
            <ShoppingItem
              key={`${variant}-${store}-${category}-${item.name}`}
              item={item}
              variant={variant}
              nutritionTags={knownMap?.get(item.name)?.nutritionTags}
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
