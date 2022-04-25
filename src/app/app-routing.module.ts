import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaDetalheComponent } from './componentes/categorias/categoria-detalhe/categoria-detalhe.component';
import { CategoriaListaComponent } from './componentes/categorias/categoria-lista/categoria-lista.component';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { ProdutoDetalheComponent } from './componentes/produtos/produto-detalhe/produto-detalhe.component';
import { ProdutoListaComponent } from './componentes/produtos/produto-lista/produto-lista.component';
import { ProdutosComponent } from './componentes/produtos/produtos.component';
import { TamanhoListaComponent } from './componentes/tamanhos/tamanho-lista/tamanho-lista.component';
import { TamanhosComponent } from './componentes/tamanhos/tamanhos.component';

const routes: Routes = [
  { path: 'categorias', redirectTo: 'categorias/lista' },
  {
    path: 'categorias',
    component: CategoriasComponent,
    children: [
      { path: 'detalhe/:id', component: CategoriaDetalheComponent },
      { path: 'lista', component: CategoriaListaComponent },
      { path: 'detalhe', component: CategoriaDetalheComponent },
    ],
  },

  { path: 'produtos', redirectTo: 'produtos/lista' },
  {
    path: 'produtos',
    component: ProdutosComponent,
    children: [
      { path: 'detalhe/:id', component: ProdutoDetalheComponent },
      { path: 'lista', component: ProdutoListaComponent },
      { path: 'lista?idCategoria=:id', component: ProdutoListaComponent },
      { path: 'detalhe', component: ProdutoDetalheComponent },
    ],
  },

  { path: 'tamanhos', redirectTo: 'tamanhos/lista' },
  {
    path: 'tamanhos',
    component: TamanhosComponent,
    children: [
      { path: 'lista', component: TamanhoListaComponent },
      { path: 'lista?idProduto=:id', component: TamanhoListaComponent },
    ],
  },
  { path: '', redirectTo: 'categorias/lista', pathMatch: 'full' },
  { path: '**', redirectTo: 'categorias/lista', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
