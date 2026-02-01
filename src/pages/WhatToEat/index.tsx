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

interface NutritionSectionConfig {
  badge: string;
  title: string;
  emptyMessage: string;
  emptyIcon: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  quantityColors: string;
}

const SECTION_LABEL: Record<Section, string> = {
  fresh: 'Fresh',
  frozen: 'Frozen',
  dry: 'Dry',
};

interface NutritionSectionProps {
  config: NutritionSectionConfig;
  items: NutritionItem[];
}

function NutritionSection({ config, items }: NutritionSectionProps) {
  return (
    <section className="bg-white rounded-[12px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <h2 className="text-base font-semibold text-gray-600 mb-4 uppercase tracking-wide flex items-center gap-2">
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${config.badgeBg} ${config.badgeText}`}>
          {config.badge}
        </span>
        {config.title}
      </h2>
      {items.length === 0 ? (
        <EmptyState message={config.emptyMessage} icon={config.emptyIcon} />
      ) : (
        <div className="flex flex-col gap-2">
          {items.map(item => (
            <div
              key={`${item.section}-${item.name}`}
              className={`flex items-center gap-3 p-3 rounded-sm bg-gray-100 border-l-[3px] ${config.borderColor}`}
            >
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-[15px] truncate">{item.name}</span>
                  <NutritionBadges tags={item.nutritionTags} />
                </div>
                <span className="text-xs text-gray-400">{SECTION_LABEL[item.section]}</span>
              </div>
              <span className={`font-bold text-lg px-3.5 py-1.5 bg-white rounded-full min-w-[44px] text-center border-2 ${config.quantityColors}`}>
                {item.quantity}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

const PROTEIN_CONFIG: NutritionSectionConfig = {
  badge: 'P',
  title: 'High Protein',
  emptyMessage: 'No high-protein items in stock',
  emptyIcon: '🥚',
  badgeBg: 'bg-green-100',
  badgeText: 'text-green-600',
  borderColor: 'border-l-green-500',
  quantityColors: 'text-green-600 border-green-500',
};

const FIBER_CONFIG: NutritionSectionConfig = {
  badge: 'F',
  title: 'High Fiber',
  emptyMessage: 'No high-fiber items in stock',
  emptyIcon: '🥬',
  badgeBg: 'bg-teal-100',
  badgeText: 'text-teal-600',
  borderColor: 'border-l-teal-500',
  quantityColors: 'text-teal-600 border-teal-500',
};

export function WhatToEat() {
  const { state } = useAppState();
  const knownItems = getMergedKnownItems(state);

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
        <NutritionSection config={PROTEIN_CONFIG} items={highProteinItems} />
        <NutritionSection config={FIBER_CONFIG} items={highFiberItems} />
      </div>
    </div>
  );
}
