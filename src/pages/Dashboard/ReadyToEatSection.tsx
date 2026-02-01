import { useState } from 'react';
import type { Section, InventoryItem, KnownItem, NutritionTag } from '../../types';
import { useAppState, getMergedKnownItems } from '../../hooks/useAppState';
import { EmptyState } from '../../components/EmptyState';
import { FoodItem } from '../../components/inventory';

interface GroupedItem {
  item: InventoryItem;
  nutritionTags?: NutritionTag[];
}

interface SectionData {
  section: Section;
  title: string;
  items: GroupedItem[];
}

export function ReadyToEatSection() {
  const { state } = useAppState();
  const mergedKnownItems = getMergedKnownItems(state);
  const [expandedSections, setExpandedSections] = useState<Set<Section>>(
    new Set(['fresh', 'frozen', 'dry'])
  );

  const toggleSection = (section: Section) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  // Helper to get known item data for a section
  const getKnownItem = (section: Section, itemName: string): KnownItem | undefined => {
    return mergedKnownItems[section].find(k => k.name === itemName);
  };

  // Filter items to only show meals (items with 'meal' usage)
  const getMealItems = (section: Section): GroupedItem[] => {
    const items = state.inventory[section];
    const mealItems: GroupedItem[] = [];

    for (const item of items) {
      const knownItem = getKnownItem(section, item.name);
      const usages = knownItem?.usages || ['meal'];

      if (usages.includes('meal')) {
        mealItems.push({
          item,
          nutritionTags: knownItem?.nutritionTags,
        });
      }
    }

    return mealItems;
  };

  const sections: SectionData[] = [
    { section: 'fresh', title: 'Fresh', items: getMealItems('fresh') },
    { section: 'frozen', title: 'Frozen', items: getMealItems('frozen') },
    { section: 'dry', title: 'Dry/Pantry', items: getMealItems('dry') },
  ];

  const totalMealItems = sections.reduce((sum, s) => sum + s.items.length, 0);

  if (totalMealItems === 0) {
    return (
      <section className="bg-white rounded-[12px] p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
        <h2 className="text-base font-semibold text-gray-600 mb-4 uppercase tracking-wide">
          Ready to Eat
        </h2>
        <EmptyState message="No ready-to-eat items" icon="🍽️" />
      </section>
    );
  }

  return (
    <section className="bg-white rounded-[12px] p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <h2 className="text-base font-semibold text-gray-600 mb-4 uppercase tracking-wide">
        Ready to Eat
      </h2>

      <div className="flex flex-col gap-3">
        {sections.map(({ section, title, items }) => {
          if (items.length === 0) return null;
          const isExpanded = expandedSections.has(section);
          const totalQuantity = items.reduce((sum, { item }) => sum + item.quantity, 0);

          return (
            <div key={section} className="mb-2">
              <button
                onClick={() => toggleSection(section)}
                className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-t-lg hover:bg-gray-100 transition-all active:scale-[0.98] text-left"
              >
                <div className="flex items-center gap-2">
                  <span className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                    ▶
                  </span>
                  <span className="font-medium text-sm text-gray-700">{title}</span>
                </div>
                <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full">
                  {totalQuantity}
                </span>
              </button>

              {isExpanded && (
                <div className="flex flex-col gap-2 pt-2">
                  {items.map(({ item, nutritionTags }) => (
                    <FoodItem
                      key={item.id}
                      item={item}
                      section={section}
                      nutritionTags={nutritionTags}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
