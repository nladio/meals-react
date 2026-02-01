interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
}

export function PageHeader({ title, showBackButton = false }: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between py-4 mb-4">
      {showBackButton ? (
        <a
          href="#dashboard"
          className="w-10 h-10 flex items-center justify-center text-2xl text-gray-600 no-underline rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Back to dashboard"
        >
          ←
        </a>
      ) : (
        <div className="w-10" />
      )}
      <h1 className="text-[28px] font-bold text-primary">{title}</h1>
      <div className="w-10" />
    </header>
  );
}
