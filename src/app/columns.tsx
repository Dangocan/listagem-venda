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

export const columns = (
  onUpdate: (updatedVenda: TVendas) => void,
  onDelete: (id: number) => void
): ColumnDef<TVendas>[] => [
  {
    accessorKey: "Id",
    header: "ID",
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
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  await deleteVenda(venda.id);
                  onDelete(venda.id);
                }}
              >
                <span className="text-red-600">Exluir</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
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
                  }}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
