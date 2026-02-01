import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Shopping } from './pages/Shopping';
import { History } from './pages/History';
import { Recipes } from './pages/Recipes';
import { WhatToEat } from './pages/WhatToEat';

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
      case 'shopping':
        return <Shopping />;
      case 'history':
        return <History />;
      case 'recipes':
        return <Recipes />;
      case 'nutrition':
        return <WhatToEat />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={page} onNavigate={handleNavigate}>
      {renderPage()}
    </Layout>
  );
}

export default App;
