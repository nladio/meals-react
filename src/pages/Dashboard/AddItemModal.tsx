import { useState, useMemo } from 'react';
import type { Section, KnownItem, IngredientCategory } from '../../types';
import { useAppState, getMergedKnownItems } from '../../hooks/useAppState';
import { Modal } from '../../components/ui/Modal';
import { QuantityControl } from '../../components/ui/QuantityControl';
import { Button } from '../../components/ui/Button';

interface AddItemModalProps {
  section: Section;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, qty: number, expiryDate?: string) => void;
}

type UsageCategory = 'Ready to eat' | 'Ingredients' | 'Both';

function getUsageCategory(item: KnownItem): UsageCategory {
  const hasMeal = item.usages.includes('meal');
  const hasIngredient = item.usages.includes('ingredient');

  if (hasMeal && hasIngredient) return 'Both';
  if (hasIngredient) return 'Ingredients';
  return 'Ready to eat';
}

const sectionLabels: Record<Section, string> = {
  fresh: 'Fresh',
  frozen: 'Frozen',
  dry: 'Dry',
};

const ingredientCategoryLabels: Record<IngredientCategory, string> = {
  produce: 'Produce',
  dairy: 'Dairy & Eggs',
  protein: 'Protein',
  condiments: 'Dips & Sauces',
  grains: 'Grains',
  legumes: 'Legumes',
};

const ingredientCategoryOrder: IngredientCategory[] = [
  'produce',
  'dairy',
  'protein',
  'condiments',
  'grains',
  'legumes',
];

export function AddItemModal({ section, isOpen, onClose, onAdd }: AddItemModalProps) {
  const { state } = useAppState();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [expiryDate, setExpiryDate] = useState('');

  // Get available items filtered by section, excluding those already in inventory
  const { groupedItems, ingredientsByCategory } = useMemo(() => {
    const mergedKnownItems = getMergedKnownItems(state);
    const inventoryNames = new Set(state.inventory[section].map(i => i.name));

    const availableItems = mergedKnownItems[section].filter(
      item => !inventoryNames.has(item.name)
    );

    // Group by usage category
    const groups: Record<UsageCategory, KnownItem[]> = {
      'Ready to eat': [],
      'Ingredients': [],
      'Both': [],
    };

    // Group ingredients by subcategory
    const ingredientSubgroups: Record<IngredientCategory, KnownItem[]> = {
      produce: [],
      dairy: [],
      protein: [],
      condiments: [],
      grains: [],
      legumes: [],
    };

    for (const item of availableItems) {
      const category = getUsageCategory(item);
      groups[category].push(item);

      // If it's an ingredient (including "Both"), also group by ingredient category
      if (category === 'Ingredients' && item.ingredientCategory) {
        ingredientSubgroups[item.ingredientCategory].push(item);
      }
    }

    // Sort each group alphabetically
    for (const category of Object.keys(groups) as UsageCategory[]) {
      groups[category].sort((a, b) => a.name.localeCompare(b.name));
    }

    // Sort each ingredient subcategory alphabetically
    for (const category of Object.keys(ingredientSubgroups) as IngredientCategory[]) {
      ingredientSubgroups[category].sort((a, b) => a.name.localeCompare(b.name));
    }

    return { groupedItems: groups, ingredientsByCategory: ingredientSubgroups };
  }, [state, section]);

  const handleClose = () => {
    setSelectedItem(null);
    setQuantity(1);
    setExpiryDate('');
    onClose();
  };

  const handleAdd = () => {
    if (selectedItem) {
      onAdd(selectedItem, quantity, expiryDate || undefined);
      handleClose();
    }
  };

  const categoryOrder: UsageCategory[] = ['Ready to eat', 'Ingredients', 'Both'];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Add to ${sectionLabels[section]} Food`}>
      <div className="p-4">
        {/* Item list grouped by category */}
        <div className="space-y-4 mb-4">
          {categoryOrder.map(category => {
            const items = groupedItems[category];
            if (items.length === 0) return null;

            // For Ingredients, render nested subcategories
            if (category === 'Ingredients') {
              return (
                <div key={category}>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    {category}
                  </h3>
                  <div className="space-y-3 pl-2">
                    {ingredientCategoryOrder.map(subCategory => {
                      const subItems = ingredientsByCategory[subCategory];
                      if (subItems.length === 0) return null;

                      return (
                        <div key={subCategory}>
                          <h4 className="text-xs font-medium text-gray-400 mb-1.5">
                            {ingredientCategoryLabels[subCategory]}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {subItems.map(item => (
                              <button
                                key={item.name}
                                onClick={() => setSelectedItem(item.name)}
                                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                                  selectedItem === item.name
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {item.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            // For Ready to eat and Both, render flat chip list
            return (
              <div key={category}>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <button
                      key={item.name}
                      onClick={() => setSelectedItem(item.name)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                        selectedItem === item.name
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {categoryOrder.every(cat => groupedItems[cat].length === 0) && (
            <p className="text-gray-500 text-sm text-center py-4">
              All items are already in your inventory.
            </p>
          )}
        </div>

        {/* Quantity and expiry controls - shown when item selected */}
        {selectedItem && (
          <div className="border-t border-gray-200 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Quantity</span>
              <QuantityControl value={quantity} onChange={setQuantity} size="sm" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Expiry date</span>
              <input
                type="date"
                value={expiryDate}
                onChange={e => setExpiryDate(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-sm text-sm bg-white focus:outline-none focus:border-primary"
              />
            </div>

            <Button variant="primary" className="w-full" onClick={handleAdd}>
              Add {selectedItem}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
