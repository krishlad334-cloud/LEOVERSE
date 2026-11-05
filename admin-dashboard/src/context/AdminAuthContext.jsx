/* oxlint-disable react/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  isFirebaseConfigured,
} from '../services/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const AdminAuthContext = createContext(null);

const DEMO_ADMIN = {
  uid: 'demo_admin_001',
  email: 'admin@leoverse.com',
  displayName: 'Studio Admin',
  role: 'superadmin',
};

const LOCAL_AUTH_KEY = 'leoverse_admin_auth_user';

export function AdminAuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_AUTH_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && (!parsed.displayName || parsed.displayName.includes('Curator'))) {
          parsed.displayName = 'Studio Admin';
          localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(parsed));
        }
        return parsed;
      }
      return DEMO_ADMIN;
    } catch {
      return DEMO_ADMIN;
    }
  });
  const [loading, setLoading] = useState(() => Boolean(auth && isFirebaseConfigured));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (auth && isFirebaseConfigured) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const adminObj = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email.split('@')[0],
            role: 'admin',
          };
          setCurrentUser(adminObj);
          localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(adminObj));
        } else {
          // If we had a real firebase user that signed out
          setCurrentUser((prev) => {
            if (prev && !prev.isDemo) {
              localStorage.removeItem(LOCAL_AUTH_KEY);
              return null;
            }
            return prev;
          });
        }
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, []);

  const login = async (email, password) => {
    setError(null);

    // If live Firebase auth is active
    if (auth && isFirebaseConfigured) {
      try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const adminObj = {
          uid: cred.user.uid,
          email: cred.user.email,
          displayName: cred.user.displayName || email.split('@')[0],
          role: 'admin',
        };
        setCurrentUser(adminObj);
        localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(adminObj));
        return { success: true };
      } catch (err) {
        console.warn('[Firebase Auth] Sign in error:', err.message);
        // If password matches fallback admin pass
        if (password === 'leoverse-studio' || password === 'admin123') {
          const adminObj = {
            uid: 'admin_local_' + Date.now(),
            email: email,
            displayName: email.split('@')[0],
            role: 'admin',
            isDemo: true,
          };
          setCurrentUser(adminObj);
          localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(adminObj));
          return { success: true };
        }
        setError(err.message);
        return { success: false, error: err.message };
      }
    }

    // Offline / Demo fallback
    if (password === 'leoverse-studio' || password === 'admin123' || email.includes('admin')) {
      const adminObj = {
        ...DEMO_ADMIN,
        email: email || DEMO_ADMIN.email,
        isDemo: true,
      };
      setCurrentUser(adminObj);
      localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(adminObj));
      return { success: true };
    }

    setError('Invalid credentials. (Hint: Use password "leoverse-studio" for instant access)');
    return { success: false, error: 'Invalid admin credentials' };
  };

  const loginDemo = () => {
    const adminObj = { ...DEMO_ADMIN, isDemo: true };
    setCurrentUser(adminObj);
    localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(adminObj));
    return { success: true };
  };

  const logout = async () => {
    if (auth && isFirebaseConfigured) {
      try {
        await signOut(auth);
      } catch (e) {
        console.error('Sign out failed:', e);
      }
    }
    setCurrentUser(null);
    localStorage.removeItem(LOCAL_AUTH_KEY);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        currentUser,
        loading,
        error,
        login,
        loginDemo,
        logout,
        isAuthenticated: Boolean(currentUser),
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
