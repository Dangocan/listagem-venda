"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getVendas, TVendas } from "@/utils/MockVendas";
import { useEffect, useState } from "react";

export default function Sales() {
  const [data, setData] = useState<TVendas[]>([]);

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
    <div className="flex items-center justify-center w-full h-full">
      <DataTable columns={columns(handleUpdate, handleDelete)} data={data} />
    </div>
  );
}
