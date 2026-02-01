import type { Order } from '../types';

export const orders: Order[] = [
  {
    id: 'order-1',
    restaurant: 'Waterfront Pizza',
    dishes: [
      {
        name: 'Chicken Tikka Kebab Plate',
        cost: 12.99,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Main',
        },
      },
    ],
  },
  {
    id: 'order-2',
    restaurant: 'Falafel Tazah',
    dishes: [
      {
        name: 'Chicken Tikka Kebab Plate',
        cost: 10.99,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Main',
        },
      },
      {
        name: 'Chicken Tikka Kebab Skewers',
        cost: 10.99,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Main',
        },
      },
    ],
  },
  {
    id: 'order-3',
    restaurant: 'Chipotle',
    dishes: [
      {
        name: 'Chicken Burrito Bowl',
        cost: 11.75,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Mexican',
          dishType: 'Main',
        },
        macros: {
          calories: 520,
          protein: 32,
          carbs: 45,
          fat: 18,
        },
      },
    ],
  },
  {
    id: 'order-4',
    restaurant: "Nick's Greek",
    dishes: [
      {
        name: 'Chicken Skewers',
        cost: 11.50,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Greek',
          dishType: 'Main',
        },
        macros: {
          calories: 490,
          protein: 25,
          carbs: 51,
          fat: 23,
        },
      },
    ],
  },
];

/**
 * Calculate the total cost of all dishes in an order
 */
export function getOrderTotal(order: Order): number {
  return order.dishes.reduce((sum, dish) => sum + dish.cost, 0);
}
