type TVendas = {
  id: number;
  nome: string;
  valor: number;
};

type TUpdateVendas = {
  id?: number;
  nome?: string;
  valor?: number;
};

export const mockVendas: TVendas[] = [
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

export const getVendas = async (): Promise<TVendas[]> => {
  return mockVendas;
};

export const getVenda = async (id: number): Promise<TVendas | undefined> => {
  return mockVendas.find((venda) => venda.id === id);
};

export const createVenda = async (venda: TVendas): Promise<TVendas> => {
  mockVendas.push(venda);
  return venda;
};

export const updateVenda = async (venda: TUpdateVendas): Promise<TVendas> => {
  const index = mockVendas.findIndex((v) => v.id === venda.id);
  mockVendas[index] = { ...mockVendas[index], ...venda };
  return venda as TVendas;
};

export const deleteVenda = async (id: number): Promise<void> => {
  const index = mockVendas.findIndex((v) => v.id === id);
  mockVendas.splice(index, 1);
};
