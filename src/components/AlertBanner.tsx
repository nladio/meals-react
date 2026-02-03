import { useAppState, getSectionTotal, getTotalServings } from '../hooks/useAppState';

export function AlertBanner() {
  const { state } = useAppState();

  const freshTotal = getSectionTotal(state, 'fresh');
  const totalServings = getTotalServings(state);

  let showAlert = false;
  let alertLevel: 'warning' | 'danger' = 'warning';
  let message = '';

  // Critical: Very low on everything
  if (totalServings <= 4 && totalServings > 0) {
    showAlert = true;
    alertLevel = 'danger';
    message = `Food running low! Only ${totalServings} servings left.`;
  }
  // Fresh food running out
  else if (freshTotal > 0 && freshTotal <= 2) {
    showAlert = true;
    alertLevel = 'warning';
    message = `Fresh food getting low. ${freshTotal} servings left.`;
  }
  // No fresh food but have backups
  else if (freshTotal === 0 && totalServings > 0) {
    showAlert = true;
    alertLevel = 'warning';
    message = `No fresh food. ${totalServings} backup servings available.`;
  }

  if (!showAlert) {
    return null;
  }

  const bgClass =
    alertLevel === 'danger'
      ? 'bg-danger'
      : 'bg-warning';

  return (
    <div
      className={`sticky top-0 z-50 ${bgClass} text-white p-4 rounded-[12px] mb-4 shadow-lg`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">⚠️</span>
        <span className="font-medium text-[15px]">{message}</span>
      </div>
    </div>
  );
}
