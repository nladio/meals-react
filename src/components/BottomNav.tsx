import { useState } from 'react';
import { useAppState } from '../hooks/useAppState';
import { applyTheme } from '../hooks/useTheme';
import { applyFont } from '../hooks/useFont';
import { ThemePopover } from './ThemePopover';
import type { ThemeName, FontName } from '../types';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ShoppingIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function NutritionIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
      <path d="M12 2a10 10 0 0 1 10 10" />
      <path d="M12 12l7-7" />
    </svg>
  );
}

function RecipesIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function InventoryIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

const navItems = [
  { id: 'dashboard', label: 'Home', Icon: HomeIcon },
  { id: 'inventory', label: 'Inventory', Icon: InventoryIcon },
  { id: 'recipes', label: 'Recipes', Icon: RecipesIcon },
  { id: 'shopping', label: 'Shopping', Icon: ShoppingIcon },
  { id: 'nutrition', label: 'Nutrition', Icon: NutritionIcon },
];

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const { state, dispatch } = useAppState();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSelectTheme = (theme: ThemeName) => {
    dispatch({ type: 'SET_THEME', theme });
    applyTheme(theme);
  };

  const handleSelectFont = (font: FontName) => {
    dispatch({ type: 'SET_FONT', font });
    applyFont(font);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200/60 flex justify-around py-2 pb-[max(8px,env(safe-area-inset-bottom))] z-50">
      {navItems.map(item => {
        const isActive = currentPage === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={e => {
              e.preventDefault();
              onNavigate(item.id);
            }}
            className={`group flex flex-col items-center gap-1 px-2 py-2 no-underline transition-all active:scale-95 ${
              isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <div
              className={`relative p-1.5 rounded-full transition-all ${
                isActive
                  ? 'bg-primary/10'
                  : 'group-hover:bg-gray-100'
              }`}
            >
              <div className="transition-transform group-hover:scale-110">
                <item.Icon active={isActive} />
              </div>
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-pop-in" />
              )}
            </div>
            <span className={`text-[11px] transition-all ${isActive ? 'font-semibold' : 'font-medium'}`}>
              {item.label}
            </span>
          </a>
        );
      })}

      {/* Settings button with theme popover */}
      <div className="relative flex flex-col items-center gap-1 px-2 py-2">
        <button
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          className="group flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-all active:scale-95"
          aria-label="Settings"
        >
          <div className="relative p-1.5 rounded-full transition-all group-hover:bg-gray-100">
            <div className="transition-transform group-hover:scale-110">
              <SettingsIcon />
            </div>
          </div>
          <span className="text-[11px] font-medium">Theme</span>
        </button>

        <ThemePopover
          isOpen={isPopoverOpen}
          currentTheme={state.theme}
          currentFont={state.font}
          onSelectTheme={handleSelectTheme}
          onSelectFont={handleSelectFont}
          onClose={() => setIsPopoverOpen(false)}
        />
      </div>
    </nav>
  );
}
