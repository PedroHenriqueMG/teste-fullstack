import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const AuthorizeLayout = () => {
  const token = Cookies.get("auth_token");
  if (!token) {
    return <Navigate to="/signin" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};
