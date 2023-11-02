// ** React Imports
import { createContext, useEffect, useState, ReactNode, useContext } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Axios

// ** Config


// ** Types

import { Storage } from "../services/storage";


export type AuthValuesType = {
  loading: boolean;
  logout: () => void;
  login: () => void;
  user: string | null;
  setLoading: (value: boolean) => void;
  setUser: (value: string | null) => void;
};


// ** Defaults
const defaultProvider:AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  logout: () => Promise.resolve(),
  login: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const storage = Storage.getInstance();

  // ** States
  const [user, setUser] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  // ** Hooks
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = storage.getSessionToken();
      console.log("sss")
      if (storedToken) {
        // setLoading(true)
        console.log("hello world");
        setUser(storedToken);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => {
    setUser("hello world");
    storage.setSessionToken("hello world");
    router.push("/");
  };

  const handleLogout = () => {
    setUser(null);
    storage.clearAllSession();
    router.push("/login");
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    logout: handleLogout,
    login: handleLogin
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };

export const useAuth = () => useContext(AuthContext);