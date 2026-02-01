import { useState } from 'react';
import { useAppState } from '../../hooks/useAppState';
import { categorizeByPrepTime } from '../../utils/prepTimeCategories';
import { FoodItem } from '../../components/inventory';

export function InstantPrepSection() {
  const { state } = useAppState();
  const [isExpanded, setIsExpanded] = useState(true);

  const { instantPrep } = categorizeByPrepTime(state);

  if (instantPrep.length === 0) {
    return null;
  }

  const totalQuantity = instantPrep.reduce((sum, { item }) => sum + item.quantity, 0);

  return (
    <section className="bg-white rounded-[12px] p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <span className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
            ▶
          </span>
          <h2 className="text-base font-semibold text-gray-600 uppercase tracking-wide">
            Instant Prep
          </h2>
          <span className="text-xs text-gray-400 font-normal">(6-15 min)</span>
        </div>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
          {totalQuantity}
        </span>
      </button>

      {isExpanded && (
        <div className="flex flex-col gap-2 mt-4">
          {instantPrep.map(({ item, section, nutritionTags }) => (
            <FoodItem
              key={item.id}
              item={item}
              section={section}
              nutritionTags={nutritionTags}
            />
          ))}
        </div>
      )}
    </section>
  );
}
