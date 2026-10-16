import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { MARKETING_NAV } from '../../marketing/journey';
import { BrandLogo } from './BrandLogo';

export function MarketingHeader() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0c1f3d]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <BrandLogo />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Marketing">
          {MARKETING_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm ${isActive ? 'text-castiq-white' : 'text-castiq-muted hover:text-castiq-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <Link to="/account" className="text-sm text-castiq-muted hover:text-castiq-white">Account</Link>
              <Link to="/search" className="ciq-btn-primary">Open CastIQ</Link>
            </>
          ) : (
            <>
              <Link to="/login" state={{ from: '/search' }} className="text-sm text-castiq-muted hover:text-castiq-white">
                Sign In
              </Link>
              <Link to="/login" state={{ from: '/search', mode: 'signup' }} className="ciq-btn-primary">
                Get Started Free
              </Link>
            </>
          )}
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-castiq-white lg:hidden"
          aria-expanded={open}
          aria-controls="marketing-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      {open ? (
        <div id="marketing-menu" className="border-t border-white/10 px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile marketing">
            {MARKETING_NAV.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-castiq-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            {user ? (
              <>
                <Link to="/account" onClick={() => setOpen(false)} className="ciq-btn-secondary">Account</Link>
                <Link to="/search" onClick={() => setOpen(false)} className="ciq-btn-primary">Open CastIQ</Link>
              </>
            ) : (
              <>
                <Link to="/login" state={{ from: '/search' }} onClick={() => setOpen(false)} className="ciq-btn-secondary">
                  Sign In
                </Link>
                <Link to="/login" state={{ from: '/search', mode: 'signup' }} onClick={() => setOpen(false)} className="ciq-btn-primary">
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
