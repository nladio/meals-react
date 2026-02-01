import type { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { AlertBanner } from './AlertBanner';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  wide?: boolean;
}

export function Layout({ children, currentPage, onNavigate, wide }: LayoutProps) {
  return (
    <div className={`mx-auto p-4 pb-[100px] ${wide ? 'max-w-5xl' : 'max-w-[600px]'}`}>
      <AlertBanner />
      {children}
      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
}
