// src/components/ui/ErrorDisplay.tsx
import { AlertCircle } from 'lucide-react';

interface ErrorDisplayProps {
  error: string;
  className?: string;
}

export function ErrorDisplay({ error, className }: ErrorDisplayProps) {
  if (!error) return null;

  return (
    <div className={cn(
      'flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm',
      className
    )}>
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span>{error}</span>
    </div>
  );
}