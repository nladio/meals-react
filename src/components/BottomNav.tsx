interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Home', icon: '🏠' },
  { id: 'shopping', label: 'Shopping', icon: '🛒' },
  { id: 'nutrition', label: 'Nutrition', icon: '🥗' },
  { id: 'recipes', label: 'Recipes', icon: '📖' },
  { id: 'history', label: 'History', icon: '📅' },
];

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 pb-[max(8px,env(safe-area-inset-bottom))] z-50">
      {navItems.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={e => {
            e.preventDefault();
            onNavigate(item.id);
          }}
          className={`flex flex-col items-center gap-1 px-4 py-2 no-underline transition-colors ${
            currentPage === item.id ? 'text-primary' : 'text-gray-400'
          }`}
        >
          <span className="text-2xl">{item.icon}</span>
          <span className="text-[11px] font-medium">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
