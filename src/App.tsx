import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Shopping } from './pages/Shopping';
import { Recipes } from './pages/Recipes';
import { WhatToEat } from './pages/WhatToEat';
import { ThemePreview } from './pages/ThemePreview';

function App() {
  const [page, setPage] = useState(() => window.location.hash.slice(1) || 'dashboard');

  useEffect(() => {
    const handler = () => setPage(window.location.hash.slice(1) || 'dashboard');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const handleNavigate = (newPage: string) => {
    window.location.hash = newPage;
  };

  const renderPage = () => {
    switch (page) {
      case 'inventory':
        return <Inventory />;
      case 'shopping':
        return <Shopping />;
      case 'recipes':
        return <Recipes />;
      case 'nutrition':
        return <WhatToEat />;
      case 'theme-preview':
        return <ThemePreview />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={page} onNavigate={handleNavigate} wide={page === 'shopping' || page === 'recipes'}>
      {renderPage()}
    </Layout>
  );
}

export default App;
