import { Link, NavLink, Outlet } from 'react-router-dom';
import { ProtectedRoute } from '../shared/ProtectedRoute';
import { BrandLogo } from './BrandLogo';

const LINKS = [
  { to: '/account', label: 'Overview', end: true },
  { to: '/account/billing', label: 'Billing' },
  { to: '/account/settings', label: 'Settings' },
];

export function AccountLayout() {
  return (
    <ProtectedRoute>
      <div className="marketing-site flex min-h-dvh flex-col bg-castiq-blue-dark text-castiq-white">
        <header className="border-b border-white/10">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
            <BrandLogo />
            <Link to="/search" className="ciq-btn-primary">Open CastIQ</Link>
          </div>
        </header>
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row">
          <nav className="flex gap-2 md:w-44 md:flex-col" aria-label="Account">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm ${isActive ? 'bg-castiq-blue text-white' : 'text-castiq-muted hover:text-white'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="min-w-0 flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
