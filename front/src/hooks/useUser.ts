import { api } from "@/api/api";
import type { SignInSchema } from "@/interface/authSchema";
import { authService } from "@/service/auth.service";
import Cookies from "js-cookie";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface User {
  id?: string;
  name?: string;
  email?: string;
}
interface UserState {
  user?: User;
  login: (data: SignInSchema) => Promise<void>;
  logout: () => void;
}

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      user: {},
      login: async (data) => {
        const token = await authService.login(data);

        if (token) {
          Cookies.set("auth_token", token, {
            expires: 1,
            secure: true,
          });

          api.defaults.headers.common.Authorization = `Bearer ${token}`;

          const user = await authService.getUser();
          set({
            user: {
              id: user.id,
              name: user?.name,
              email: user?.email,
            },
          });
        }
      },
      logout: () => {
        Cookies.remove("auth_token");
        set({ user: {} });
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
