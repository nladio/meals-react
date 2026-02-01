import { useState } from 'react';
import type { InventoryItem, Section } from '../../types';
import { FoodItem } from './FoodItem';

interface SubcategoryGroupProps {
  subcategory: string;
  items: InventoryItem[];
  section: Section;
}

export function SubcategoryGroup({ subcategory, items, section }: SubcategoryGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-t-lg hover:bg-gray-100 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <span className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
            ▶
          </span>
          <span className="font-medium text-sm text-gray-700">{subcategory}</span>
        </div>
        <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full">
          {totalQuantity}
        </span>
      </button>

      {isExpanded && (
        <div className="flex flex-col gap-2 pt-2">
          {items.map(item => (
            <FoodItem key={item.id} item={item} section={section} />
          ))}
        </div>
      )}
    </div>
  );
}
