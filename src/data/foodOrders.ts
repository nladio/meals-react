import type { Order } from '../types';

export const orders: Order[] = [
  {
    id: 'order-1',
    restaurant: "PJ's Pizza Co.",
    dishes: [
      {
        name: 'Create Your Family Size Pizza (16")',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Main',
        },
      },
    ],
  },
  {
    id: 'order-2',
    restaurant: 'Clay Oven Cuisine of India',
    dishes: [
      {
        name: 'Chapati',
        cost: 3.99,
        quantity: 2,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Side',
        },
      },
      {
        name: 'Chili Nan',
        cost: 3.99,
        quantity: 2,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Side',
        },
      },
      {
        name: 'Dal',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
      {
        name: 'Vegetable Samosa',
        cost: 5.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Appetizer',
        },
      },
    ],
  },
  {
    id: 'order-3',
    restaurant: 'Bizza',
    dishes: [
      {
        name: 'GO GREEN',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Main',
        },
      },
    ],
  },
  {
    id: 'order-4',
    restaurant: 'Samikcha Momo',
    dishes: [
      {
        name: 'Garlic Naan',
        cost: 3.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Side',
        },
      },
      {
        name: 'Tadka Daal',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
      {
        name: 'Matar Paneer',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
      {
        name: 'Mirchi Naan',
        cost: 3.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Side',
        },
      },
    ],
  },
  {
    id: 'order-5',
    restaurant: 'Waterfront Pizza & Mediterranean Restaurant',
    dishes: [
      {
        name: 'Fettuccini Alfredo',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Main',
        },
      },
      {
        name: 'Muhammara',
        cost: 5.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Appetizer',
        },
      },
      {
        name: 'Garlic Cheese Bread',
        cost: 3.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Side',
        },
      },
      {
        name: 'Garlic Fries',
        cost: 3.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'American',
          dishType: 'Side',
        },
      },
    ],
  },
  {
    id: 'order-6',
    restaurant: 'Falafel Tazah',
    dishes: [
      {
        name: 'Chicken Kabob Stick',
        cost: 5.99,
        quantity: 4,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Appetizer',
        },
      },
      {
        name: 'Side of Pita',
        cost: 3.99,
        quantity: 6,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Side',
        },
      },
      {
        name: 'Deluxe Falafel Wrap',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Main',
        },
      },
    ],
  },
  {
    id: 'order-7',
    restaurant: 'Falafel Tazah',
    dishes: [
      {
        name: 'Side of Pita',
        cost: 3.99,
        quantity: 3,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Side',
        },
      },
      {
        name: 'Chicken Kabab Rice Plate',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Main',
        },
      },
      {
        name: 'Falafel 4 pieces & Lemon Tahini',
        cost: 5.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Appetizer',
        },
      },
    ],
  },
  {
    id: 'order-8',
    restaurant: 'Papa Johns',
    dishes: [
      {
        name: 'Garlic Epic Stuffed Crust Pizza',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Main',
        },
      },
      {
        name: 'Cheesesticks',
        cost: 3.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Side',
        },
      },
      {
        name: 'Jalapeño Papa Bites',
        cost: 3.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Side',
        },
      },
      {
        name: 'Garlic Knots',
        cost: 3.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Side',
        },
      },
    ],
  },
  {
    id: 'order-9',
    restaurant: 'Papa Johns',
    dishes: [
      {
        name: 'Garden Fresh Pizza',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Main',
        },
      },
      {
        name: 'New York Style Crust',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Main',
        },
      },
      {
        name: 'Garlic Sauce Trio',
        cost: 3.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Side',
        },
      },
      {
        name: 'Jalapeño Papa Bites',
        cost: 3.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Side',
        },
      },
    ],
  },
  {
    id: 'order-10',
    restaurant: 'Koriander Indian Cuisine',
    dishes: [
      {
        name: 'Paneer Makhani Curry',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
      {
        name: 'Jeera Rice',
        cost: 3.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Side',
        },
      },
      {
        name: 'Butter Naan',
        cost: 3.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Side',
        },
      },
    ],
  },
  {
    id: 'order-11',
    restaurant: 'Koriander Indian Cuisine',
    dishes: [
      {
        name: 'Jeera Rice',
        cost: 3.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Side',
        },
      },
      {
        name: 'Paneer Tikka Kabab',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
      {
        name: 'Dal Makhani Curry',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
      {
        name: 'Methi Paratha',
        cost: 3.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Side',
        },
      },
    ],
  },
  {
    id: 'order-12',
    restaurant: 'Samikcha Momo',
    dishes: [
      {
        name: 'Veggie Momo- Tandoori',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
      {
        name: 'Paneer Chilli Fry Rice Bowl',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
    ],
  },
  {
    id: 'order-13',
    restaurant: 'Falafel Tazah',
    dishes: [
      {
        name: 'Chicken Kabob Stick',
        cost: 5.99,
        quantity: 4,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Appetizer',
        },
      },
      {
        name: 'Side of Pita',
        cost: 3.99,
        quantity: 2,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Side',
        },
      },
    ],
  },
  {
    id: 'order-14',
    restaurant: 'Nick The Greek',
    dishes: [
      {
        name: 'Side Chicken Skewer',
        cost: 5.99,
        quantity: 3,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Greek',
          dishType: 'Appetizer',
        },
      },
      {
        name: 'Pita Bread',
        cost: 3.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Greek',
          dishType: 'Side',
        },
      },
    ],
  },
  {
    id: 'order-15',
    restaurant: 'Papa Johns',
    dishes: [
      {
        name: 'Cheese Pizza',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Main',
        },
      },
    ],
  },
  {
    id: 'order-16',
    restaurant: 'Waterfront Pizza & Mediterranean Restaurant',
    dishes: [
      {
        name: '7 oz. Chicken Kabob Plate',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Main',
        },
      },
      {
        name: 'Garlic Cheese Bread',
        cost: 3.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Side',
        },
      },
      {
        name: 'Hummus',
        cost: 5.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Appetizer',
        },
      },
    ],
  },
  {
    id: 'order-17',
    restaurant: 'Cheung hing belmont',
    dishes: [
      {
        name: 'F10. Kung Pao Chicken',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Chinese',
          dishType: 'Main',
        },
      },
    ],
  },
  {
    id: 'order-18',
    restaurant: 'Waterfront Pizza & Mediterranean Restaurant',
    dishes: [
      {
        name: '7 oz. Spicy Chicken Tikka Kabob with rice and salad',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Main',
        },
      },
      {
        name: 'Falafel',
        cost: 5.99,
        quantity: 2,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Appetizer',
        },
      },
      {
        name: 'Spinach Fatayer',
        cost: 5.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Appetizer',
        },
      },
    ],
  },
  {
    id: 'order-19',
    restaurant: 'Falafel Tazah',
    dishes: [
      {
        name: 'Chicken Kabab Rice Plate',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Main',
        },
      },
      {
        name: '1 Dozen Falafel & Lemon Tahini',
        cost: 5.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Appetizer',
        },
      },
    ],
  },
  {
    id: 'order-20',
    restaurant: 'Waterfront Pizza & Mediterranean Restaurant',
    dishes: [
      {
        name: 'Falafel',
        cost: 5.99,
        quantity: 2,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Appetizer',
        },
      },
      {
        name: '7 oz. Spicy Chicken Tikka Kabob with rice and salad',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Main',
        },
      },
      {
        name: 'Garlic Cheese Bread',
        cost: 3.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Side',
        },
      },
    ],
  },
  {
    id: 'order-21',
    restaurant: 'Panera Bread',
    dishes: [
      {
        name: 'Chipotle Chicken Avo Melt',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'American',
          dishType: 'Main',
        },
      },
    ],
  },
  {
    id: 'order-22',
    restaurant: 'Chipotle',
    dishes: [
      {
        name: 'Chips & Queso Blanco',
        cost: 5.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Mexican',
          dishType: 'Appetizer',
        },
      },
      {
        name: 'Quesadilla',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Mexican',
          dishType: 'Main',
        },
      },
    ],
  },
  {
    id: 'order-23',
    restaurant: 'Nick The Greek',
    dishes: [
      {
        name: 'Souvlaki Plate',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Greek',
          dishType: 'Main',
        },
      },
    ],
  },
  {
    id: 'order-24',
    restaurant: 'Pressed Retail',
    dishes: [
      {
        name: 'Greens 1.5 | Spinach Kale Juice',
        cost: 7.99,
        quantity: 1,
        tags: {
          mealTime: ['Breakfast', 'Snack'],
          cuisine: 'American',
          dishType: 'Drink',
        },
      },
      {
        name: 'Greens 2 | Apple Lemon Kale Juice',
        cost: 7.99,
        quantity: 1,
        tags: {
          mealTime: ['Breakfast', 'Snack'],
          cuisine: 'American',
          dishType: 'Drink',
        },
      },
      {
        name: 'Hydration + Greens',
        cost: 7.99,
        quantity: 1,
        tags: {
          mealTime: ['Breakfast', 'Snack'],
          cuisine: 'American',
          dishType: 'Drink',
        },
      },
    ],
  },
  {
    id: 'order-25',
    restaurant: 'Nick The Greek',
    dishes: [
      {
        name: 'Souvlaki Plate',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Greek',
          dishType: 'Main',
        },
      },
      {
        name: 'Side Gyro or Falafel',
        cost: 5.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Greek',
          dishType: 'Appetizer',
        },
      },
    ],
  },
  {
    id: 'order-26',
    restaurant: 'Urban Momo',
    dishes: [
      {
        name: 'Choila',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
      {
        name: 'Paneer Momos (6 pcs) Steamed',
        cost: 12.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
    ],
  },
];

/**
 * Calculate the subtotal of all dishes in an order (cost × quantity)
 */
export function getDishesSubtotal(order: Order): number {
  return order.dishes.reduce((sum, dish) => sum + dish.cost * dish.quantity, 0);
}

/**
 * Calculate the total fees for an order
 */
export function getFeesTotal(order: Order): number {
  if (!order.fees) return 0;
  const { deliveryFee = 0, serviceFee = 0, salesTax = 0, driverTip = 0, driverBenefitsFee = 0, discount = 0 } = order.fees;
  return deliveryFee + serviceFee + salesTax + driverTip + driverBenefitsFee - discount;
}

/**
 * Calculate the total cost of an order (dishes + fees)
 */
export function getOrderTotal(order: Order): number {
  return getDishesSubtotal(order) + getFeesTotal(order);
}
