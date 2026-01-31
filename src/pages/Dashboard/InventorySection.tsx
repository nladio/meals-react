import type { Section } from '../../types';
import { useAppState } from '../../hooks/useAppState';
import { FoodItem } from './FoodItem';
import { RestockControls } from './RestockControls';

interface InventorySectionProps {
  section: Section;
  title: string;
}

export function InventorySection({ section, title }: InventorySectionProps) {
  const { state } = useAppState();
  const items = state.inventory[section];

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
          items.map(item => <FoodItem key={item.id} item={item} section={section} />)
        )}
      </div>

      <RestockControls section={section} />
    </section>
  );
}
