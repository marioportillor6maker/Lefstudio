'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { label: 'Bandeja DOCT',     href: '/doct' },
  { label: 'Solicitudes RT-75',href: '/doct/rt75' },
  { label: 'Contraste RT-41',  href: '/doct/rt41' },
  { label: 'Solicitudes RT-30',href: '/doct/rt30' },
  { label: 'Preparación RT-38',href: '/doct/rt38' },
  { label: 'Control Expediente',href: '/doct/control' },
];

export function DoctNav() {
  const pathname = usePathname();
  return (
    <div className="flex border-b border-slate-200 bg-white px-6 gap-0 shrink-0">
      {TABS.map(tab => {
        const isActive = tab.href === '/doct' ? pathname === '/doct' : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
              isActive
                ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
