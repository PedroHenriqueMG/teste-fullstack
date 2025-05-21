import { showAlertError } from "@/components/alertError";
import { showAlertSuccess } from "@/components/alertSuccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SignUpSchema } from "@/interface/authSchema";
import { signUpSchema } from "@/interface/authSchema";
import { authService } from "@/service/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpSchema) => {
    try {
      await authService.register(data);
      showAlertSuccess("Cadastro realizado com sucesso");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const errorMessage = (error.response.data as { resposta: string })
          .resposta;
        showAlertError(errorMessage);
      } else {
        showAlertError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Cadastro</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" {...register("name")} required />
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" {...register("email")} type="email" required />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                {...register("password")}
                type="password"
                required
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full">
              Cadastrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
