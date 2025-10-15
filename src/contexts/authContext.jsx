import React, { createContext, useContext, useState, useEffect } from "react";
// import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";
// import PageLoadingComponent from "../components/PageLoadingComponent";
// import { getUserApi } from "../api/accountApi";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [verifiedError, setVerifiedError] = useState(false);
  const [userDetails, setUserDetails] = useState({ role: "agency" });

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
  // useEffect(() => {
  //   const token = getCookie("authToken");
  //   if (token) {
  //     setIsAuthenticated(true);
  //     userInfo(token);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  //   setIsLoading(false);
  // }, []);

  // Log in the user by setting the cookie

  // const notVerified = () => {
  //   setVerifiedError(true);
  // };

  // const login = (token) => {
  //   setCookie("authToken", token, { secure: true });
  //   setIsAuthenticated(true);
  //   userInfo(token);
  // };

  // // Log out the user by removing the cookie
  // const logout = () => {
  //   removeCookie("authToken");
  //   setIsAuthenticated(false);
  // };

  // Provide the auth state and functions to the rest of the app
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(
          userDetails && Object.values(userDetails).length
        ),
        user: userDetails,
      }}
    >
      {!isLoading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
