interface EmptyStateProps {
  message: string;
  icon?: string;
  subtitle?: string;
}

export function EmptyState({ message, icon, subtitle }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-5 bg-gray-50 rounded-sm border-l-[3px] border-l-gray-200 text-gray-400">
      {icon && <span className="text-2xl mb-2">{icon}</span>}
      <span className="font-medium text-[15px]">{message}</span>
      {subtitle && <span className="text-xs mt-1">{subtitle}</span>}
    </div>
  );
}
