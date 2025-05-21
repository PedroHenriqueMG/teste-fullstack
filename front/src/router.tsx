import { Route, Routes } from "react-router-dom";
import { Signin } from "./page/signin";
import { Signup } from "./page/signup";

export const Router = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};
