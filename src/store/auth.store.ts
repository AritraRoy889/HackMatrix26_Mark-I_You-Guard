import { create } from 'zustand';
import { User, AuthState, LoginCredentials, RegisterCredentials } from '../types/auth.types';

interface AuthStore extends AuthState
{
  login: ( credentials: LoginCredentials ) => Promise<boolean>;
  register: ( credentials: RegisterCredentials ) => Promise<boolean>;
  logout: () => void;
  updateUserPreferences: ( prefs: Partial<User[ 'preferences' ]> ) => void;
  updateProfile: ( profile: Partial<User> ) => void;
}

const DEFAULT_USER: User = {
  id: 'usr-admin-01',
  name: 'Alex Vance',
  email: 'alex.vance@youguard.security',
  role: 'admin',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  organization: 'Cyber Defense SOC',
  twoFactorEnabled: true,
  createdAt: '2025-01-15T00:00:00Z',
  lastLoginAt: new Date().toISOString(),
  preferences: {
    theme: 'dark',
    emailAlerts: true,
    criticalAlertsOnly: false,
    autoScanSavedDomains: true,
  },
};

const STORAGE_KEY = 'youguard_auth_user';

const loadStoredUser = (): User | null =>
{
  try
  {
    const raw = localStorage.getItem( STORAGE_KEY );
    return raw ? JSON.parse( raw ) : DEFAULT_USER;
  } catch
  {
    return DEFAULT_USER;
  }
};

export const useAuthStore = create<AuthStore>( ( set, get ) =>
{
  const initialUser = loadStoredUser();

  return {
    user: initialUser,
    token: initialUser ? 'yg-jwt-token-session-valid' : null,
    isAuthenticated: Boolean( initialUser ),
    isLoading: false,

    login: async ( credentials: LoginCredentials ) =>
    {
      set( { isLoading: true } );
      await new Promise( ( res ) => setTimeout( res, 600 ) );

      const loggedInUser: User = {
        ...DEFAULT_USER,
        email: credentials.email || DEFAULT_USER.email,
        name: credentials.email ? credentials.email.split( '@' )[ 0 ] : DEFAULT_USER.name,
        lastLoginAt: new Date().toISOString(),
      };

      localStorage.setItem( STORAGE_KEY, JSON.stringify( loggedInUser ) );
      set( {
        user: loggedInUser,
        token: 'yg-jwt-token-session-valid',
        isAuthenticated: true,
        isLoading: false,
      } );
      return true;
    },

    register: async ( credentials: RegisterCredentials ) =>
    {
      set( { isLoading: true } );
      await new Promise( ( res ) => setTimeout( res, 700 ) );

      const newUser: User = {
        id: `usr-${ Date.now() }`,
        name: credentials.name,
        email: credentials.email,
        role: 'member',
        organization: credentials.organization || 'Independent Analyst',
        twoFactorEnabled: false,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        preferences: {
          theme: 'dark',
          emailAlerts: true,
          criticalAlertsOnly: false,
          autoScanSavedDomains: true,
        },
      };

      localStorage.setItem( STORAGE_KEY, JSON.stringify( newUser ) );
      set( {
        user: newUser,
        token: 'yg-jwt-token-session-valid',
        isAuthenticated: true,
        isLoading: false,
      } );
      return true;
    },

    logout: () =>
    {
      localStorage.removeItem( STORAGE_KEY );
      set( {
        user: null,
        token: null,
        isAuthenticated: false,
      } );
    },

    updateUserPreferences: ( prefs ) =>
    {
      const current = get().user;
      if ( !current ) return;
      const updated: User = {
        ...current,
        preferences: { ...current.preferences, ...prefs },
      };
      localStorage.setItem( STORAGE_KEY, JSON.stringify( updated ) );
      set( { user: updated } );
    },

    updateProfile: ( profile ) =>
    {
      const current = get().user;
      if ( !current ) return;
      const updated: User = { ...current, ...profile };
      localStorage.setItem( STORAGE_KEY, JSON.stringify( updated ) );
      set( { user: updated } );
    },
  };
} );
