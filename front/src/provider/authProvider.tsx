import { api } from "@/api/api";
import { showAlertError } from "@/components/alertError";
import Cookies from "js-cookie";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  function initializeAuthState() {
    const token = Cookies.get("auth_token");

    if (token) {
      try {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
      } catch (error) {
        showAlertError(String(error));
      }
    }
  }

  initializeAuthState();

  return <>{children}</>;
}
