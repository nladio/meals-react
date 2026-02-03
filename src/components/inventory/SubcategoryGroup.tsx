import { useState } from 'react';
import type { InventoryItem, Section, NutritionTag, Store } from '../../types';
import { FoodItem } from './FoodItem';

interface GroupedItem {
  item: InventoryItem;
  isDualUse: boolean;
  nutritionTags?: NutritionTag[];
  stores?: Store[];
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
        className="w-full flex items-center justify-between px-3 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg hover:from-gray-100 hover:to-gray-50 transition-all active:scale-[0.99] text-left"
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-primary/60 transition-transform duration-300 ${
              isExpanded ? 'rotate-90' : ''
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            ▶
          </span>
          <span className="font-medium text-sm text-gray-700">{subcategory}</span>
        </div>
        <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          {totalQuantity}
        </span>
      </button>

      {isExpanded && (
        <div className="flex flex-col gap-2 pt-2 animate-slide-down">
          {groupedItems.map(({ item, isDualUse, nutritionTags, stores }) => (
            <FoodItem key={item.id} item={item} section={section} isDualUse={isDualUse} nutritionTags={nutritionTags} stores={stores} />
          ))}
        </div>
      )}
    </div>
  );
}
