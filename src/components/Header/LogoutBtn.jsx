import React from "react";
import { useDispatch } from "react-redux";
import service from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    service.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className=" inline-block px-6 py-2 duration-200 font-mono text-xl m-2 items-center text-green-600 hover:bg-green-500 hover:text-white rounded-full  border border-green-500"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
