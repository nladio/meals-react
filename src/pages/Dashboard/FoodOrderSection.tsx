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
    <section className="bg-white rounded-[12px] p-5 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      {/* Section Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-t-lg hover:bg-gray-100 transition-all active:scale-[0.98] text-left"
      >
        <div className="flex items-center gap-2">
          <span className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
            ▶
          </span>
          <h2 className="text-base font-semibold text-gray-600 uppercase tracking-wide">
            Order
          </h2>
          <span className="text-xs text-gray-400 font-normal">(~1 hour)</span>
        </div>
        <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full">
          {orders.length}
        </span>
      </button>

      {/* Order Cards grouped by restaurant */}
      {isExpanded && (
        <div className="mt-2">
          {Array.from(ordersByRestaurant.entries()).map(([restaurant, restaurantOrders]) => (
            <div key={restaurant} className="mb-4">
              {/* Restaurant Header */}
              <div className="flex items-center justify-between px-3 py-2 bg-amber-50 rounded-lg mb-2">
                <span className="font-semibold text-amber-800">{restaurant}</span>
                <span className="text-xs text-amber-600">{restaurantOrders.length} order(s)</span>
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
