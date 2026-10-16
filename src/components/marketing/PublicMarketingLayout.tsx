import { Outlet } from 'react-router-dom';
import { MarketingFooter } from './MarketingFooter';
import { MarketingHeader } from './MarketingHeader';

export function PublicMarketingLayout() {
  return (
    <div className="marketing-site flex min-h-dvh flex-col bg-castiq-blue-dark text-castiq-white">
      <MarketingHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  );
}
