import { DataTable } from "@/components/dataTable";
import {
  createColumnHelper,
  type PaginationState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { LoaderCircle, Pencil, Trash2 } from "lucide-react";
import { isAxiosError } from "axios";
import { showAlertError } from "@/components/alertError";
import { useQuery } from "@tanstack/react-query";
import type { Insights } from "@/interface/insightsSchema";
import { insighsService } from "@/service/insights.service";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CreateInsightForm } from "@/components/forms/createInsighForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditInsightForm } from "@/components/forms/editInsightForm";

type Tag = {
  id: string;
  name: string;
};

export type Table = {
  id: string;
  title: string;
  content: string;
  userId: string;
  tags: Tag[];
};

const schema = z.object({
  name: z.string(),
});

type SchemaProps = z.infer<typeof schema>;

const columnHelper = createColumnHelper<Table>();

export const Home = () => {
  const { register, watch } = useForm<SchemaProps>({
    resolver: zodResolver(schema),
  });
  const name = watch("name");
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [count, setCount] = useState(0);
  const [createInsight, setCreateInsight] = useState(false);
  const [editInsight, setEditInsight] = useState(false);
  const [insightId, setInsightId] = useState("");

  const handleDelete = async (id: string) => {
    try {
      await insighsService.delete(id);
      setCount(count + 1);
    } catch (error) {
      if (isAxiosError(error)) {
        showAlertError(error.response?.data.message);
      }
    }
  };

  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => {
        return <div>{info.getValue()}</div>;
      },
    }),
    columnHelper.accessor("content", {
      header: "Content",
      cell: (info) => {
        return <div>{info.getValue()}</div>;
      },
    }),
    columnHelper.accessor("tags", {
      header: "Tags",
      cell: (info) => {
        const tags = info.getValue();
        return (
          <div className="flex gap-2">
            {tags.map((tag) => (
              <div key={tag.id}>{tag.name}</div>
            ))}
          </div>
        );
      },
    }),
    columnHelper.display({
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setInsightId(row.original.id);
                setEditInsight(true);
              }}
            >
              <Pencil />
            </button>
            <button type="button" onClick={() => handleDelete(row.original.id)}>
              <Trash2 />
            </button>
          </div>
        );
      },
    }),
  ];

  useEffect(() => {
    const timer = setTimeout(() => setSearch(name), 500);

    return () => {
      clearTimeout(timer);
    };
  }, [name]);

  const fetchInsights = async () => {
    try {
      const data = await insighsService.getAll({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        tag: search,
      });
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

  const { data, isLoading } = useQuery<Insights>({
    queryFn: fetchInsights,
    queryKey: [
      "insights",
      search,
      pagination.pageIndex,
      pagination.pageSize,
      count,
    ],
    retry: false,
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-4 p-4">
      <div className="flex justify-between gap-32">
        <Input placeholder="Filtre por tag" {...register("name")} />
        <Button onClick={() => setCreateInsight(true)}>Criar insight</Button>
      </div>
      <DataTable
        columns={columns}
        data={data?.insights || []}
        pagination={pagination}
        setPagination={setPagination}
        totalDocs={data?.total}
      />
      <Dialog open={createInsight} onOpenChange={setCreateInsight}>
        <DialogContent>
          <CreateInsightForm
            onClose={() => setCreateInsight(false)}
            onCounter={() => setCount(count + 1)}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={editInsight} onOpenChange={setEditInsight}>
        <DialogContent>
          <EditInsightForm
            id={insightId}
            counter={count}
            onClose={() => setEditInsight(false)}
            onCounter={() => setCount(count + 1)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
