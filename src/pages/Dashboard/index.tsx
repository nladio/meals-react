import { useAppState, getTotalServings } from '../../hooks/useAppState';
import { PageHeader } from '../../components/PageHeader';
import { ReadyToEatSection } from './ReadyToEatSection';
import { QuickRecipes } from './QuickRecipes';
import { FoodOrderSection } from './FoodOrderSection';

export function Dashboard() {
  const { state } = useAppState();
  const totalServings = getTotalServings(state);

  let statusClass = 'bg-green-50 border border-success';
  if (totalServings <= 2) statusClass = 'bg-red-50 border border-danger';
  else if (totalServings <= 6) statusClass = 'bg-orange-50 border border-warning';

  return (
    <div>
      <PageHeader title="What to Eat" showBackButton={false} />

      {/* Total Summary */}
      <section className="bg-white rounded-[12px] p-5 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
        <div className={`flex justify-between items-center p-4 rounded-sm ${statusClass}`}>
          <span className="font-medium text-gray-600">Total Food Available</span>
          <span className="font-semibold text-base">{totalServings} servings</span>
        </div>
      </section>

      {/* Ready to Eat Items */}
      <ReadyToEatSection />

      {/* Quick Recipes */}
      <QuickRecipes />

      {/* Food Ordering Section */}
      <FoodOrderSection />
    </div>
  );
}
