import { useState } from 'react';
import { orders } from '../../data/foodOrders';
import { OrderCard } from './OrderCard';

export function FoodOrderSection() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="bg-white rounded-[12px] p-5 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      {/* Section Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-4"
      >
        <div className="flex items-center gap-2">
          <span className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
            ▶
          </span>
          <h2 className="text-lg font-semibold text-primary">Food Ordering</h2>
        </div>
      </button>

      {/* Order Cards */}
      {isExpanded && (
        <div className="mt-2">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </section>
  );
}
