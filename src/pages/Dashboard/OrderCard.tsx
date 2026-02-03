import { useState } from 'react';
import type { Order } from '../../types';
import { getOrderTotal, getDishesSubtotal, getFeesTotal } from '../../data/foodOrders';
import { DishItem } from './DishItem';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const total = getOrderTotal(order);
  const subtotal = getDishesSubtotal(order);
  const feesTotal = getFeesTotal(order);
  const hasFees = order.fees && feesTotal !== 0;

  // Create short preview of dishes
  const dishNames = order.dishes.map(d => d.name);
  const previewCount = 2;
  const preview = dishNames.slice(0, previewCount).join(', ');
  const remaining = dishNames.length - previewCount;

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all active:scale-[0.99] text-left"
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span
            className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            ▶
          </span>
          <span className="text-xs text-gray-600 truncate">
            {preview}{remaining > 0 && <span className="text-gray-400">, +{remaining}</span>}
          </span>
        </div>
        <span className="text-xs font-medium text-gray-600 bg-white px-2.5 py-1 rounded-full flex-shrink-0 ml-2 shadow-sm">
          ${total.toFixed(2)}
        </span>
      </button>

      {isExpanded && (
        <div className="flex flex-col gap-2 pt-2 pl-4 animate-slide-down">
          {order.dishes.map((dish, index) => (
            <DishItem key={`${dish.name}-${dish.cost}-${index}`} dish={dish} />
          ))}
          {hasFees && (
            <div className="flex flex-col gap-1 pt-2 mt-1 border-t border-gray-200 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Fees & discounts</span>
                <span>{feesTotal >= 0 ? '+' : ''}${feesTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-gray-700">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
