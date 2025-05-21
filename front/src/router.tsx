import { Route, Routes } from "react-router-dom";
import { Signin } from "./page/signin";
import { Signup } from "./page/signup";
import { AuthorizeLayout } from "./layout/authorizeLayout";
import { Home } from "./page/home";

export const Router = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<AuthorizeLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};
