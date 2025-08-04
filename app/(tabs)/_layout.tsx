import { Redirect, Slot } from "expo-router";
import React from "react";

const Layout = () => {
  const isAuthenticated = true;

  if(!isAuthenticated) return <Redirect href={'/(auth)/sign-in'}/>
  return <Slot />;
};

export default Layout;
