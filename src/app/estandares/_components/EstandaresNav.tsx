'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { label: 'Bandeja Estándares',  href: '/estandares' },
  { label: 'Registro RG-44',      href: '/estandares/nuevo' },
  { label: 'Entrega RT-27',       href: '/estandares/entrega' },
  { label: 'Rechazo RG-58',       href: '/estandares/rechazo' },
  { label: 'Eliminación RT-45',   href: '/estandares/eliminacion' },
  { label: 'Control de Vigencia', href: '/estandares/vigencia' },
];

export function EstandaresNav() {
  const pathname = usePathname();
  return (
    <div className="flex items-end gap-1 px-6 pt-3 bg-white border-b border-slate-200 shrink-0 overflow-x-auto">
      {TABS.map(tab => {
        const isActive =
          tab.href === '/estandares'
            ? pathname === '/estandares'
            : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap rounded-t transition-colors ${
              isActive
                ? 'bg-white border border-b-white border-slate-200 text-[var(--color-primary)] -mb-px z-10 relative shadow-sm'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-transparent'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
