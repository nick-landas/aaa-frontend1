import React from "react";
import { NavLink } from "react-router-dom";

export const NavBarBrand = () => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/">
        <img
          className="nav-bar__logo"
          src="https://gistcdn.githack.com/nick-landas/2f536bd3ca55921598c015c1d51aa421/raw/95869e09e7cc04bab530fe125b38f1d4a9316f4d/sun2.svg"
          alt="Beach logo"
          width="122"
          height="36"
        />
      </NavLink>
    </div>
  );
};
