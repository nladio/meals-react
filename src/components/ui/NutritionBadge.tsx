import type { NutritionTag } from '../../types';

interface NutritionBadgeProps {
  tag: NutritionTag;
}

export function NutritionBadge({ tag }: NutritionBadgeProps) {
  if (tag === 'high-protein') {
    return (
      <span
        className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-600 rounded-full font-medium shrink-0"
        title="High Protein"
      >
        P
      </span>
    );
  }

  return (
    <span
      className="text-[10px] px-1.5 py-0.5 bg-teal-100 text-teal-600 rounded-full font-medium shrink-0"
      title="High Fiber"
    >
      F
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
