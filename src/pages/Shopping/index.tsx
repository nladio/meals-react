import { useAppState, getMergedKnownItems } from '../../hooks/useAppState';
import type { AppState, KnownItem, Priority, Section, ShoppingListItem, Store } from '../../types';
import { ShoppingItem } from './ShoppingItem';

type Urgency = 'restock' | 'low' | 'variety';

interface StoreShoppingItem extends ShoppingListItem {
  urgency: Urgency;
  priority: Priority;
}

const STORE_LABELS: Record<Store, string> = {
  'indian-store': 'Indian Store',
  costco: 'Costco',
  grocery: 'Grocery',
};

const STORE_ORDER: Store[] = ['indian-store', 'costco', 'grocery'];

const SECTIONS: Section[] = ['fresh', 'frozen', 'dry'];

const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
const URGENCY_ORDER: Record<Urgency, number> = { restock: 0, low: 1, variety: 2 };

function determineUrgency(item: ShoppingListItem): Urgency {
  if (item.currentQty === 0 && item.lastBought !== null) return 'restock';
  if (item.currentQty > 0 && item.currentQty <= 2) return 'low';
  return 'variety';
}

function createShoppingItem(
  name: string,
  section: Section,
  currentQty: number,
  knownItem: KnownItem | undefined
): ShoppingListItem {
  return {
    name,
    section,
    currentQty,
    suggestedQty: Math.max(1, (knownItem?.typicalQty || 1) - currentQty),
    lastBought: knownItem?.lastBought || null,
  };
}

function collectShoppingItems(
  state: AppState,
  mergedKnownItems: Record<Section, KnownItem[]>
): { items: ShoppingListItem[]; knownMap: Map<string, KnownItem> } {
  const items: ShoppingListItem[] = [];
  const knownMap = new Map<string, KnownItem>();
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  for (const section of SECTIONS) {
    const inventoryNames = new Set(state.inventory[section].map(i => i.name));

    for (const item of state.inventory[section]) {
      const knownItem = mergedKnownItems[section].find(k => k.name === item.name);
      if (knownItem) knownMap.set(item.name, knownItem);

      if (item.quantity === 0) {
        items.push(createShoppingItem(item.name, section, 0, knownItem));
      } else if (item.quantity <= 2) {
        items.push(createShoppingItem(item.name, section, item.quantity, knownItem));
      }
    }

    for (const knownItem of mergedKnownItems[section]) {
      knownMap.set(knownItem.name, knownItem);

      if (inventoryNames.has(knownItem.name)) continue;

      const lastBoughtTime = knownItem.lastBought ? new Date(knownItem.lastBought).getTime() : null;
      const shouldShow = !lastBoughtTime || lastBoughtTime < sevenDaysAgo;

      if (shouldShow) {
        items.push({
          name: knownItem.name,
          section,
          currentQty: 0,
          suggestedQty: knownItem.typicalQty || 1,
          lastBought: knownItem.lastBought,
        });
      }
    }
  }

  return { items, knownMap };
}

function dedupeItems(items: ShoppingListItem[]): ShoppingListItem[] {
  const seen = new Set<string>();
  return items.filter(item => {
    if (seen.has(item.name)) return false;
    seen.add(item.name);
    return true;
  });
}

function limitVarietyItems(
  items: Array<ShoppingListItem & { urgency: Urgency }>
): Array<ShoppingListItem & { urgency: Urgency }> {
  const nonVariety = items.filter(i => i.urgency !== 'variety');
  const variety = items
    .filter(i => i.urgency === 'variety')
    .sort((a, b) => {
      if (!a.lastBought && !b.lastBought) return 0;
      if (!a.lastBought) return 1;
      if (!b.lastBought) return -1;
      return new Date(a.lastBought).getTime() - new Date(b.lastBought).getTime();
    })
    .slice(0, 5);

  return [...nonVariety, ...variety];
}

function groupByStore(
  items: Array<ShoppingListItem & { urgency: Urgency }>,
  knownMap: Map<string, KnownItem>
): Record<Store, StoreShoppingItem[]> {
  const groups: Record<Store, StoreShoppingItem[]> = {
    'indian-store': [],
    costco: [],
    grocery: [],
  };

  for (const item of items) {
    const knownItem = knownMap.get(item.name);
    const stores = knownItem?.stores || ['grocery'];
    const priority = knownItem?.priority || 'medium';

    for (const store of stores) {
      groups[store].push({ ...item, priority });
    }
  }

  for (const store of STORE_ORDER) {
    groups[store].sort((a, b) => {
      const priorityDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      return priorityDiff !== 0 ? priorityDiff : URGENCY_ORDER[a.urgency] - URGENCY_ORDER[b.urgency];
    });
  }

  return groups;
}

export function Shopping() {
  const { state } = useAppState();

  const mergedKnownItems = getMergedKnownItems(state);
  const { items, knownMap } = collectShoppingItems(state, mergedKnownItems);
  const uniqueItems = dedupeItems(items);
  const itemsWithUrgency = uniqueItems.map(item => ({ ...item, urgency: determineUrgency(item) }));
  const limitedItems = limitVarietyItems(itemsWithUrgency);
  const storeGroups = groupByStore(limitedItems, knownMap);

  return (
    <div>
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

      <section className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {STORE_ORDER.map(store => (
            <div
              key={store}
              className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden flex flex-col items-stretch hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 px-6 py-5">
                <h3 className="text-xl font-bold text-white text-center tracking-wide">
                  {STORE_LABELS[store]}
                </h3>
                <p className="text-slate-300 text-sm text-center mt-2">
                  {storeGroups[store].length} {storeGroups[store].length === 1 ? 'item' : 'items'} to buy
                </p>
              </div>
              <div className="p-5 flex-1 bg-gradient-to-b from-white to-gray-50">
                <div className="space-y-3">
                  {storeGroups[store].length > 0 ? (
                    storeGroups[store].map(item => (
                      <ShoppingItem
                        key={`${store}-${item.section}-${item.name}`}
                        item={item}
                        urgency={item.urgency}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-400 italic">
                      Nothing needed from here
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
