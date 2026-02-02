import { useAppState, getMergedKnownItems } from '../../hooks/useAppState';
import type { AppState, KnownItem, Priority, Section, ShoppingListItem, Store, ShoppingListEntry } from '../../types';
import { defaultKnownItems, type DefaultKnownItem } from '../../data/defaultKnownItems';
import { PageHeader } from '../../components/PageHeader';
import { EmptyState } from '../../components/EmptyState';
import { ShoppingItem } from './ShoppingItem';
import { ShoppingSubcategoryGroup } from './StapleSubcategoryGroup';
import { NutritionGoalsSection, type NutritionGoalItem } from './NutritionGoalsSection';
import {
  groupItemsByCategory,
  STAPLE_CATEGORY_ORDER,
  type StapleItem,
} from '../../utils/stapleCategorization';

type Urgency = 'restock' | 'low' | 'variety';

interface StoreShoppingItem extends ShoppingListItem {
  urgency: Urgency;
  priority: Priority;
}

const STAPLE_CATEGORIZATION_THRESHOLD = 8;

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

// Get staple items for each store
function getStaplesByStore(): Record<Store, Array<{ item: DefaultKnownItem; section: Section }>> {
  const staples: Record<Store, Array<{ item: DefaultKnownItem; section: Section }>> = {
    'indian-store': [],
    costco: [],
    grocery: [],
  };

  for (const section of SECTIONS) {
    for (const item of defaultKnownItems[section]) {
      if (item.staple) {
        const stores = item.stores || ['grocery'];
        for (const store of stores) {
          staples[store].push({ item, section });
        }
      }
    }
  }

  return staples;
}

// Get all default items flattened for categorization
function getAllDefaultItems(): DefaultKnownItem[] {
  return [...defaultKnownItems.fresh, ...defaultKnownItems.frozen, ...defaultKnownItems.dry];
}

// Convert user's shopping list to store-grouped items
function groupUserListByStore(
  shoppingList: ShoppingListEntry[],
  knownMap: Map<string, KnownItem>
): Record<Store, ShoppingListItem[]> {
  const groups: Record<Store, ShoppingListItem[]> = {
    'indian-store': [],
    costco: [],
    grocery: [],
  };

  for (const entry of shoppingList) {
    const knownItem = knownMap.get(entry.name);
    groups[entry.store].push({
      name: entry.name,
      section: entry.section,
      currentQty: 0,
      suggestedQty: knownItem?.typicalQty || 1,
      lastBought: knownItem?.lastBought || null,
    });
  }

  return groups;
}

// Get nutrition goal items for a store (out-of-stock high protein and high fiber items)
function getNutritionGoalsByStore(
  state: AppState,
  mergedKnownItems: Record<Section, KnownItem[]>,
  userListNames: Set<string>,
  stapleNames: Set<string>,
  store: Store
): NutritionGoalItem[] {
  const items: NutritionGoalItem[] = [];
  const seen = new Set<string>();

  for (const section of SECTIONS) {
    const inventoryMap = new Map(
      state.inventory[section].map(i => [i.name, i.quantity])
    );

    for (const known of mergedKnownItems[section]) {
      // Skip if already in user list or staples
      if (userListNames.has(known.name) || stapleNames.has(known.name)) continue;
      // Skip if already added (avoid duplicates across sections)
      if (seen.has(known.name)) continue;

      const hasNutritionTags = known.nutritionTags && known.nutritionTags.length > 0;
      const hasHighProtein = known.nutritionTags?.includes('high-protein');
      const hasHighFiber = known.nutritionTags?.includes('high-fiber');
      const qty = inventoryMap.get(known.name) ?? 0;
      const isOutOfStock = qty === 0;
      const itemStores = known.stores || ['grocery'];
      const isInStore = itemStores.includes(store);

      if (hasNutritionTags && (hasHighProtein || hasHighFiber) && isOutOfStock && isInStore) {
        items.push({
          name: known.name,
          section,
          nutritionTags: known.nutritionTags!,
        });
        seen.add(known.name);
      }
    }
  }

  return items;
}

function NutritionLegend() {
  return (
    <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
      <span className="font-medium">Legend:</span>
      <div className="flex items-center gap-1.5">
        <span className="w-4 h-4 rounded bg-green-50 border border-green-200"></span>
        <span>Protein</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-4 h-4 rounded bg-teal-50 border border-teal-200"></span>
        <span>Fiber</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-4 h-4 rounded bg-purple-50 border border-purple-200"></span>
        <span>Both</span>
      </div>
    </div>
  );
}

