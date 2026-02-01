import { useAppState, getMergedKnownItems } from '../../hooks/useAppState';
import type { Section, ShoppingListItem, PurchaseItem, Store, Priority, KnownItem } from '../../types';
import { ShoppingItem } from './ShoppingItem';
import { Button } from '../../components/ui/Button';

type Urgency = 'restock' | 'low' | 'variety';

interface StoreShoppingItem extends ShoppingListItem {
  urgency: Urgency;
  priority: Priority;
}

const STORE_LABELS: Record<Store, string> = {
  'indian-store': 'Indian Store',
  'costco': 'Costco',
  'grocery': 'Grocery',
};

const STORE_ORDER: Store[] = ['indian-store', 'costco', 'grocery'];

const PRIORITY_ORDER: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

const URGENCY_ORDER: Record<Urgency, number> = {
  restock: 0,
  low: 1,
  variety: 2,
};

export function Shopping() {
  const { state, dispatch } = useAppState();

  // Get all shopping items with their store and priority info
  const storeGroups = getStoreGroupedItems();

  function getStoreGroupedItems(): Record<Store, StoreShoppingItem[]> {
    const allItems: ShoppingListItem[] = [];
    const itemKnownMap = new Map<string, KnownItem>();

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const mergedKnownItems = getMergedKnownItems(state);

    // Collect all items that need to be on the shopping list
    for (const section of ['fresh', 'frozen', 'dry'] as Section[]) {
      // Check inventory items
      for (const item of state.inventory[section]) {
        const knownItem = mergedKnownItems[section].find(k => k.name === item.name);
        if (knownItem) {
          itemKnownMap.set(item.name, knownItem);
        }

        if (item.quantity === 0) {
          allItems.push({
            name: item.name,
            section,
            currentQty: 0,
            suggestedQty: knownItem?.typicalQty || 1,
            lastBought: knownItem?.lastBought || null,
          });
        } else if (item.quantity <= 2) {
          allItems.push({
            name: item.name,
            section,
            currentQty: item.quantity,
            suggestedQty: Math.max(1, (knownItem?.typicalQty || 1) - item.quantity),
            lastBought: knownItem?.lastBought || null,
          });
        }
      }

      // Check known items not in inventory
      const inventoryNames = state.inventory[section].map(i => i.name);
      for (const knownItem of mergedKnownItems[section]) {
        itemKnownMap.set(knownItem.name, knownItem);

        if (!inventoryNames.includes(knownItem.name)) {
          if (knownItem.lastBought) {
            allItems.push({
              name: knownItem.name,
              section,
              currentQty: 0,
              suggestedQty: knownItem.typicalQty || 1,
              lastBought: knownItem.lastBought,
            });
          } else {
            // Check if should show as variety (never bought or not bought recently)
            const lastBought = knownItem.lastBought ? new Date(knownItem.lastBought) : null;
            if (!lastBought || lastBought < sevenDaysAgo) {
              allItems.push({
                name: knownItem.name,
                section,
                currentQty: 0,
                suggestedQty: knownItem.typicalQty || 1,
                lastBought: null,
              });
            }
          }
        }
      }
    }

    // Dedupe by name (keep first occurrence)
    const seenNames = new Set<string>();
    const uniqueItems = allItems.filter(item => {
      if (seenNames.has(item.name)) return false;
      seenNames.add(item.name);
      return true;
    });

    // Determine urgency for each item
    const itemsWithUrgency = uniqueItems.map(item => {
      let urgency: Urgency;
      if (item.currentQty === 0 && item.lastBought !== null) {
        urgency = 'restock';
      } else if (item.currentQty > 0 && item.currentQty <= 2) {
        urgency = 'low';
      } else {
        urgency = 'variety';
      }
      return { ...item, urgency };
    });

    // Limit variety items to 5
    const restockAndLow = itemsWithUrgency.filter(i => i.urgency !== 'variety');
    const variety = itemsWithUrgency
      .filter(i => i.urgency === 'variety')
      .sort((a, b) => {
        if (!a.lastBought && !b.lastBought) return 0;
        if (!a.lastBought) return 1;
        if (!b.lastBought) return -1;
        return new Date(a.lastBought).getTime() - new Date(b.lastBought).getTime();
      })
      .slice(0, 5);

    const finalItems = [...restockAndLow, ...variety];

    // Group by store
    const groups: Record<Store, StoreShoppingItem[]> = {
      'indian-store': [],
      'costco': [],
      'grocery': [],
    };

    for (const item of finalItems) {
      const knownItem = itemKnownMap.get(item.name);
      const stores = knownItem?.stores || ['grocery'];
      const priority = knownItem?.priority || 'medium';

      const storeItem: StoreShoppingItem = {
        ...item,
        priority,
        urgency: item.urgency,
      };

      // Add to each store where available
      for (const store of stores) {
        groups[store].push({ ...storeItem });
      }
    }

    // Sort each store group by priority then urgency
    for (const store of STORE_ORDER) {
      groups[store].sort((a, b) => {
        const priorityDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return URGENCY_ORDER[a.urgency] - URGENCY_ORDER[b.urgency];
      });
    }

    return groups;
  }

  const handleAddToInventory = () => {
    const checkedItems: PurchaseItem[] = [];
    const processedNames = new Set<string>();

    // Collect checked items from all store groups
    for (const store of STORE_ORDER) {
      for (const item of storeGroups[store]) {
        // Use a unified checkbox ID based on item name only (not store)
        const checkboxId = `shop-${item.section}-${item.name.replace(/\s+/g, '-')}`;

        // Only process each item once (even if checked in multiple stores)
        if (processedNames.has(item.name)) continue;

        if (state.shoppingChecked[checkboxId]) {
          processedNames.add(item.name);
          const qty = (state.shoppingChecked[`${checkboxId}-qty`] as number) || item.suggestedQty;
          checkedItems.push({ name: item.name, section: item.section, qty });
        }
      }
    }

    if (checkedItems.length === 0) {
      alert('No items selected. Check the items you want to add.');
      return;
    }

    // Record purchase history
    const todayDate = new Date().toISOString().split('T')[0];
    dispatch({ type: 'RECORD_PURCHASE', date: todayDate, items: checkedItems });

    // Add to inventory and update lastBought
    for (const item of checkedItems) {
      dispatch({ type: 'ADD_TO_INVENTORY', section: item.section, name: item.name, qty: item.qty });
      dispatch({
        type: 'UPDATE_KNOWN_ITEM_PURCHASE',
        section: item.section,
        name: item.name,
        qty: item.qty,
      });
    }

    // Clear shopping checked state
    dispatch({ type: 'CLEAR_SHOPPING_CHECKED' });

    alert(`Added ${checkedItems.length} item(s) to inventory!`);
  };

  return (
    <div>
      {/* Header */}
      <header className="flex items-center justify-between py-4 mb-4">
        <a
          href="#dashboard"
          className="w-10 h-10 flex items-center justify-center text-2xl text-gray-600 no-underline rounded-sm hover:bg-gray-100 transition-colors"
        >
          &larr;
        </a>
        <h1 className="text-xl font-semibold text-gray-800">Shopping List</h1>
        <div className="w-10" />
      </header>

      <section className="p-4">
        {/* Store sections in a responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 mb-6">
          {STORE_ORDER.map(store => (
            <div key={store} className="bg-gray-50 rounded-lg p-3 min-w-[200px]">
              <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 px-2 py-1.5 rounded bg-gray-200 text-gray-700">
                {STORE_LABELS[store]}
              </h3>
              <div className="flex flex-col gap-2">
                {storeGroups[store].length > 0 ? (
                  storeGroups[store].map(item => (
                    <ShoppingItem
                      key={`${store}-${item.section}-${item.name}`}
                      item={item}
                      urgency={item.urgency}
                    />
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-400 italic text-sm">
                    Nothing needed from here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add to Inventory Button */}
        <Button variant="primary" className="w-full gap-2" onClick={handleAddToInventory}>
          <span className="text-lg">+</span>
          Add to Inventory
        </Button>
      </section>
    </div>
  );
}
