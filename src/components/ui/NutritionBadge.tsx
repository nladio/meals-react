import type { NutritionTag } from '../../types';

interface BadgeConfig {
  label: string;
  title: string;
  colors: string;
}

const BADGE_CONFIG: Record<NutritionTag, BadgeConfig> = {
  'high-protein': {
    label: 'P',
    title: 'High Protein',
    colors: 'bg-green-100 text-green-600',
  },
  'high-fiber': {
    label: 'F',
    title: 'High Fiber',
    colors: 'bg-teal-100 text-teal-600',
  },
};

interface NutritionBadgeProps {
  tag: NutritionTag;
}

export function NutritionBadge({ tag }: NutritionBadgeProps) {
  const config = BADGE_CONFIG[tag];

  return (
    <span
      className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ${config.colors}`}
      title={config.title}
    >
      {config.label}
    </span>
  );
}

interface NutritionBadgesProps {
  tags?: NutritionTag[];
}

export function NutritionBadges({ tags }: NutritionBadgesProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <>
      {tags.map(tag => (
        <NutritionBadge key={tag} tag={tag} />
      ))}
    </>
  );
}
