import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser({ username });
    localStorage.setItem("user", JSON.stringify({ username }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
