import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api, { API_BASE_URL } from "../lib/api.js";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("pf_access_token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  const isAuthenticated = Boolean(token && user);

  const saveSession = (authResponse) => {
    localStorage.setItem("pf_access_token", authResponse.accessToken);
    setToken(authResponse.accessToken);
    setUser(authResponse.user);
  };

  const register = async (payload) => {
    const response = await api.post("/api/auth/register", payload);
    saveSession(response.data);
    return response.data;
  };

  const login = async (payload) => {
    const response = await api.post("/api/auth/login", payload);
    saveSession(response.data);
    return response.data;
  };

  const loadCurrentUser = async () => {
    if (!localStorage.getItem("pf_access_token")) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/api/auth/me");
      setUser(response.data);
    } catch {
      localStorage.removeItem("pf_access_token");
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const acceptOAuthToken = async (oauthToken) => {
    localStorage.setItem("pf_access_token", oauthToken);
    setToken(oauthToken);

    const response = await api.get("/api/auth/me");
    setUser(response.data);
  };

  const logout = () => {
    localStorage.removeItem("pf_access_token");
    setToken(null);
    setUser(null);
  };

  const startOAuth = (provider) => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/${provider}`;
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated,
      register,
      login,
      logout,
      startOAuth,
      acceptOAuthToken,
    }),
    [token, user, loading, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };