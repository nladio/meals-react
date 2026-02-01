import { useMemo } from 'react';
import { useAppState } from '../../hooks/useAppState';

interface CalendarGridProps {
  viewMonth: string; // 'YYYY-MM'
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

export function CalendarGrid({ viewMonth, selectedDate, onSelectDate }: CalendarGridProps) {
  const { state } = useAppState();
  const [year, month] = viewMonth.split('-').map(Number);

  // Get dates with purchases in this month
  const purchaseDates = useMemo(() => {
    const dates = new Set<string>();
    for (const entry of state.purchaseHistory) {
      if (entry.date.startsWith(viewMonth)) {
        dates.add(entry.date);
      }
    }
    return dates;
  }, [state.purchaseHistory, viewMonth]);

  // Calculate calendar data
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;

  // Build day cells
  const cells = [];

  // Empty cells for days before first of month
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  // Day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const hasPurchases = purchaseDates.has(dateStr);
    const isToday = isCurrentMonth && today.getDate() === day;
    const isSelected = selectedDate === dateStr;

    let bgClass = 'bg-gray-50 hover:bg-gray-100';
    let textClass = 'text-gray-700';

    if (isToday && !isSelected) {
      bgClass = 'bg-primary/20 hover:bg-primary/30';
      textClass = 'text-primary font-bold';
    }
    if (isSelected) {
      bgClass = 'bg-primary hover:bg-primary-dark';
      textClass = 'text-white font-semibold';
    }

    cells.push(
      <div
        key={day}
        className={`aspect-square flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all active:scale-95 ${bgClass}`}
        onClick={() => onSelectDate(dateStr)}
      >
        <span className={`text-sm ${textClass}`}>{day}</span>
        {hasPurchases && !isSelected && (
          <span className="w-1.5 h-1.5 rounded-full bg-success mt-0.5" />
        )}
        {hasPurchases && isSelected && (
          <span className="w-1.5 h-1.5 rounded-full bg-white mt-0.5" />
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[12px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)] mb-4">
      {/* Day names header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <span key={day} className="text-center text-xs font-semibold text-gray-400 uppercase py-2">
            {day}
          </span>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">{cells}</div>
    </div>
  );
}
