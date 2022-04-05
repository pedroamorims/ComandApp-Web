import { Produto } from "./Produto";

export interface Categoria {

  id: number;
  descricao: string;
  ativo: boolean;
  iconURL: string;
  produtos: Produto[];

}
