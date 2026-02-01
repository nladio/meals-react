import type { Recipe } from '../types';

export const defaultRecipes: Recipe[] = [
  {
    id: 'rice-dal',
    name: 'Rice & Dal Combo',
    ingredients: [
      { name: 'Rice', required: true },
      { name: 'Dal Makhani', required: true },
      { name: 'Chapatis', required: false },
    ],
  },
  {
    id: 'paneer-curry-rice',
    name: 'Paneer Curry with Rice',
    ingredients: [
      { name: 'Paneer Curry', required: true },
      { name: 'Rice', required: true },
      { name: 'Chapatis', required: false },
    ],
  },
  {
    id: 'palak-paneer-meal',
    name: 'Palak Paneer Meal',
    ingredients: [
      { name: 'Palak Paneer', required: true },
      { name: 'Rice', required: true },
      { name: 'Chapatis', required: false },
    ],
  },
  {
    id: 'quick-tjs-palak',
    name: 'Quick TJs Palak Paneer',
    ingredients: [
      { name: 'TJs Palak Paneer', required: true },
      { name: 'Rice', required: false },
    ],
  },
  {
    id: 'biryani-samosas',
    name: 'Biryani with Samosas',
    ingredients: [
      { name: 'Biryani', required: true },
      { name: 'Frozen Samosas', required: false },
    ],
  },
  {
    id: 'chole-parathas',
    name: 'Chole with Parathas',
    ingredients: [
      { name: 'Chole', required: true },
      { name: 'Frozen Parathas', required: true },
    ],
  },
  {
    id: 'aloo-gobi-wrap',
    name: 'Aloo Gobi Wrap',
    ingredients: [
      { name: 'Aloo Gobi', required: true },
      { name: 'Tortillas', required: true },
    ],
  },
  {
    id: 'quick-bean-burrito',
    name: 'Quick Bean Burrito',
    ingredients: [
      { name: 'Beans', required: true },
      { name: 'Tortillas', required: true },
      { name: 'Rice', required: false },
    ],
  },
  {
    id: 'noodle-soup-combo',
    name: 'Noodle Soup Combo',
    ingredients: [
      { name: 'Instant Noodles', required: true },
      { name: 'Canned Soup', required: false },
    ],
  },
  {
    id: 'samosa-snack-plate',
    name: 'Samosa Snack Plate',
    ingredients: [
      { name: 'Frozen Samosas', required: true },
      { name: 'Chole', required: false },
    ],
  },
];
