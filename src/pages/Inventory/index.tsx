import type { Section, InventoryItem, KnownItem, NutritionTag } from '../../types';
import { useAppState, getMergedKnownItems, getTotalServings } from '../../hooks/useAppState';
import { PageHeader } from '../../components/PageHeader';
import { EmptyState } from '../../components/EmptyState';
import { SubcategoryGroup, RestockControls } from '../../components/inventory';

interface GroupedItem {
  item: InventoryItem;
  isDualUse: boolean;
  nutritionTags?: NutritionTag[];
}

interface InventorySectionProps {
  section: Section;
  title: string;
  items: InventoryItem[];
  knownItems: KnownItem[];
}

function InventorySection({ section, title, items, knownItems }: InventorySectionProps) {
  const getKnownItem = (itemName: string): KnownItem | undefined => {
    return knownItems.find(k => k.name === itemName);
  };

  // Group items by usage
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

export function Inventory() {
  const { state } = useAppState();
  const mergedKnownItems = getMergedKnownItems(state);
  const totalServings = getTotalServings(state);

  let statusClass = 'bg-green-50 border border-success';
  if (totalServings <= 2) statusClass = 'bg-red-50 border border-danger';
  else if (totalServings <= 6) statusClass = 'bg-orange-50 border border-warning';

  return (
    <div>
      <PageHeader title="Inventory" showBackButton={false} />

      {/* Total Summary */}
      <section className="bg-white rounded-[12px] p-5 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
        <div className={`flex justify-between items-center p-4 rounded-sm ${statusClass}`}>
          <span className="font-medium text-gray-600">Total Food Available</span>
          <span className="font-semibold text-base">{totalServings} servings</span>
        </div>
      </section>

      {/* All inventory sections */}
      <InventorySection
        section="fresh"
        title="Fresh Food"
        items={state.inventory.fresh}
        knownItems={mergedKnownItems.fresh}
      />
      <InventorySection
        section="frozen"
        title="Frozen Food"
        items={state.inventory.frozen}
        knownItems={mergedKnownItems.frozen}
      />
      <InventorySection
        section="dry"
        title="Dry/Pantry"
        items={state.inventory.dry}
        knownItems={mergedKnownItems.dry}
      />
    </div>
  );
}
