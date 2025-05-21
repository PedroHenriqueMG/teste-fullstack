import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInSchema, type SignInSchema } from "@/interface/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });
  const navigate = useNavigate();

  const onSubmit = (data: SignInSchema) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
            <Button
              type="button"
              className="w-full"
              variant={"link"}
              onClick={() => navigate("/signup")}
            >
              Criar conta
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
