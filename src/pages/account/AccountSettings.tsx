import { Link } from 'react-router-dom';
import { signOutUser } from '../../services/auth';
import { useAuth } from '../../hooks/useAuth';
import { usePageMeta } from '../../marketing/meta';
import { useState } from 'react';

export function AccountSettings() {
  usePageMeta('Account settings', 'CastIQ account settings.', '/account/settings');
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="mt-3 text-sm text-castiq-muted">
        Profile details, favorites, and alert preferences stay on the existing profile page so they are not edited in two places.
      </p>
      <p className="mt-2 text-sm">Signed in as {user?.email}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/profile" className="ciq-btn-primary">Edit profile</Link>
        <Link to="/login" state={{ from: '/account/settings' }} className="ciq-btn-secondary">Password help is on the sign-in page</Link>
        <button
          type="button"
          className="ciq-btn-secondary"
          onClick={() => {
            void signOutUser().catch(() => setError('Sign out failed. You are still signed in.'));
          }}
        >
          Sign out
        </button>
      </div>
      {error ? <p className="mt-3 text-sm text-castiq-red" role="alert">{error}</p> : null}
    </div>
  );
}
