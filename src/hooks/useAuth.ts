import { useState, useEffect, useCallback } from "react";
import { getCurrentUser, login as authLogin, register as authRegister, logout as authLogout, socialLogin as authSocialLogin } from "@/lib/auth";
import type { User } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(() => {
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    const handler = () => refresh();
    window.addEventListener("tyfenix_auth_change", handler);
    return () => window.removeEventListener("tyfenix_auth_change", handler);
  }, [refresh]);

  const dispatchChange = () => {
    window.dispatchEvent(new Event("tyfenix_auth_change"));
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = authLogin(email, password);
    if (result.success && result.user) {
      setUser(result.user);
      dispatchChange();
    }
    setLoading(false);
    return result;
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const result = authRegister(name, email, password, phone);
    if (result.success && result.user) {
      setUser(result.user);
      dispatchChange();
    }
    setLoading(false);
    return result;
  };

  const logout = () => {
    authLogout();
    setUser(null);
    dispatchChange();
  };

  const socialLogin = async (provider: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const result = authSocialLogin(provider);
    if (result.success && result.user) {
      setUser(result.user);
      dispatchChange();
    }
    setLoading(false);
    return result;
  };

  return { user, loading, login, register, logout, socialLogin, refresh };
}
