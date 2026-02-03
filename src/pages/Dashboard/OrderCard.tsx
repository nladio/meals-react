import { useState, useMemo } from 'react';
import type { Order, Dish } from '../../types';
import { getOrderTotal } from '../../data/foodOrders';
import { DishItem } from './DishItem';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const total = getOrderTotal(order);

  const aggregatedDishes = useMemo(() => {
    const map = new Map<string, { dish: Dish; count: number }>();
    order.dishes.forEach((dish) => {
      const key = `${dish.name}-${dish.cost}`;
      const existing = map.get(key);
      if (existing) {
        existing.count++;
      } else {
        map.set(key, { dish, count: 1 });
      }
    });
    return Array.from(map.values());
  }, [order.dishes]);

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-t-lg hover:bg-gray-100 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <span className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
            ▶
          </span>
          <span className="font-medium text-sm text-gray-700">{order.restaurant}</span>
        </div>
        <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full">
          ${total.toFixed(2)}
        </span>
      </button>

      {isExpanded && (
        <div className="flex flex-col gap-2 pt-2 pl-4">
          {aggregatedDishes.map(({ dish, count }) => (
            <DishItem key={`${dish.name}-${dish.cost}`} dish={dish} count={count} />
          ))}
        </div>
      )}
    </div>
  );
}
