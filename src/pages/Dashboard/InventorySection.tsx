import type { Section, InventoryItem, KnownItem } from '../../types';
import { useAppState, getMergedKnownItems } from '../../hooks/useAppState';
import { SubcategoryGroup } from './SubcategoryGroup';
import { RestockControls } from './RestockControls';

interface InventorySectionProps {
  section: Section;
  title: string;
}

interface GroupedItem {
  item: InventoryItem;
  isDualUse: boolean;
}

export function InventorySection({ section, title }: InventorySectionProps) {
  const { state } = useAppState();
  const items = state.inventory[section];
  const knownItems = getMergedKnownItems(state)[section];

  // Helper to get usages for an item
  const getItemUsages = (itemName: string): KnownItem['usages'] => {
    const knownItem = knownItems.find(k => k.name === itemName);
    return knownItem?.usages || ['meal'];
  };

  // Group items by usage (meal = "Ready to eat", ingredient = "Ingredients")
  // Items with both usages appear in both groups
  const mealItems: GroupedItem[] = [];
  const ingredientItems: GroupedItem[] = [];

  for (const item of items) {
    const usages = getItemUsages(item.name);
    const isDualUse = usages.includes('meal') && usages.includes('ingredient');

    if (usages.includes('meal')) {
      mealItems.push({ item, isDualUse });
    }
    if (usages.includes('ingredient')) {
      ingredientItems.push({ item, isDualUse });
    }
  }

  const groups: { label: string; items: GroupedItem[] }[] = [];
  if (mealItems.length > 0) {
    groups.push({ label: 'Ready to eat', items: mealItems });
  }
  if (ingredientItems.length > 0) {
    groups.push({ label: 'Ingredients', items: ingredientItems });
  }

  return (
    <section className="bg-white rounded-[12px] p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <h2 className="text-base font-semibold text-gray-600 mb-4 uppercase tracking-wide">
        {title}
      </h2>

      <div className="flex flex-col gap-2">
        {items.length === 0 ? (
          <div className="flex items-center justify-center p-5 bg-gray-50 rounded-sm border-l-[3px] border-l-gray-200 text-gray-400">
            <span className="font-medium text-[15px]">No items stocked</span>
          </div>
        ) : (
          groups.map(group => (
            <SubcategoryGroup
              key={group.label}
              subcategory={group.label}
              groupedItems={group.items}
              section={section}
            />
          ))
        )}
      </div>

      <RestockControls section={section} />
    </section>
  );
}
