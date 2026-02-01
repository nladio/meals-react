import type { Section, NutritionTag } from '../../types';
import { useAppState, getMergedKnownItems } from '../../hooks/useAppState';
import { PageHeader } from '../../components/PageHeader';
import { EmptyState } from '../../components/EmptyState';
import { NutritionBadges } from '../../components/ui/NutritionBadge';

interface NutritionItem {
  name: string;
  quantity: number;
  section: Section;
  nutritionTags: NutritionTag[];
}

function sectionLabel(section: Section): string {
  switch (section) {
    case 'fresh': return 'Fresh';
    case 'frozen': return 'Frozen';
    case 'dry': return 'Dry';
  }
}

export function WhatToEat() {
  const { state } = useAppState();
  const knownItems = getMergedKnownItems(state);

  // Collect all in-stock items with nutrition tags
  const nutritionItems: NutritionItem[] = [];

  for (const section of ['fresh', 'frozen', 'dry'] as Section[]) {
    for (const invItem of state.inventory[section]) {
      if (invItem.quantity <= 0) continue;

      const known = knownItems[section].find(k => k.name === invItem.name);
      if (known?.nutritionTags && known.nutritionTags.length > 0) {
        nutritionItems.push({
          name: invItem.name,
          quantity: invItem.quantity,
          section,
          nutritionTags: known.nutritionTags,
        });
      }
    }
  }

  const highProteinItems = nutritionItems.filter(item => item.nutritionTags.includes('high-protein'));
  const highFiberItems = nutritionItems.filter(item => item.nutritionTags.includes('high-fiber'));

  return (
    <div>
      <PageHeader title="What to Eat" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* High Protein Section */}
        <section className="bg-white rounded-[12px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
          <h2 className="text-base font-semibold text-gray-600 mb-4 uppercase tracking-wide flex items-center gap-2">
            <span className="text-[12px] px-2 py-0.5 bg-green-100 text-green-600 rounded-full font-medium">P</span>
            High Protein
          </h2>
          {highProteinItems.length === 0 ? (
            <EmptyState message="No high-protein items in stock" icon="🥩" />
          ) : (
            <div className="flex flex-col gap-2">
              {highProteinItems.map(item => (
                <div
                  key={`${item.section}-${item.name}`}
                  className="flex items-center gap-3 p-3 rounded-sm bg-gray-100 border-l-[3px] border-l-green-500"
                >
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-[15px] truncate">{item.name}</span>
                      <NutritionBadges tags={item.nutritionTags} />
                    </div>
                    <span className="text-xs text-gray-400">{sectionLabel(item.section)}</span>
                  </div>
                  <span className="font-bold text-lg px-3.5 py-1.5 bg-white rounded-full min-w-[44px] text-center border-2 text-green-600 border-green-500">
                    {item.quantity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* High Fiber Section */}
        <section className="bg-white rounded-[12px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
          <h2 className="text-base font-semibold text-gray-600 mb-4 uppercase tracking-wide flex items-center gap-2">
            <span className="text-[12px] px-2 py-0.5 bg-teal-100 text-teal-600 rounded-full font-medium">F</span>
            High Fiber
          </h2>
          {highFiberItems.length === 0 ? (
            <EmptyState message="No high-fiber items in stock" icon="🥬" />
          ) : (
            <div className="flex flex-col gap-2">
              {highFiberItems.map(item => (
                <div
                  key={`${item.section}-${item.name}`}
                  className="flex items-center gap-3 p-3 rounded-sm bg-gray-100 border-l-[3px] border-l-teal-500"
                >
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-[15px] truncate">{item.name}</span>
                      <NutritionBadges tags={item.nutritionTags} />
                    </div>
                    <span className="text-xs text-gray-400">{sectionLabel(item.section)}</span>
                  </div>
                  <span className="font-bold text-lg px-3.5 py-1.5 bg-white rounded-full min-w-[44px] text-center border-2 text-teal-600 border-teal-500">
                    {item.quantity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
