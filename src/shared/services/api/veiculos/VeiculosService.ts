import { Api } from "../axios-config";
import { Environment } from "../../../environment";

export interface IListagemVeiculo {
  id: number;
  usuario: string;
  placa: string;
  entrada?: string;
}

interface IDetalhesVeiculo {
  id: number;
  usuario: string;
  placa: string;
  entrada?: string;
}

type TVeiculosComTotalCount = {
  data: IListagemVeiculo[];
  totalCount: number;
};

const getAll = async (page = 1, filter = ""): Promise<TVeiculosComTotalCount | Error> => {
  try {
    const urlRelativa = `/veiculos?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&usuario_like=${filter}`;

    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers["x-total-count"] || Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error("Erro ao listar os registros.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros."
    );
  }
};
const getById = async (id: number): Promise<IDetalhesVeiculo | Error> => {
  try {
    const { data } = await Api.get(`/veiculos/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao consultar o registro."
    );
  }
};
const create = async (dados: Omit<IDetalhesVeiculo, "id">): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalhesVeiculo>("/veiculos", dados);

    if (data) {
      return data.id;
    }

    return new Error("Erro ao criar o registro.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
};
const updateById = async (
  id: number,
  dados: Omit<IDetalhesVeiculo, "id" | "entrada">
): Promise<void | Error> => {
  try {
    await Api.patch(`/veiculos/${id}`, dados);
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar o registro."
    );
  }
};
const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/veiculos/${id}`);
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao apagar o registro."
    );
  }
};

export const VeiculosService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
