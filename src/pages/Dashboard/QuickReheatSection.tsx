import { useState } from 'react';
import { useAppState } from '../../hooks/useAppState';
import { categorizeByPrepTime } from '../../utils/prepTimeCategories';
import { MealCard } from '../../components/dashboard/MealCard';

export function QuickReheatSection() {
  const { state } = useAppState();
  const [isExpanded, setIsExpanded] = useState(true);

  const { quickReheat } = categorizeByPrepTime(state);

  if (quickReheat.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-[12px] p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-t-lg hover:bg-gray-100 transition-all active:scale-[0.98] text-left"
      >
        <div className="flex items-center gap-2">
          <span className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
            ▶
          </span>
          <h2 className="text-base font-semibold text-gray-600 uppercase tracking-wide">
            Quick Reheat
          </h2>
          <span className="text-xs text-gray-400 font-normal">(0-5 min)</span>
        </div>
        <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full">
          {quickReheat.length}
        </span>
      </button>

      {isExpanded && (
        <div className="flex flex-col gap-2 mt-4">
          {quickReheat.map(({ item, nutritionTags, prepTimeMinutes }) => (
            <MealCard
              key={item.id}
              name={item.name}
              prepTimeMinutes={prepTimeMinutes}
              nutritionTags={nutritionTags}
            />
          ))}
        </div>
      )}
    </section>
  );
}
