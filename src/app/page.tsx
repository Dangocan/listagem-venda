"use client";

import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getVendas, TVendas } from "@/utils/MockVendas";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

export default function Sales() {
  const [data, setData] = useState<TVendas[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const vendas = await getVendas();
      setData(vendas);
    };
    fetchData();
  }, []);

  const handleUpdate = (updatedVenda: TVendas) => {
    setData((prevData) =>
      prevData.map((venda) =>
        venda.id === updatedVenda.id ? updatedVenda : venda
      )
    );
  };

  const handleDelete = (id: number) => {
    setData((prevData) => prevData.filter((venda) => venda.id !== id));
  };

  return (
    <div className="flex flex-col items-start justify-center w-[90%] h-full ml-[5%]">
      <Button className="mb-4" onClick={() => router.push("/nova-venda")}>
        Novo
      </Button>
      <DataTable columns={columns(handleUpdate, handleDelete)} data={data} />
    </div>
  );
}
