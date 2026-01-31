import { useMemo } from 'react';
import { useAppState } from '../../hooks/useAppState';
import type { PurchaseItem, Section } from '../../types';

interface DayDetailProps {
  date: string;
}

const SECTION_LABELS: Record<Section, string> = {
  fresh: 'Fresh',
  frozen: 'Frozen',
  dry: 'Dry/Pantry',
};

export function DayDetail({ date }: DayDetailProps) {
  const { state } = useAppState();

  const items = useMemo(() => {
    const entry = state.purchaseHistory.find(e => e.date === date);
    return entry?.items || [];
  }, [state.purchaseHistory, date]);

  if (items.length === 0) {
    return null;
  }

  // Group items by section
  const grouped: Record<Section, PurchaseItem[]> = { fresh: [], frozen: [], dry: [] };
  for (const item of items) {
    if (grouped[item.section]) {
      grouped[item.section].push(item);
    }
  }

  // Format date for display
  const dateObj = new Date(date + 'T00:00:00');
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-[12px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <h3 className="text-base font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-200">
        {formattedDate}
      </h3>

      <div className="space-y-4">
        {(['fresh', 'frozen', 'dry'] as Section[]).map(section => {
          const sectionItems = grouped[section];
          if (sectionItems.length === 0) return null;

          return (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                {SECTION_LABELS[section]}
              </h4>
              <div className="space-y-1.5">
                {sectionItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center px-3 py-2.5 bg-gray-100 rounded-sm"
                  >
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                    <span className="text-sm font-semibold text-success bg-green-50 px-2.5 py-1 rounded-xl">
                      x{item.qty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
