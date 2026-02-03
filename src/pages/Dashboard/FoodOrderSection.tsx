import { useState, useMemo } from 'react';
import { orders } from '../../data/foodOrders';
import type { Order } from '../../types';
import { OrderCard } from './OrderCard';

export function FoodOrderSection() {
  const [isExpanded, setIsExpanded] = useState(true);

  // Group orders by restaurant, sorted by order count (descending)
  const ordersByRestaurant = useMemo(() => {
    const map = new Map<string, Order[]>();
    orders.forEach((order) => {
      const existing = map.get(order.restaurant);
      if (existing) {
        existing.push(order);
      } else {
        map.set(order.restaurant, [order]);
      }
    });
    // Sort by order count descending
    const sorted = Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length);
    return new Map(sorted);
  }, []);

  return (
    <section className="bg-white rounded-[12px] p-5 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-shadow">
      {/* Section Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg hover:from-gray-100 hover:to-gray-50 transition-all active:scale-[0.99] text-left"
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-primary/60 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            ▶
          </span>
          <h2 className="text-base font-semibold text-gray-700 uppercase tracking-wide">
            Order
          </h2>
          <span className="text-xs text-gray-400 font-normal">(~1 hour)</span>
        </div>
        <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          {orders.length}
        </span>
      </button>

      {/* Order Cards grouped by restaurant */}
      {isExpanded && (
        <div className="mt-2 animate-slide-down">
          {Array.from(ordersByRestaurant.entries()).map(([restaurant, restaurantOrders]) => (
            <div key={restaurant} className="mb-4">
              {/* Restaurant Header */}
              <div className="flex items-center justify-between px-3 py-2.5 bg-gradient-to-r from-warning/10 to-warning/5 rounded-lg mb-2">
                <span className="font-semibold text-warning">{restaurant}</span>
                <span className="text-xs font-medium text-warning">{restaurantOrders.length} order(s)</span>
              </div>
              {/* Order Cards */}
              {restaurantOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
