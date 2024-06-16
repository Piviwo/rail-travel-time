import { useState } from "react";
import { Header } from "./header";
import { SideBar } from "./components";
import "./navigation.css";

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
