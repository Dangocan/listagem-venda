"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TVendas, updateVenda, deleteVenda } from "@/utils/MockVendas";
import { MoreHorizontal } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "sonner";
import { toast } from "sonner";

export const columns = (
  onUpdate: (updatedVenda: TVendas) => void,
  onDelete: (id: number) => void
): ColumnDef<TVendas>[] => [
  {
    accessorKey: "Id",
    header: "ID",
    cell: ({ row }) => row.original.id.toString(),
  },
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("valor"));
      const formatted = new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return formatted;
    },
  },
  {
    header: "Ações",
    id: "actions",
    cell: ({ row }) => {
      const venda = row.original;
      const [nome, setNome] = React.useState(venda.nome);
      const [valor, setValor] = React.useState(venda.valor);
      const [isDialogOpen, setIsDialogOpen] = React.useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
                Editar venda
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  await deleteVenda(venda.id);
                  onDelete(venda.id);
                  toast("Venda excluida com sucesso", {
                    description: `Venda ${nome} no valor de R$ ${valor}`,
                  });
                }}
              >
                <span className="text-red-600">Exluir</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Editar Venda</DialogTitle>
                <DialogDescription>
                  Faça mudanças na venda. Clique em salvar quando você
                  finalizar.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nome" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="nome"
                    value={nome}
                    className="col-span-3"
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="valor" className="text-right">
                    Valor
                  </Label>
                  <Input
                    id="valor"
                    value={valor}
                    type="number"
                    className="col-span-3"
                    onChange={(e) =>
                      e.target.value
                        ? setValor(parseFloat(e.target.value))
                        : setValor(0)
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  onClick={async () => {
                    const updatedVenda = await updateVenda({
                      id: venda.id,
                      nome,
                      valor,
                    });
                    onUpdate(updatedVenda);
                    setIsDialogOpen(false);
                    toast("Venda editada com sucesso", {
                      description: `Venda ${nome} no valor de R$ ${valor}`,
                    });
                  }}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Toaster theme="dark" />
        </>
      );
    },
  },
];
