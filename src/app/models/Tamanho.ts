import { Produto } from "./Produto";

export interface Tamanho {

  id: number;
  preco: number;
  descricao: string;
  produto: Produto;
  ativo : boolean;
  produtoId: number;

}
