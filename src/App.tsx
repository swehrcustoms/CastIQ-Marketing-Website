import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { LakeSearch } from './pages/LakeSearch';
import { LakeDetail } from './pages/LakeDetail';
import { Login } from './pages/Login';
import { IceFishing } from './pages/IceFishing';
import { Pricing } from './pages/Pricing';
import { Guides } from './pages/Guides';
import { About } from './pages/About';
import { Social } from './pages/Social';
import { BorderWaters } from './pages/BorderWaters';
import { Regulations } from './pages/Regulations';
import { SubmitReport } from './pages/SubmitReport';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { NotFound } from './pages/NotFound';
import { Profile } from './pages/Profile';
import { Onboarding } from './pages/Onboarding';
import { ProtectedRoute } from './components/shared/ProtectedRoute';
import { AppHeader } from './components/shared/AppHeader';
import { AppNav } from './components/nav/AppNav';
import { PublicMarketingLayout } from './components/marketing/PublicMarketingLayout';
import { AccountLayout } from './components/marketing/AccountLayout';
import { HomePage } from './pages/marketing/HomePage';
import { FeaturesPage } from './pages/marketing/FeaturesPage';
import { HowItWorksPage } from './pages/marketing/HowItWorksPage';
import { FaqPage } from './pages/marketing/FaqPage';
import { ContactPage } from './pages/marketing/ContactPage';
import { ForGuidesPage } from './pages/marketing/ForGuidesPage';
import { RefundsPage } from './pages/marketing/RefundsPage';
import { CheckoutResult } from './pages/marketing/CheckoutResult';
import { AccountHome } from './pages/account/AccountHome';
import { BillingPage } from './pages/account/BillingPage';
import { AccountSettings } from './pages/account/AccountSettings';

function LakeRedirect({ tab }: { tab?: 'surveys' }) {
  const { lakeId } = useParams();
  const target = lakeId ? `/lake/${lakeId}${tab ? `?tab=${tab}` : ''}` : '/search';
  return <Navigate to={target} replace />;
}

function SiteShell() {
  const location = useLocation();
  const hideNav = location.pathname === '/onboarding';

  return (
    <div className="flex min-h-dvh flex-col bg-castiq-blue-dark">
      <AppHeader />
      <main className={hideNav ? 'flex-1' : 'flex-1 pb-20 md:pb-8'}>
        <Outlet />
      </main>
      {!hideNav && <AppNav />}
    </div>
  );
}

function AuthenticatedShell() {
  return (
    <ProtectedRoute>
      <SiteShell />
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-in" element={<Navigate to="/login" replace />} />

        <Route element={<PublicMarketingLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/for-guides" element={<ForGuidesPage />} />
          <Route path="/legal/terms" element={<Terms />} />
          <Route path="/legal/privacy" element={<Privacy />} />
          <Route path="/legal/refunds" element={<RefundsPage />} />
          <Route path="/checkout/success" element={<CheckoutResult kind="success" />} />
          <Route path="/checkout/cancel" element={<CheckoutResult kind="cancel" />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AccountLayout />}>
          <Route path="/account" element={<AccountHome />} />
          <Route path="/account/billing" element={<BillingPage />} />
          <Route path="/account/settings" element={<AccountSettings />} />
        </Route>

        <Route element={<SiteShell />}>
          <Route path="/tactics" element={<Guides />} />
          <Route path="/guides" element={<Navigate to="/tactics" replace />} />
          <Route path="/social" element={<Social />} />
          <Route path="/border-waters" element={<BorderWaters />} />
          <Route path="/regulations" element={<Regulations />} />
          <Route path="/submit-report" element={<SubmitReport />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<AuthenticatedShell />}>
          <Route path="/app" element={<Navigate to="/search" replace />} />
          <Route path="/search" element={<LakeSearch />} />
          <Route path="/lake/:lakeId" element={<LakeDetail />} />
          <Route path="/lake/:lakeId/live" element={<LakeRedirect />} />
          <Route path="/lake/:lakeId/fisheries" element={<LakeRedirect tab="surveys" />} />
          <Route path="/lake/:lakeId/contours" element={<LakeRedirect />} />
          <Route path="/ice" element={<IceFishing />} />
          <Route path="/guide" element={<Navigate to="/search" replace />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
