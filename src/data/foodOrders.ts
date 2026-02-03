import type { Order } from '../types';

export const orders: Order[] = [
  {
    id: 'order-1',
    restaurant: "PJ's Pizza Co.",
    dishes: [
      {
        name: 'Create Your Family Size Pizza (16")',
        cost: 46.77,
        quantity: 1,
        customizations: ['Regular Sauce', 'Regular Cheese', 'Bell Peppers', 'Jalapeños', 'Mushrooms', 'Red Onions', 'Roasted Garlic', 'Sliced Tomato', 'Spinach', 'Please use Alfredo sauce on a thin crust if possible'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Main',
        },
      },
    ],
    fees: {
      deliveryFee: 0.00,
      serviceFee: 3.74,
      salesTax: 5.06,
      driverTip: 4.00,
      driverBenefitsFee: 2.00,
    },
  },
  {
    id: 'order-2',
    restaurant: 'Clay Oven Cuisine of India',
    dishes: [
      {
        name: 'Chapati',
        cost: 3.00,
        quantity: 2,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Side',
        },
      },
      {
        name: 'Chili Nan',
        cost: 4.95,
        quantity: 2,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Side',
        },
      },
      {
        name: 'Dal',
        cost: 13.95,
        quantity: 1,
        customizations: ['Hot'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
      {
        name: 'Vegetable Samosa',
        cost: 6.95,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Appetizer',
        },
      },
    ],
    fees: {
      discount: 3.00,
      deliveryFee: 1.90,
      serviceFee: 3.38,
      salesTax: 3.71,
      driverTip: 4.00,
    },
  },
  {
    id: 'order-3',
    restaurant: 'Bizza',
    dishes: [
      {
        name: 'GO GREEN',
        cost: 29.00,
        quantity: 1,
        customizations: ['12" (Small) Feeds 2-3'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Main',
        },
      },
    ],
    fees: {
      discount: 8.00,
      deliveryFee: 0.00,
      serviceFee: 1.68,
      salesTax: 3.05,
      driverTip: 3.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-4',
    restaurant: 'Samikcha Momo',
    dishes: [
      {
        name: 'Garlic Naan',
        cost: 5.99,
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
        cost: 14.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
      {
        name: 'Mirchi Naan',
        cost: 5.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Side',
        },
      },
    ],
    fees: {
      discount: 8.00,
      deliveryFee: 0.00,
      serviceFee: 3.84,
      salesTax: 3.64,
      driverTip: 5.00,
      driverBenefitsFee: 2.00,
    },
  },
  {
    id: 'order-5',
    restaurant: 'Waterfront Pizza & Mediterranean Restaurant',
    dishes: [
      {
        name: 'Fettuccini Alfredo',
        cost: 27.00,
        quantity: 1,
        customizations: ['Cream Sauce', 'Add Chicken'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Main',
        },
      },
      {
        name: 'Muhammara',
        cost: 15.00,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Appetizer',
        },
      },
      {
        name: 'Garlic Cheese Bread',
        cost: 9.00,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Side',
        },
      },
      {
        name: 'Garlic Fries',
        cost: 15.00,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'American',
          dishType: 'Side',
        },
      },
    ],
    fees: {
      discount: 5.00,
      deliveryFee: 0.00,
      serviceFee: 4.88,
      salesTax: 6.18,
      driverTip: 5.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-6',
    restaurant: 'Falafel Tazah',
    dishes: [
      {
        name: 'Chicken Kabob Stick',
        cost: 7.95,
        quantity: 4,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Appetizer',
        },
      },
      {
        name: 'Side of Pita',
        cost: 1.25,
        quantity: 6,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Side',
        },
      },
      {
        name: 'Deluxe Falafel Wrap',
        cost: 14.95,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Main',
        },
      },
    ],
    fees: {
      discount: 5.00,
      deliveryFee: 0.00,
      serviceFee: 3.94,
      salesTax: 5.01,
      driverTip: 4.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-7',
    restaurant: 'Falafel Tazah',
    dishes: [
      {
        name: 'Side of Pita',
        cost: 1.25,
        quantity: 3,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Side',
        },
      },
      {
        name: 'Chicken Kabab Rice Plate',
        cost: 23.95,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Main',
        },
      },
      {
        name: 'Falafel 4 pieces & Lemon Tahini',
        cost: 5.95,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Appetizer',
        },
      },
    ],
    fees: {
      discount: 3.00,
      deliveryFee: 0.00,
      serviceFee: 2.45,
      salesTax: 3.16,
      driverTip: 3.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-8',
    restaurant: 'Papa Johns',
    dishes: [
      {
        name: 'Garlic Epic Stuffed Crust Pizza',
        cost: 29.89,
        quantity: 1,
        customizations: ['Large (14")', 'Garlic Epic Stuffed Crust', 'Alfredo Sauce', 'Black Olives', 'Jalapeño Peppers'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Main',
        },
      },
      {
        name: 'Cheesesticks',
        cost: 9.99,
        quantity: 1,
        customizations: ['10 Inch Original Cheesesticks', 'Spicy Garlic Dipping Sauce'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Side',
        },
      },
      {
        name: 'Jalapeño Papa Bites',
        cost: 7.99,
        quantity: 1,
        customizations: ['8 Piece Jalapeno Papa Bites', 'Blue Cheese Dipping Sauce'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Side',
        },
      },
      {
        name: 'Garlic Knots',
        cost: 8.79,
        quantity: 1,
        customizations: ['8 Piece 10 Inch Garlic Knots', 'Cheese Dipping Sauce'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Side',
        },
      },
    ],
    fees: {
      serviceFee: 4.53,
      salesTax: 5.91,
      deliveryFee: 0.00,
      driverTip: 5.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-9',
    restaurant: 'Papa Johns',
    dishes: [
      {
        name: 'Garden Fresh Pizza',
        cost: 28.59,
        quantity: 1,
        customizations: ['Medium (12")', 'Original Garden Fresh Pizza', 'Black Olives', 'Green Peppers', 'Mushrooms', 'Onions', 'Roma Tomatoes'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Main',
        },
      },
      {
        name: 'New York Style Crust',
        cost: 21.69,
        quantity: 1,
        customizations: ['Medium (12")', 'New York Style Create Your Own', 'Alfredo Sauce', 'Black Olives', 'Jalapeño Peppers'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Main',
        },
      },
      {
        name: 'Garlic Sauce Trio',
        cost: 2.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Side',
        },
      },
      {
        name: 'Jalapeño Papa Bites',
        cost: 7.99,
        quantity: 1,
        customizations: ['8 Piece Jalapeno Papa Bites', 'Ranch Dipping Sauce'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Side',
        },
      },
    ],
    fees: {
      serviceFee: 4.90,
      salesTax: 6.39,
      deliveryFee: 0.00,
      driverTip: 4.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-10',
    restaurant: 'Koriander Indian Cuisine',
    dishes: [
      {
        name: 'Paneer Makhani Curry',
        cost: 19.49,
        quantity: 1,
        customizations: ['Paneer Makhani Curry - 1 Pint (16 oz)', 'Indian Spicy (Hot)', 'Add Butter Naan'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
      {
        name: 'Jeera Rice',
        cost: 9.15,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Side',
        },
      },
      {
        name: 'Butter Naan',
        cost: 3.39,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Side',
        },
      },
    ],
    fees: {
      serviceFee: 2.56,
      salesTax: 3.51,
      deliveryFee: 0.00,
      driverTip: 3.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-11',
    restaurant: 'Koriander Indian Cuisine',
    dishes: [
      {
        name: 'Jeera Rice',
        cost: 9.15,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Side',
        },
      },
      {
        name: 'Paneer Tikka Kabab',
        cost: 16.05,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
      {
        name: 'Dal Makhani Curry',
        cost: 18.35,
        quantity: 1,
        customizations: ['Dal Makhani Curry - 1 Pint (16 oz)', 'Indian Spicy (Hot)', 'Add Butter Naan'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
      {
        name: 'Methi Paratha',
        cost: 4.55,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Side',
        },
      },
    ],
    fees: {
      discount: 4.00,
      serviceFee: 3.53,
      salesTax: 4.81,
      deliveryFee: 0.00,
      driverTip: 4.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-12',
    restaurant: 'Samikcha Momo',
    dishes: [
      {
        name: 'Veggie Momo- Tandoori',
        cost: 16.49,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
      {
        name: 'Paneer Chilli Fry Rice Bowl',
        cost: 15.99,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
    ],
    fees: {
      serviceFee: 2.60,
      salesTax: 3.57,
      deliveryFee: 0.00,
      driverTip: 4.00,
      driverBenefitsFee: 2.00,
    },
  },
  {
    id: 'order-13',
    restaurant: 'Falafel Tazah',
    dishes: [
      {
        name: 'Chicken Kabob Stick',
        cost: 7.95,
        quantity: 4,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Appetizer',
        },
      },
      {
        name: 'Side of Pita',
        cost: 1.25,
        quantity: 2,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Side',
        },
      },
    ],
    fees: {
      discount: 3.00,
      serviceFee: 2.50,
      salesTax: 3.22,
      deliveryFee: 0.00,
      driverTip: 3.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-14',
    restaurant: 'Nick The Greek',
    dishes: [
      {
        name: 'Side Chicken Skewer',
        cost: 6.95,
        quantity: 3,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Greek',
          dishType: 'Appetizer',
        },
      },
      {
        name: 'Pita Bread',
        cost: 3.75,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Greek',
          dishType: 'Side',
        },
      },
    ],
    fees: {
      serviceFee: 1.97,
      salesTax: 2.58,
      deliveryFee: 0.00,
      driverTip: 3.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-15',
    restaurant: 'Papa Johns',
    dishes: [
      {
        name: 'Cheese Pizza',
        cost: 21.69,
        quantity: 1,
        customizations: ['Medium (12") New York Style Cheese Pizza', 'Square Cut', 'Alfredo Sauce', 'Black Olives', 'Jalapeño Peppers'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Main',
        },
      },
    ],
    fees: {
      serviceFee: 2.78,
      salesTax: 2.38,
      deliveryFee: 0.00,
      driverTip: 3.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-16',
    restaurant: 'Waterfront Pizza & Mediterranean Restaurant',
    dishes: [
      {
        name: '7 oz. Chicken Kabob Plate',
        cost: 28.00,
        quantity: 1,
        customizations: ['No grilled tomatoes, no side of salad'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Main',
        },
      },
      {
        name: 'Garlic Cheese Bread',
        cost: 9.00,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Side',
        },
      },
      {
        name: 'Hummus',
        cost: 14.00,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Appetizer',
        },
      },
    ],
    fees: {
      discount: 10.00,
      deliveryFee: 0.00,
      serviceFee: 3.28,
      salesTax: 4.18,
      driverTip: 3.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-17',
    restaurant: 'Cheung hing belmont',
    dishes: [
      {
        name: 'F10. Kung Pao Chicken',
        cost: 16.95,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Chinese',
          dishType: 'Main',
        },
      },
    ],
    fees: {
      serviceFee: 1.36,
      salesTax: 1.84,
      deliveryFee: 0.00,
      driverTip: 3.00,
      driverBenefitsFee: 0.42,
    },
  },
  {
    id: 'order-18',
    restaurant: 'Waterfront Pizza & Mediterranean Restaurant',
    dishes: [
      {
        name: '7 oz. Spicy Chicken Tikka Kabob with rice and salad',
        cost: 28.00,
        quantity: 1,
        customizations: ['No grilled tomatoes please.'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Main',
        },
      },
      {
        name: 'Falafel',
        cost: 7.00,
        quantity: 2,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Appetizer',
        },
      },
      {
        name: 'Spinach Fatayer',
        cost: 14.00,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Appetizer',
        },
      },
    ],
    fees: {
      discount: 10.00,
      deliveryFee: 0.00,
      serviceFee: 3.68,
      salesTax: 4.69,
      driverTip: 5.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-19',
    restaurant: 'Falafel Tazah',
    dishes: [
      {
        name: 'Chicken Kabab Rice Plate',
        cost: 23.95,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Main',
        },
      },
      {
        name: '1 Dozen Falafel & Lemon Tahini',
        cost: 14.95,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Appetizer',
        },
      },
    ],
    fees: {
      discount: 6.00,
      serviceFee: 2.63,
      salesTax: 3.57,
      deliveryFee: 0.00,
      driverTip: 3.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-20',
    restaurant: 'Waterfront Pizza & Mediterranean Restaurant',
    dishes: [
      {
        name: 'Falafel',
        cost: 7.00,
        quantity: 2,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Appetizer',
        },
      },
      {
        name: '7 oz. Spicy Chicken Tikka Kabob with rice and salad',
        cost: 28.00,
        quantity: 1,
        customizations: ['No grilled tomatoes please.'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Middle Eastern',
          dishType: 'Main',
        },
      },
      {
        name: 'Garlic Cheese Bread',
        cost: 9.00,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Italian',
          dishType: 'Side',
        },
      },
    ],
    fees: {
      discount: 10.00,
      deliveryFee: 0.00,
      serviceFee: 3.28,
      salesTax: 4.18,
      driverTip: 3.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-21',
    restaurant: 'Panera Bread',
    dishes: [
      {
        name: 'Chipotle Chicken Avo Melt',
        cost: 16.59,
        quantity: 1,
        customizations: ['Whole', 'Chips (150 Cal.)'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'American',
          dishType: 'Main',
        },
      },
    ],
    fees: {
      serviceFee: 1.33,
      salesTax: 1.77,
      deliveryFee: 0.00,
      driverTip: 2.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-22',
    restaurant: 'Chipotle',
    dishes: [
      {
        name: 'Chips & Queso Blanco',
        cost: 6.75,
        quantity: 1,
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Mexican',
          dishType: 'Appetizer',
        },
      },
      {
        name: 'Quesadilla',
        cost: 19.15,
        quantity: 1,
        customizations: ['Sofritas Quesadilla', 'Fresh Tomato Salsa', 'Tomatillo-Green Chili Salsa', 'Black Beans', 'Guacamole'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Mexican',
          dishType: 'Main',
        },
      },
    ],
    fees: {
      serviceFee: 2.07,
      salesTax: 2.79,
      deliveryFee: 0.00,
      driverTip: 3.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-23',
    restaurant: 'Nick The Greek',
    dishes: [
      {
        name: 'Souvlaki Plate',
        cost: 22.45,
        quantity: 1,
        customizations: ['Chicken', 'Greek Fries', 'Add Hummus'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Greek',
          dishType: 'Main',
        },
      },
    ],
    fees: {
      serviceFee: 1.80,
      salesTax: 2.36,
      deliveryFee: 0.00,
      driverTip: 3.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-24',
    restaurant: 'Pressed Retail',
    dishes: [
      {
        name: 'Greens 1.5 | Spinach Kale Juice',
        cost: 7.25,
        quantity: 1,
        tags: {
          mealTime: ['Breakfast', 'Snack'],
          cuisine: 'American',
          dishType: 'Drink',
        },
      },
      {
        name: 'Greens 2 | Apple Lemon Kale Juice',
        cost: 7.25,
        quantity: 1,
        tags: {
          mealTime: ['Breakfast', 'Snack'],
          cuisine: 'American',
          dishType: 'Drink',
        },
      },
      {
        name: 'Hydration + Greens',
        cost: 7.25,
        quantity: 1,
        tags: {
          mealTime: ['Breakfast', 'Snack'],
          cuisine: 'American',
          dishType: 'Drink',
        },
      },
    ],
    fees: {
      serviceFee: 1.74,
      salesTax: 2.42,
      deliveryFee: 0.00,
      driverTip: 3.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-25',
    restaurant: 'Nick The Greek',
    dishes: [
      {
        name: 'Souvlaki Plate',
        cost: 20.95,
        quantity: 1,
        customizations: ['Chicken', 'Greek Fries'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Greek',
          dishType: 'Main',
        },
      },
      {
        name: 'Side Gyro or Falafel',
        cost: 6.95,
        quantity: 1,
        customizations: ['Falafel'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Greek',
          dishType: 'Appetizer',
        },
      },
    ],
    fees: {
      discount: 3.00,
      serviceFee: 1.99,
      salesTax: 2.61,
      deliveryFee: 0.00,
      driverTip: 3.00,
      driverBenefitsFee: 1.00,
    },
  },
  {
    id: 'order-26',
    restaurant: 'Urban Momo',
    dishes: [
      {
        name: 'Choila',
        cost: 14.50,
        quantity: 1,
        customizations: ['Chicken (Gluten-Free)'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
      {
        name: 'Paneer Momos (6 pcs) Steamed',
        cost: 13.50,
        quantity: 1,
        customizations: ['Please provide the spicy achaar.'],
        tags: {
          mealTime: ['Lunch', 'Dinner'],
          cuisine: 'Indian',
          dishType: 'Main',
        },
      },
    ],
    fees: {
      discount: 6.00,
      serviceFee: 1.76,
      salesTax: 2.45,
      deliveryFee: 0.00,
      driverTip: 3.00,
      driverBenefitsFee: 2.00,
    },
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
