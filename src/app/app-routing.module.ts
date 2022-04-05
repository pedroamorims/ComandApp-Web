import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { ProdutosComponent } from './componentes/produtos/produtos.component';

const routes: Routes = [
  {path: 'categorias', component: CategoriasComponent},
  {path: 'produtos', component: ProdutosComponent},
  {path: '', redirectTo:'categorias', pathMatch: 'full'},
  {path: '**', redirectTo:'categorias', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
