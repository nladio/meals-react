import type { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { AlertBanner } from './AlertBanner';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  return (
    <div className="max-w-[600px] mx-auto p-4 pb-[100px]">
      <AlertBanner />
      {children}
      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
}
