import { Categoria } from "./Categoria";

export interface Produto {

  id: number;
  nome: string;
  descricao: string;
  categoria: Categoria;
  dataCriacao: Date;
  dataAlteracao: Date;
  ativo : boolean;
  categoriaId: number;

}
