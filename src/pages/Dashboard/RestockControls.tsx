import { useState } from 'react';
import type { Section } from '../../types';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../../components/ui/Button';
import { AddItemModal } from './AddItemModal';

interface RestockControlsProps {
  section: Section;
}

export function RestockControls({ section }: RestockControlsProps) {
  const { dispatch } = useAppState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddFromModal = (name: string, qty: number, expiryDate?: string) => {
    const todayDate = new Date().toISOString().split('T')[0];

    // Record purchase history (for calendar)
    dispatch({
      type: 'RECORD_PURCHASE',
      date: todayDate,
      items: [{ name, section, qty }]
    });

    // Add to inventory
    dispatch({ type: 'ADD_TO_INVENTORY', section, name, qty, expiryDate });
  };

  return (
    <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
      <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(true)}>
        + Add Item
      </Button>

      <AddItemModal
        section={section}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddFromModal}
      />
    </div>
  );
}
