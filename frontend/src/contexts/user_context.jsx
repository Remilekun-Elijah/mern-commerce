import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  let __user = localStorage.getItem("user")
  if(__user) __user = JSON.parse(__user)
  const [myUser, setMyUser] = useState(__user);

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem('token')
  },
    [loading, setLoading] = useState(false),
    [loginPayload, setLoginPayload] = useState({ email: "", password: "" }),
    [signUpPayload, setSignUpPayload] = useState({
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
      phone: "",
    });

  function resetForm(type) {
    if (type === "signup") {
      setSignUpPayload({
        email: "",
        password: "",
        confirmPassword: "",
        userName: "",
        phone: "",
      });
    } else setLoginPayload({ email: "", password: "" });
  }

  return (
    <UserContext.Provider
      value={{
        logout,
        myUser,
        loading,
        setLoading,
        loginPayload,
        setLoginPayload,
        signUpPayload,
        setSignUpPayload,
        resetForm,
        setMyUser,
        token: localStorage.getItem("token")
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
