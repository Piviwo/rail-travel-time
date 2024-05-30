import { useState } from "react";
import "./navigation.css";
import { Header } from "./header";
import { SideBar } from "./components";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <SideBar isMenuOpen={isMenuOpen} />
    </>
  );
};
