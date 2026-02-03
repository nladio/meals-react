interface EmptyStateProps {
  message: string;
  icon?: string;
  subtitle?: string;
}

export function EmptyState({ message, icon, subtitle }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-lg border-l-[3px] border-l-gray-200 text-gray-400 animate-fade-in">
      {icon && <span className="text-3xl mb-2 animate-pop-in">{icon}</span>}
      <span className="font-medium text-[15px]">{message}</span>
      {subtitle && <span className="text-xs mt-1 text-gray-400">{subtitle}</span>}
    </div>
  );
}
