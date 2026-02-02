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

const SECTIONS: Section[] = ['fresh', 'frozen', 'dry'];

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
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <span className="font-medium text-[15px] truncate">{item.name}</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs text-gray-400">{SECTION_LABEL[item.section]}</span>
                  <NutritionBadges tags={item.nutritionTags} />
                </div>
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

const NATURAL_PROTEIN_CONFIG: NutritionSectionConfig = {
  badge: 'N',
  title: 'Natural Protein',
  emptyMessage: 'No natural protein items in stock',
  emptyIcon: '🥚',
  badgeBg: 'bg-purple-100',
  badgeText: 'text-purple-600',
  borderColor: 'border-l-purple-500',
  quantityColors: 'text-purple-600 border-purple-500',
};

const SUPPLEMENTS_CONFIG: NutritionSectionConfig = {
  badge: 'P',
  title: 'Protein Supplements',
  emptyMessage: 'No protein supplements in stock',
  emptyIcon: '🥤',
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

function hasTag(item: NutritionItem, tag: NutritionTag): boolean {
  return item.nutritionTags.includes(tag);
}

export function WhatToEat() {
  const { state } = useAppState();
  const knownItems = getMergedKnownItems(state);

  const nutritionItems: NutritionItem[] = SECTIONS.flatMap(section =>
    state.inventory[section]
      .filter(invItem => invItem.quantity > 0)
      .map(invItem => {
        const known = knownItems[section].find(k => k.name === invItem.name);
        return known?.nutritionTags?.length
          ? { name: invItem.name, quantity: invItem.quantity, section, nutritionTags: known.nutritionTags }
          : null;
      })
      .filter((item): item is NutritionItem => item !== null)
  );

  const naturalProteinItems = nutritionItems.filter(item => hasTag(item, 'natural-protein'));
  const supplementItems = nutritionItems.filter(item => hasTag(item, 'high-protein') && !hasTag(item, 'natural-protein'));
  const highFiberItems = nutritionItems.filter(item => hasTag(item, 'high-fiber'));

  return (
    <div>
      <PageHeader title="What to Eat" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NutritionSection config={NATURAL_PROTEIN_CONFIG} items={naturalProteinItems} />
        <NutritionSection config={SUPPLEMENTS_CONFIG} items={supplementItems} />
        <NutritionSection config={FIBER_CONFIG} items={highFiberItems} />
      </div>
    </div>
  );
}
