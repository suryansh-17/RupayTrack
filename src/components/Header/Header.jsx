import React from "react";
import { Logo, LogoutBtn } from "../../components";
import { useSelector } from "react-redux";
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  return (
    <header>
      <div className="bg-red-300 flex">
        <Logo />
        <span>Rupaya Track</span>
        {authStatus && <LogoutBtn />}
      </div>
    </header>
  );
}

export default Header;
