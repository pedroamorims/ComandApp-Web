import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaDetalheComponent } from './componentes/categorias/categoria-detalhe/categoria-detalhe.component';
import { CategoriaListaComponent } from './componentes/categorias/categoria-lista/categoria-lista.component';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { ProdutosComponent } from './componentes/produtos/produtos.component';

const routes: Routes = [
  {path: 'categorias', redirectTo: 'categorias/lista'},
  {
    path: 'categorias',
    component: CategoriasComponent,
    children: [
      { path: 'detalhe/:id', component: CategoriaDetalheComponent },
      { path: 'lista', component: CategoriaListaComponent },
      { path: 'detalhe', component: CategoriaDetalheComponent },
    ],
  },
  { path: 'produtos', component: ProdutosComponent },
  { path: '', redirectTo: 'categorias', pathMatch: 'full' },
  { path: '**', redirectTo: 'categorias', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
