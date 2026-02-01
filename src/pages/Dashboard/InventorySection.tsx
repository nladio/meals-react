import type { Section, InventoryItem, KnownItem, NutritionTag } from '../../types';
import { useAppState, getMergedKnownItems } from '../../hooks/useAppState';
import { EmptyState } from '../../components/EmptyState';
import { SubcategoryGroup, RestockControls } from '../../components/inventory';

interface InventorySectionProps {
  section: Section;
  title: string;
}

interface GroupedItem {
  item: InventoryItem;
  isDualUse: boolean;
  nutritionTags?: NutritionTag[];
}

export function InventorySection({ section, title }: InventorySectionProps) {
  const { state } = useAppState();
  const items = state.inventory[section];
  const knownItems = getMergedKnownItems(state)[section];

  // Helper to get known item data
  const getKnownItem = (itemName: string): KnownItem | undefined => {
    return knownItems.find(k => k.name === itemName);
  };

  // Group items by usage (meal = "Ready to eat", ingredient = "Ingredients")
  // Items with both usages appear in both groups
  const mealItems: GroupedItem[] = [];
  const ingredientItems: GroupedItem[] = [];

  for (const item of items) {
    const knownItem = getKnownItem(item.name);
    const usages = knownItem?.usages || ['meal'];
    const isDualUse = usages.includes('meal') && usages.includes('ingredient');
    const nutritionTags = knownItem?.nutritionTags;

    if (usages.includes('meal')) {
      mealItems.push({ item, isDualUse, nutritionTags });
    }
    if (usages.includes('ingredient')) {
      ingredientItems.push({ item, isDualUse, nutritionTags });
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
          <EmptyState message="No items stocked" icon="📦" />
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
