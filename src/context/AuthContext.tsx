'use client';

import React, { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthContextType, LoginParams, RegisterParams, UserDataType } from "./type";
import { useTranslation } from "react-i18next";
import { loginAuth, logoutAuth, registerAuth } from "@/api/auth";
import { clearLocalUserData } from "@/lib/store";
import { toast } from "react-toastify";

const defaultProvider: AuthContextType = {
  loading: true,
  user: null,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => {},
  setUser: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultProvider);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handlerLogin = async ( params: LoginParams) => {
    setLoading(true);
    const username = params.email
    const password = params.password

    loginAuth({ username, password }).then((res) => {
      setUser(res.data);
      setLoading(false);
    }).catch((err) => {
      clearLocalUserData()
      setUser(null);
      setLoading(false);
    });
    
    toast.success(t("login.success"));
  };

  const handlerRegister = async (prop: RegisterParams) => {
    setLoading(true);
    //registerAuth();

    toast.success(t("register.success"));
  };

  const handlerLogout = () => {
    logoutAuth().then((res) => {
      clearLocalUserData()
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
    });
  };

  const values = {
    loading,
    user,
    login: handlerLogin,
    register : handlerRegister,
    logout : handlerLogout,
    setUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const AuthContextExports = { AuthContext, AuthContextProvider };
export default AuthContextExports;
