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
    <section className="bg-white rounded-[12px] p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-shadow">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg hover:from-gray-100 hover:to-gray-50 transition-all active:scale-[0.99] text-left"
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-primary/60 transition-transform duration-300 ${
              isExpanded ? 'rotate-90' : ''
            }`}
            style={{ transitionTimingFunction: 'var(--ease-bounce)' }}
          >
            ▶
          </span>
          <h2 className="text-base font-semibold text-gray-700 uppercase tracking-wide">
            Quick Reheat
          </h2>
          <span className="text-xs text-gray-400 font-normal">(0-5 min)</span>
        </div>
        <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          {quickReheat.length}
        </span>
      </button>

      {isExpanded && (
        <div className="flex flex-col gap-2 mt-4 animate-slide-down">
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
