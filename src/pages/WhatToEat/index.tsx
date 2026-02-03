import type { Section, NutritionTag } from '../../types';
import { useAppState, getMergedKnownItems } from '../../hooks/useAppState';
import { PageHeader } from '../../components/PageHeader';
import { EmptyState } from '../../components/EmptyState';

function NutritionLegend() {
  return (
    <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
      <span className="font-medium">Legend:</span>
      <div className="flex items-center gap-1.5">
        <span className="w-4 h-4 rounded bg-protein-light border border-protein-border"></span>
        <span>Protein</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-4 h-4 rounded bg-fiber-light border border-fiber-border"></span>
        <span>Fiber</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-4 h-4 rounded bg-both-light border border-both-border"></span>
        <span>Both</span>
      </div>
    </div>
  );
}

function getNutritionBgColor(tags: NutritionTag[]): string {
  const hasProtein = tags.includes('high-protein');
  const hasFiber = tags.includes('high-fiber');

  if (hasProtein && hasFiber) return 'bg-both-light';
  if (hasProtein) return 'bg-protein-light';
  if (hasFiber) return 'bg-fiber-light';
  return 'bg-gray-100';
}

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
              className={`flex items-center gap-3 p-3 rounded-sm ${getNutritionBgColor(item.nutritionTags)} border-l-[3px] ${config.borderColor}`}
            >
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <span className="font-medium text-[15px] truncate">{item.name}</span>
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
  badgeBg: 'bg-protein-light',
  badgeText: 'text-protein-text',
  borderColor: 'border-l-protein',
  quantityColors: 'text-protein-text border-protein',
};

const FIBER_CONFIG: NutritionSectionConfig = {
  badge: 'F',
  title: 'High Fiber',
  emptyMessage: 'No high-fiber items in stock',
  emptyIcon: '🥬',
  badgeBg: 'bg-fiber-light',
  badgeText: 'text-fiber-text',
  borderColor: 'border-l-fiber',
  quantityColors: 'text-fiber-text border-fiber',
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

  const highProteinItems = nutritionItems.filter(item => hasTag(item, 'high-protein'));
  const highFiberItems = nutritionItems.filter(item => hasTag(item, 'high-fiber'));

  return (
    <div>
      <PageHeader title="What to Eat" />
      <NutritionLegend />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NutritionSection config={PROTEIN_CONFIG} items={highProteinItems} />
        <NutritionSection config={FIBER_CONFIG} items={highFiberItems} />
      </div>
    </div>
  );
}
