import { useState } from 'react';
import type { Order } from '../../types';
import { getOrderTotal, getDishesSubtotal, getFeesTotal } from '../../data/foodOrders';
import { DishItem } from './DishItem';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const total = getOrderTotal(order);
  const subtotal = getDishesSubtotal(order);
  const feesTotal = getFeesTotal(order);
  const hasFees = order.fees && feesTotal !== 0;

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
          <span className="text-xs text-gray-500">Order</span>
        </div>
        <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full">
          ${total.toFixed(2)}
        </span>
      </button>

      {isExpanded && (
        <div className="flex flex-col gap-2 pt-2 pl-4">
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
