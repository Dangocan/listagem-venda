type TVendas = {
  id: number;
  nome: string;
  valor: number;
};

type TUpdateVendas = {
  id: number;
  nome?: string;
  valor?: number;
};

const mockVendas: TVendas[] = [
  {
    id: 1,
    nome: "Venda 1",
    valor: 100,
  },
  {
    id: 2,
    nome: "Venda 2",
    valor: 200,
  },
  {
    id: 3,
    nome: "Venda 3",
    valor: 300,
  },
];

const getVendas = async (): Promise<TVendas[]> => {
  return mockVendas;
};

const getVenda = async (id: number): Promise<TVendas | undefined> => {
  return mockVendas.find((venda) => venda.id === id);
};

const createVenda = async (venda: TVendas): Promise<TVendas> => {
  mockVendas.push(venda);
  return venda;
};

const updateVenda = async (venda: TUpdateVendas): Promise<TVendas> => {
  const index = mockVendas.findIndex((v) => v.id === venda.id);
  mockVendas[index] = { ...mockVendas[index], ...venda };
  return venda as TVendas;
};

const deleteVenda = async (id: number): Promise<void> => {
  const index = mockVendas.findIndex((v) => v.id === id);
  mockVendas.splice(index, 1);
};

export { getVendas, getVenda, createVenda, updateVenda, deleteVenda };
export type { TVendas, TUpdateVendas };
