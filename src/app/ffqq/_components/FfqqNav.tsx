'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { label: 'Bandeja FFQQ',        href: '/ffqq' },
  { label: 'Hoja de Trabajo',     href: '/ffqq/hoja' },
  { label: 'Resultados RT-88',    href: '/ffqq/resultados' },
  { label: 'Validaciones',        href: '/ffqq/validaciones' },
  { label: 'Bitácora Reactivos',  href: '/ffqq/reactivos' },
  { label: 'Control de Equipos',  href: '/ffqq/equipos' },
  { label: 'Métodos Analíticos',  href: '/ffqq/metodos' },
  { label: 'Historial Casos',     href: '/ffqq/historial' },
];

export function FfqqNav() {
  const pathname = usePathname();
  return (
    <div className="flex items-end gap-1 px-6 pt-3 bg-white border-b border-slate-200 shrink-0 overflow-x-auto">
      {TABS.map(tab => {
        const isActive = tab.href === '/ffqq'
          ? pathname === '/ffqq'
          : pathname.startsWith(tab.href);
        return (
          <Link key={tab.href} href={tab.href}
            className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap rounded-t transition-colors ${
              isActive
                ? 'bg-white border border-b-white border-slate-200 text-[var(--color-primary)] -mb-px z-10 relative shadow-sm'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-transparent'
            }`}>
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
