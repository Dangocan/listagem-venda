"use client";

import * as React from "react";

import { Label } from "@/components/ui/label";
import { getVendas, TVendas, createVenda } from "@/utils/MockVendas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Sales() {
  const [data, setData] = React.useState<TVendas[]>([]);
  const [nome, setNome] = React.useState("");
  const [valor, setValor] = React.useState(0);
  const [id, setId] = React.useState(0);

  React.useEffect(() => {
    getVendas().then((vendas) => setData(vendas));
  }, []);

  React.useEffect(() => {
    if (data.length > 0) {
      const existingIds = data.map((venda) => venda.id).sort((a, b) => a - b);
      let newId = 1;

      for (let i = 0; i < existingIds.length; i++) {
        if (existingIds[i] !== newId) {
          break;
        }
        newId++;
      }

      setId(newId);
    } else {
      setId(1);
    }
  }, [data]);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-2xl font-bold">Nova Venda</h1>
          <div className="grid gap-8 py-4">
            <div className="grid grid-cols-8 items-center gap-4">
              <Label htmlFor="nome" className="text-right text-lg">
                Nome
              </Label>
              <Input
                id="nome"
                value={nome}
                className="col-span-6"
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-8 items-center gap-4">
              <Label htmlFor="valor" className="text-right text-lg">
                Valor
              </Label>
              <Input
                id="valor"
                value={valor}
                type="number"
                className="col-span-6"
                onChange={(e) =>
                  e.target.value
                    ? setValor(parseFloat(e.target.value))
                    : setValor(0)
                }
              />
            </div>
          </div>
          <Button
            type="button"
            className="mt-4"
            onClick={async () => {
              const createdVenda = await createVenda({
                id: id,
                nome,
                valor,
              });
            }}
          >
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
}
