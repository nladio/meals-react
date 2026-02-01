import { useState } from 'react';
import type { Order } from '../../types';
import { getOrderTotal } from '../../data/foodOrders';
import { DishItem } from './DishItem';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const total = getOrderTotal(order);

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
          {order.dishes.map((dish) => (
            <DishItem key={dish.name} dish={dish} />
          ))}
        </div>
      )}
    </div>
  );
}
