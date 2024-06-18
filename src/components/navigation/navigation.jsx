import { useState } from "react";
import { Header } from "./header";
import { SideBar } from "./components";
import "./navigation.css";

export const Navigation = () => {

  return (
    <>
      <Header/>
      <SideBar/>
    </>
  );
};
