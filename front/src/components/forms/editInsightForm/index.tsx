import { showAlertError } from "@/components/alertError";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  createInsightFormSchema,
  type CreateInsightFormProps,
} from "@/interface/insightsSchema";
import { insighsService } from "@/service/insights.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { LoaderCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  counter: number;
  onClose: () => void;
  onCounter: () => void;
  id: string;
};

export const EditInsightForm = ({ onClose, onCounter, id, counter }: Props) => {
  const fetchInsight = async () => {
    try {
      const data = await insighsService.getOne(id);
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const errorMessage = (error.response.data as { message: string })
          .message;
        showAlertError(errorMessage);
      } else {
        showAlertError("An unexpected error occurred");
      }
    }
  };

  const { data, isLoading } = useQuery({
    queryFn: fetchInsight,
    queryKey: ["insights", id, counter],
    retry: false,
    staleTime: 1000 * 60 * 60,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateInsightFormProps>({
    resolver: zodResolver(createInsightFormSchema),
    defaultValues: {
      title: data?.title,
      description: data?.content,
    },
  });
  const [tags, setTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue("title", data?.title);
    setValue("description", data?.content);
    setTags(data?.tags.map((tag) => tag.name) || []);
  }, [data, setValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = inputRef.current;
    if (!input) return;

    const value = input.value.trim();

    if (e.key === "," && value !== "") {
      e.preventDefault();
      if (!tags.includes(value)) {
        setTags((prev) => [...prev, value]);
      }
      input.value = "";
    }
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: CreateInsightFormProps) => {
    try {
      await insighsService.update(id, {
        description: data.description,
        title: data.title,
        tags: tags,
      });
      onCounter();
      onClose();
    } catch (error) {
      console.log("error: ", error);
      if (isAxiosError(error) && error.response) {
        const errorMessage = (error.response.data as { message: string })
          .message;
        showAlertError(errorMessage);
      } else {
        showAlertError("An unexpected error occurred");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Editar Insight</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                {...register("title", { required: "Título é obrigatório" })}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                {...register("description", {
                  required: "Descrição é obrigatória",
                })}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tag">Tags</Label>
              <Input
                id="tag"
                ref={inputRef}
                onKeyDown={handleKeyDown}
                placeholder="Digite uma tag e pressione vírgula"
              />
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(index)}>
                      <X className="w-3 h-3 cursor-pointer" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Editar Insight
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
