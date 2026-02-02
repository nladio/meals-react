import { useState } from 'react';
import type { Section, Store } from '../../types';
import type { StapleItem } from '../../utils/stapleCategorization';
import { ShoppingItem } from './ShoppingItem';

interface StapleSubcategoryGroupProps {
  category: string;
  items: StapleItem[];
  store: Store;
  onAddToList: (name: string, section: Section) => void;
}

export function StapleSubcategoryGroup({
  category,
  items,
  store,
  onAddToList,
}: StapleSubcategoryGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-1.5 bg-gray-50 rounded hover:bg-gray-100 transition-all active:scale-[0.98] text-left"
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-gray-400 transition-transform duration-200 text-xs ${isExpanded ? 'rotate-90' : ''}`}
          >
            ▶
          </span>
          <span className="font-medium text-xs text-gray-600">{category}</span>
        </div>
        <span className="text-xs text-gray-500 bg-white px-1.5 py-0.5 rounded-full">
          {items.length}
        </span>
      </button>

      {isExpanded && (
        <div className="flex flex-col gap-2 pt-2 pl-2">
          {items.map(item => (
            <ShoppingItem
              key={`staple-${store}-${category}-${item.name}`}
              item={item}
              variant="staple"
              onAddToList={() => onAddToList(item.name, item.section)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
