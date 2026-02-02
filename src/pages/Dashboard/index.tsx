import { PageHeader } from '../../components/PageHeader';
import { QuickReheatSection } from './QuickReheatSection';
import { InstantPrepSection } from './InstantPrepSection';
import { QuickRecipes } from './QuickRecipes';
import { FoodOrderSection } from './FoodOrderSection';

export function Dashboard() {
  return (
    <div>
      <PageHeader title="What You Could Eat" showBackButton={false} />

      {/* Quick Reheat (0-5 min) */}
      <QuickReheatSection />

      {/* Instant Prep (6-15 min) */}
      <InstantPrepSection />

      {/* Cook (16+ min) */}
      <QuickRecipes />

      {/* Order (~1 hour) */}
      <FoodOrderSection />
    </div>
  );
}
