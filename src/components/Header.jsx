import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header>
      <nav className='header'>
        {["Encode", "Decode", "Hack"].map((path) => {
          const urlPath = `/${path.toLowerCase()}`;

          return (
            <Link
              key={path}
              className={pathname === urlPath ? "active" : ""}
              to={urlPath}
            >
              {path}
            </Link>
          );
        })}

        <a href='https://github.com/DevCrusader/CaesarCipher/' target='_blank'>
          Code
        </a>
      </nav>
    </header>
  );
};

export default Header;
