import type { Section, InventoryItem } from '../../types';
import { useAppState, getMergedKnownItems } from '../../hooks/useAppState';
import { SubcategoryGroup } from './SubcategoryGroup';
import { RestockControls } from './RestockControls';

interface InventorySectionProps {
  section: Section;
  title: string;
}

export function InventorySection({ section, title }: InventorySectionProps) {
  const { state } = useAppState();
  const items = state.inventory[section];
  const knownItems = getMergedKnownItems(state)[section];

  // Group items by subcategory
  const groupedItems = items.reduce((groups, item) => {
    const knownItem = knownItems.find(k => k.name === item.name);
    const subcategory = knownItem?.subcategory || 'Other';
    if (!groups[subcategory]) groups[subcategory] = [];
    groups[subcategory].push(item);
    return groups;
  }, {} as Record<string, InventoryItem[]>);

  const sortedSubcategories = Object.keys(groupedItems).sort((a, b) => {
    if (a === 'Other') return 1;
    if (b === 'Other') return -1;
    return a.localeCompare(b);
  });

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
          sortedSubcategories.map(subcategory => (
            <SubcategoryGroup
              key={subcategory}
              subcategory={subcategory}
              items={groupedItems[subcategory]}
              section={section}
            />
          ))
        )}
      </div>

      <RestockControls section={section} />
    </section>
  );
}