export function Shopping() {
  const { state, dispatch } = useAppState();

  const mergedKnownItems = getMergedKnownItems(state);
  const { items, knownMap } = collectShoppingItems(state, mergedKnownItems);
  const uniqueItems = dedupeItems(items);
  const itemsWithUrgency = uniqueItems.map(item => ({ ...item, urgency: determineUrgency(item) }));
  const limitedItems = limitVarietyItems(itemsWithUrgency);
  const suggestionGroups = groupByStore(limitedItems, knownMap);
  const staplesByStore = getStaplesByStore();
  const userListByStore = groupUserListByStore(state.shoppingList, knownMap);

  // Get names in user's shopping list for this store (to filter from staples/suggestions)
  const getUserListNames = (store: Store) => new Set(
    state.shoppingList.filter(e => e.store === store).map(e => e.name)
  );

  const handleAddToList = (name: string, section: Section, store: Store) => {
    dispatch({
      type: 'ADD_TO_SHOPPING_LIST',
      entry: { name, section, store },
    });
  };

  const handleRemoveFromList = (name: string, store: Store) => {
    dispatch({
      type: 'REMOVE_FROM_SHOPPING_LIST',
      name,
      store,
    });
  };

  return (
    <div>
      <PageHeader title="Shopping List" />
      <NutritionLegend />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STORE_ORDER.map(store => {
          const userListNames = getUserListNames(store);
          const userItems = userListByStore[store];

          // Staples: items marked as staple for this store, excluding items already in user's list
          const staples: StapleItem[] = staplesByStore[store]
            .filter(({ item }) => !userListNames.has(item.name))
            .map(({ item, section }) => ({
              name: item.name,
              section,
              currentQty: 0,
              suggestedQty: item.typicalQty,
              lastBought: knownMap.get(item.name)?.lastBought || null,
              priority: item.priority || 'medium',
            }))
            .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);

          // Suggestions: auto-generated items, excluding user's list items and staples
          const stapleNames = new Set(staplesByStore[store].map(({ item }) => item.name));
          const suggestions = suggestionGroups[store].filter(
            item => !userListNames.has(item.name) && !stapleNames.has(item.name)
          );

          // Nutrition goals: out-of-stock natural protein and high fiber items
          const nutritionGoals = getNutritionGoalsByStore(
            state,
            mergedKnownItems,
            userListNames,
            stapleNames,
            store
          );

          return (
            <section
              key={store}
              className="bg-white rounded-[12px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
            >
              <h2 className="text-base font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                {STORE_LABELS[store]}
              </h2>

              <div className="flex flex-col gap-3">
                {/* Your List section - always visible */}
                <div className="mb-3">
                  <div className="flex items-center justify-between px-3 py-2 bg-blue-50 rounded-t-lg">
                    <span className="font-medium text-sm text-blue-700">Your List</span>
                    <span className="text-xs text-blue-600 bg-white px-2 py-0.5 rounded-full">
                      {userItems.length}
                    </span>
                  </div>
                  {userItems.length > STAPLE_CATEGORIZATION_THRESHOLD ? (
                    <div className="flex flex-col gap-1 pt-2">
                      {(() => {
                        const grouped = groupItemsByCategory(userItems, getAllDefaultItems());
                        return STAPLE_CATEGORY_ORDER.map(category => {
                          const categoryItems = grouped[category];
                          if (categoryItems.length === 0) return null;
                          return (
                            <ShoppingSubcategoryGroup
                              key={`user-${store}-${category}`}
                              category={category}
                              items={categoryItems}
                              store={store}
                              variant="user-list"
                              onRemove={(name) => handleRemoveFromList(name, store)}
                            />
                          );
                        });
                      })()}
                    </div>
                  ) : userItems.length > 0 ? (
                    <div className="flex flex-col gap-2 pt-2">
                      {userItems.map(item => (
                        <ShoppingItem
                          key={`user-${store}-${item.name}`}
                          item={item}
                          variant="user-list"
                          onRemove={() => handleRemoveFromList(item.name, store)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="pt-2">
                      <EmptyState message="Add items from below" icon="📝" />
                    </div>
                  )}
                </div>

                {/* Staples section */}
                {staples.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between px-3 py-2 bg-amber-50 rounded-t-lg">
                      <span className="font-medium text-sm text-amber-700">Staples</span>
                      <span className="text-xs text-amber-600 bg-white px-2 py-0.5 rounded-full">
                        {staples.length}
                      </span>
                    </div>
                    {staples.length > STAPLE_CATEGORIZATION_THRESHOLD ? (
                      <div className="flex flex-col gap-1 pt-2">
                        {(() => {
                          const grouped = groupItemsByCategory(staples, getAllDefaultItems());
                          return STAPLE_CATEGORY_ORDER.map(category => {
                            const categoryItems = grouped[category];
                            if (categoryItems.length === 0) return null;
                            return (
                              <ShoppingSubcategoryGroup
                                key={`staple-${store}-${category}`}
                                category={category}
                                items={categoryItems}
                                store={store}
                                variant="staple"
                                knownMap={knownMap}
                                onAddToList={(name, section) => handleAddToList(name, section, store)}
                              />
                            );
                          });
                        })()}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 pt-2">
                        {staples.map(item => (
                          <ShoppingItem
                            key={`staple-${store}-${item.name}`}
                            item={item}
                            variant="staple"
                            nutritionTags={knownMap.get(item.name)?.nutritionTags}
                            onAddToList={() => handleAddToList(item.name, item.section, store)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Nutrition Goals section */}
                <NutritionGoalsSection
                  items={nutritionGoals}
                  store={store}
                  onAddToList={(name, section) => handleAddToList(name, section, store)}
                />

                {/* Suggestions section */}
                {suggestions.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between px-3 py-2 bg-green-50 rounded-t-lg">
                      <span className="font-medium text-sm text-green-700">Suggestions</span>
                      <span className="text-xs text-green-600 bg-white px-2 py-0.5 rounded-full">
                        {suggestions.length}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 pt-2">
                      {suggestions.map(item => (
                        <ShoppingItem
                          key={`suggestion-${store}-${item.section}-${item.name}`}
                          item={item}
                          variant="suggestion"
                          urgency={item.urgency}
                          nutritionTags={knownMap.get(item.name)?.nutritionTags}
                          onAddToList={() => handleAddToList(item.name, item.section, store)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
