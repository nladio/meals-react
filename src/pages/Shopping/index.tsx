import { useAppState } from '../../hooks/useAppState';
import type { Section, ShoppingListItem, PurchaseItem } from '../../types';
import { ShoppingItem } from './ShoppingItem';
import { Button } from '../../components/ui/Button';

export function Shopping() {
  const { state, dispatch } = useAppState();

  // Get shopping list items
  const { needRestock, runningLow, forVariety } = getShoppingListItems();

  function getShoppingListItems() {
    const needRestock: ShoppingListItem[] = [];
    const runningLow: ShoppingListItem[] = [];
    const forVariety: ShoppingListItem[] = [];

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    for (const section of ['fresh', 'frozen', 'dry'] as Section[]) {
      // Check inventory items
      for (const item of state.inventory[section]) {
        if (item.quantity === 0) {
          const knownItem = state.knownItems[section].find(k => k.name === item.name);
          needRestock.push({
            name: item.name,
            section,
            currentQty: 0,
            suggestedQty: knownItem?.typicalQty || 1,
            lastBought: knownItem?.lastBought || null,
          });
        } else if (item.quantity <= 2) {
          const knownItem = state.knownItems[section].find(k => k.name === item.name);
          runningLow.push({
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
      for (const knownItem of state.knownItems[section]) {
        if (!inventoryNames.includes(knownItem.name)) {
          if (knownItem.lastBought) {
            needRestock.push({
              name: knownItem.name,
              section,
              currentQty: 0,
              suggestedQty: knownItem.typicalQty || 1,
              lastBought: knownItem.lastBought,
            });
          } else {
            forVariety.push({
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

    // Add variety items (not already in lists)
    const restockNames = new Set(needRestock.map(i => i.name));
    const lowNames = new Set(runningLow.map(i => i.name));

    for (const section of ['fresh', 'frozen', 'dry'] as Section[]) {
      for (const knownItem of state.knownItems[section]) {
        if (restockNames.has(knownItem.name) || lowNames.has(knownItem.name)) continue;

        const lastBought = knownItem.lastBought ? new Date(knownItem.lastBought) : null;
        if (!lastBought || lastBought < sevenDaysAgo) {
          const existing = forVariety.find(v => v.name === knownItem.name);
          if (!existing) {
            const currentQty =
              state.inventory[section].find(i => i.name === knownItem.name)?.quantity || 0;
            if (currentQty <= 2) {
              forVariety.push({
                name: knownItem.name,
                section,
                currentQty,
                suggestedQty: knownItem.typicalQty || 1,
                lastBought: knownItem.lastBought,
              });
            }
          }
        }
      }
    }

    // Sort variety by last bought (oldest first)
    forVariety.sort((a, b) => {
      if (!a.lastBought && !b.lastBought) return 0;
      if (!a.lastBought) return 1;
      if (!b.lastBought) return -1;
      return new Date(a.lastBought).getTime() - new Date(b.lastBought).getTime();
    });

    return { needRestock, runningLow, forVariety: forVariety.slice(0, 5) };
  }

  const handleAddToInventory = () => {
    const checkedItems: PurchaseItem[] = [];

    // Collect checked items
    const allItems = [...needRestock, ...runningLow, ...forVariety];
    for (const item of allItems) {
      const checkboxId = `shop-${item.section}-${item.name.replace(/\s+/g, '-')}`;
      if (state.shoppingChecked[checkboxId]) {
        const qty = (state.shoppingChecked[`${checkboxId}-qty`] as number) || item.suggestedQty;
        checkedItems.push({ name: item.name, section: item.section, qty });
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
        {/* Need to Restock */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 px-3 py-2 rounded-sm bg-red-50 text-danger">
            Need to Restock (0 left)
          </h3>
          <div className="flex flex-col gap-2">
            {needRestock.length > 0 ? (
              needRestock.map(item => (
                <ShoppingItem key={`${item.section}-${item.name}`} item={item} />
              ))
            ) : (
              <div className="text-center py-5 text-gray-400 italic">All stocked up!</div>
            )}
          </div>
        </div>

        {/* Running Low */}
        {runningLow.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 px-3 py-2 rounded-sm bg-orange-50 text-orange-800">
              Running Low
            </h3>
            <div className="flex flex-col gap-2">
              {runningLow.map(item => (
                <ShoppingItem key={`${item.section}-${item.name}`} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* For Variety */}
        {forVariety.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 px-3 py-2 rounded-sm bg-blue-50 text-blue-800">
              For Variety (haven't bought lately)
            </h3>
            <div className="flex flex-col gap-2">
              {forVariety.map(item => (
                <ShoppingItem key={`${item.section}-${item.name}`} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Add to Inventory Button */}
        <Button variant="primary" className="w-full gap-2" onClick={handleAddToInventory}>
          <span className="text-lg">+</span>
          Add to Inventory
        </Button>
      </section>
    </div>
  );
}
