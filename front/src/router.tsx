import { Route, Routes } from "react-router-dom";
import { Signin } from "./page/signin";
import { Signup } from "./page/signup";
import { AuthorizeLayout } from "./layout/authorizeLayout";
import { Home } from "./page/home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./provider/authProvider";

export const Router = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<AuthorizeLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
};
