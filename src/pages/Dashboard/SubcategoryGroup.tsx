import { useState } from 'react';
import type { InventoryItem, Section, NutritionTag } from '../../types';
import { FoodItem } from './FoodItem';

interface GroupedItem {
  item: InventoryItem;
  isDualUse: boolean;
  nutritionTags?: NutritionTag[];
}

interface SubcategoryGroupProps {
  subcategory: string;
  groupedItems: GroupedItem[];
  section: Section;
}

export function SubcategoryGroup({ subcategory, groupedItems, section }: SubcategoryGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const totalQuantity = groupedItems.reduce((sum, { item }) => sum + item.quantity, 0);

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
          {groupedItems.map(({ item, isDualUse, nutritionTags }) => (
            <FoodItem key={item.id} item={item} section={section} isDualUse={isDualUse} nutritionTags={nutritionTags} />
          ))}
        </div>
      )}
    </div>
  );
}
