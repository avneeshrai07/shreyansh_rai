import {
  Scale,
  Gavel,
  Shield,
  FileText,
  Monitor,
  AlertTriangle,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Scale,
  Gavel,
  Shield,
  FileText,
  Monitor,
  AlertTriangle,
  BookOpen,
};

/**
 * Maps a practice-area icon name (from the content files) to a lucide icon.
 * Decorative only → aria-hidden.
 */
export function PracticeIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Scale;
  return <Icon className={className} aria-hidden="true" />;
}
