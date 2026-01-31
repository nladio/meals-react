import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalendarGrid } from './CalendarGrid';

// Mock the useAppState hook
vi.mock('../../hooks/useAppState', () => ({
  useAppState: vi.fn(),
}));

import { useAppState } from '../../hooks/useAppState';

const mockUseAppState = vi.mocked(useAppState);

describe('CalendarGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAppState.mockReturnValue({
      state: {
        purchaseHistory: [],
        knownItems: { fresh: [], frozen: [], dry: [] },
        inventory: { fresh: [], frozen: [], dry: [] },
        shoppingChecked: {},
        historyViewMonth: null,
      },
      dispatch: vi.fn(),
    });
  });

  it('renders all day headers', () => {
    render(
      <CalendarGrid
        viewMonth="2024-01"
        selectedDate={null}
        onSelectDate={() => {}}
      />
    );

    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (const day of dayHeaders) {
      expect(screen.getByText(day)).toBeInTheDocument();
    }
  });

  it('renders correct number of days for the month', () => {
    render(
      <CalendarGrid
        viewMonth="2024-01"
        selectedDate={null}
        onSelectDate={() => {}}
      />
    );

    // January 2024 has 31 days
    for (let day = 1; day <= 31; day++) {
      expect(screen.getByText(String(day))).toBeInTheDocument();
    }
    // Should not have day 32
    expect(screen.queryByText('32')).not.toBeInTheDocument();
  });

  it('calls onSelectDate when a day is clicked', async () => {
    const user = userEvent.setup();
    const onSelectDate = vi.fn();

    render(
      <CalendarGrid
        viewMonth="2024-01"
        selectedDate={null}
        onSelectDate={onSelectDate}
      />
    );

    await user.click(screen.getByText('15'));
    expect(onSelectDate).toHaveBeenCalledWith('2024-01-15');
  });

  it('applies success background class to days with purchases', () => {
    mockUseAppState.mockReturnValue({
      state: {
        purchaseHistory: [
          { id: '1', date: '2024-01-10', items: [] },
        ],
        knownItems: { fresh: [], frozen: [], dry: [] },
        inventory: { fresh: [], frozen: [], dry: [] },
        shoppingChecked: {},
        historyViewMonth: null,
      },
      dispatch: vi.fn(),
    });

    render(
      <CalendarGrid
        viewMonth="2024-01"
        selectedDate={null}
        onSelectDate={() => {}}
      />
    );

    const day10 = screen.getByText('10').closest('div');
    expect(day10).toHaveClass('!bg-success');
  });

  it('applies white text to days with purchases', () => {
    mockUseAppState.mockReturnValue({
      state: {
        purchaseHistory: [
          { id: '1', date: '2024-01-10', items: [] },
        ],
        knownItems: { fresh: [], frozen: [], dry: [] },
        inventory: { fresh: [], frozen: [], dry: [] },
        shoppingChecked: {},
        historyViewMonth: null,
      },
      dispatch: vi.fn(),
    });

    render(
      <CalendarGrid
        viewMonth="2024-01"
        selectedDate={null}
        onSelectDate={() => {}}
      />
    );

    const day10Text = screen.getByText('10');
    expect(day10Text).toHaveClass('text-white');
  });

  it('applies primary border to today\'s date', () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = today.getDate();
    const viewMonth = `${year}-${month}`;

    render(
      <CalendarGrid
        viewMonth={viewMonth}
        selectedDate={null}
        onSelectDate={() => {}}
      />
    );

    const todayCell = screen.getByText(String(day)).closest('div');
    expect(todayCell).toHaveClass('border-primary');
  });

  it('applies primary background to selected date', () => {
    render(
      <CalendarGrid
        viewMonth="2024-01"
        selectedDate="2024-01-20"
        onSelectDate={() => {}}
      />
    );

    const selectedDay = screen.getByText('20').closest('div');
    expect(selectedDay).toHaveClass('!bg-primary');
  });
});
