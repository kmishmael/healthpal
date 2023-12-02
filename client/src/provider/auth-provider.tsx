import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthTokenProps = {
  accessToken: string;
  expires_in: number;
  message: string;
  status: string;
  token_type: string;
  user: {
    email: string;
    id: number;
    name: string;
  };
};

type AuthProps = {
  token: AuthTokenProps | null;
  setToken: (newToken: AuthTokenProps | null) => void;
};

const AuthContext = createContext<AuthProps>(undefined!);

function parse_token(token: string | null): AuthTokenProps | null {
  if (token != null) {
    return JSON.parse(token);
  }
  return null;
}
const AuthProvider = ({ children }: any) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(
    parse_token(localStorage.getItem("token"))
  );

  // Function to set the authentication token
  const setToken = (newToken: AuthTokenProps | null) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token["accessToken"]}`;
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
