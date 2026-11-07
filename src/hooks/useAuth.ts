import { useAuthStore } from '../store/auth.store';

export function useAuth ()
{
  const { user, token, isAuthenticated, isLoading, login, register, logout, updateUserPreferences, updateProfile } =
    useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUserPreferences,
    updateProfile,
    isAdmin: user?.role === 'admin',
    isAnalyst: user?.role === 'analyst' || user?.role === 'admin',
  };
}
