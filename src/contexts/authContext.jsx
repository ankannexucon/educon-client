import React, { createContext, useContext, useState, useEffect } from "react";
import { getCookie, removeCookie, setCookie } from "../utils/cookieUtil";
// import PageLoadingComponent from "../components/PageLoadingComponent";
// import { getUserApi } from "../api/accountApi";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [verifiedError, setVerifiedError] = useState(false);
  const [userDetails, setUserDetails] = useState({ role: "student" });

  // const userInfo = async (token) => {
  //   if (!token) return;
  //   const result = await getUserApi(token);
  //   if (!result?.verified) {
  //     setVerifiedError(true);
  //     setUserDetails(result);
  //   } else {
  //     setVerifiedError(false);
  //     setUserDetails(result?.data);
  //   }
  // };

  // Check website containing cookie
  useEffect(() => {
    setIsLoading(true);
    const cookie = getCookie("AUTH-EDUCON");
    if (cookie) {
      setUserDetails(JSON.parse(cookie));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Log in the user by setting the cookie

  // const notVerified = () => {
  //   setVerifiedError(true);
  // };

  const login = (user) => {
    setUserDetails(user);
    setIsAuthenticated(true);
    setCookie("AUTH-EDUCON", JSON.stringify(user));
    // setCookie("authToken", token, { secure: true });
    // setIsAuthenticated(true);
    // userInfo(token);
  };

  // // Log out the user by removing the cookie
  const logout = () => {
    setIsAuthenticated(false);
    setUserDetails({});
    removeCookie("AUTH-EDUCON");
    // removeCookie("authToken");
    // setIsAuthenticated(false);
  };

  // Provide the auth state and functions to the rest of the app
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user: userDetails,
        setUserDetails,
        logout,
        login,
      }}
    >
      {!isLoading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
