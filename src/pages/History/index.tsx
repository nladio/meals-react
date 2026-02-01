import { useState, useMemo } from 'react';
import { useAppState } from '../../hooks/useAppState';
import { PageHeader } from '../../components/PageHeader';
import { CalendarGrid } from './CalendarGrid';
import { DayDetail } from './DayDetail';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function History() {
  const { state, dispatch } = useAppState();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Get current view month
  const viewMonth = useMemo(() => {
    if (state.historyViewMonth) {
      return state.historyViewMonth;
    }
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }, [state.historyViewMonth]);

  const [year, month] = viewMonth.split('-').map(Number);
  const monthLabel = `${MONTH_NAMES[month - 1]} ${year}`;

  const navigateMonth = (delta: number) => {
    let newMonth = month + delta;
    let newYear = year;

    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }

    const newViewMonth = `${newYear}-${String(newMonth).padStart(2, '0')}`;
    dispatch({ type: 'SET_HISTORY_MONTH', month: newViewMonth });
    setSelectedDate(null);
  };

  return (
    <div>
      <PageHeader title="Shopping History" />

      <section className="p-4">
        <div className="flex items-center justify-between px-4 py-3 bg-white rounded-[12px] mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
          <button
            onClick={() => navigateMonth(-1)}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-all active:scale-95"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="text-lg font-semibold text-gray-800">{monthLabel}</span>
          <button
            onClick={() => navigateMonth(1)}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-all active:scale-95"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <CalendarGrid
          viewMonth={viewMonth}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {selectedDate && <DayDetail date={selectedDate} />}
      </section>
    </div>
  );
}
