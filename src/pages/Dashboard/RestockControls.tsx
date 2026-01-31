import { useState } from 'react';
import type { Section } from '../../types';
import { useAppState } from '../../hooks/useAppState';
import { QuantityControl } from '../../components/ui/QuantityControl';
import { Button } from '../../components/ui/Button';

interface RestockControlsProps {
  section: Section;
}

export function RestockControls({ section }: RestockControlsProps) {
  const { state, dispatch } = useAppState();
  const [showNewInput, setShowNewInput] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [expiryDate, setExpiryDate] = useState('');

  // Get items not currently in inventory
  const inventoryNames = state.inventory[section].map(i => i.name);
  const availableItems = state.knownItems[section].filter(
    item => !inventoryNames.includes(item.name)
  );

  const handleAddItem = () => {
    if (selectedItem) {
      const todayDate = new Date().toISOString().split('T')[0];

      // Record purchase history (for calendar)
      dispatch({
        type: 'RECORD_PURCHASE',
        date: todayDate,
        items: [{ name: selectedItem, section, qty: quantity }]
      });

      // Add to inventory
      dispatch({ type: 'ADD_TO_INVENTORY', section, name: selectedItem, qty: quantity, expiryDate: expiryDate || undefined });

      setSelectedItem('');
      setQuantity(1);
      setExpiryDate('');
    }
  };

  const handleSaveNew = () => {
    if (newItemName.trim()) {
      dispatch({ type: 'ADD_KNOWN_ITEM', section, name: newItemName.trim() });
      setNewItemName('');
      setShowNewInput(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveNew();
    }
  };

  if (showNewInput) {
    return (
      <div className="flex items-center gap-2 flex-wrap mt-4 pt-4 border-t border-dashed border-gray-200">
        <input
          type="text"
          value={newItemName}
          onChange={e => setNewItemName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="New item name..."
          autoFocus
          className="flex-1 min-w-[150px] px-3 py-2.5 border border-gray-200 rounded-sm text-sm font-inherit focus:outline-none focus:border-primary"
        />
        <Button variant="success" size="sm" onClick={handleSaveNew}>
          Add
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setShowNewInput(false)}>
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap mt-4 pt-4 border-t border-dashed border-gray-200">
      <select
        value={selectedItem}
        onChange={e => setSelectedItem(e.target.value)}
        className="flex-1 min-w-[120px] px-3 py-2.5 border border-gray-200 rounded-sm text-sm font-inherit bg-white cursor-pointer focus:outline-none focus:border-primary"
      >
        <option value="">Select item...</option>
        {availableItems.map(item => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>

      <QuantityControl value={quantity} onChange={setQuantity} />

      <input
        type="date"
        value={expiryDate}
        onChange={e => setExpiryDate(e.target.value)}
        className="px-3 py-2.5 border border-gray-200 rounded-sm text-sm font-inherit bg-white focus:outline-none focus:border-primary"
        placeholder="Expiry date"
        title="Expiry date (optional)"
      />

      <Button variant="primary" size="sm" onClick={handleAddItem}>
        Add
      </Button>

      <Button variant="secondary" size="sm" onClick={() => setShowNewInput(true)}>
        + New
      </Button>
    </div>
  );
}
