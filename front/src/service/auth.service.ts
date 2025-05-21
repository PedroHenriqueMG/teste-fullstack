import { api } from "@/api/api";
import type { SignInSchema, SignUpSchema } from "@/interface/authSchema";

class AuthService {
  async register(data: SignUpSchema) {
    const response = await api.post("/auth/signup", data);

    return response.data;
  }
  async login(data: SignInSchema) {
    const response = await api.post("/auth/signin", data);
    return response.data.token;
  }

  async getUser() {
    const response = await api.get("/auth/me");
    return response.data;
  }
}

export const authService = new AuthService();
