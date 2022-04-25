import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { ProdutosComponent } from './componentes/produtos/produtos.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from './services/categoria.service';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { TitulosComponent } from './shared/titulos/titulos.component';
import { ProdutoService } from './services/produto.service';
import { CategoriaDetalheComponent } from './componentes/categorias/categoria-detalhe/categoria-detalhe.component';
import { CategoriaListaComponent } from './componentes/categorias/categoria-lista/categoria-lista.component';
import { ProdutoDetalheComponent } from './componentes/produtos/produto-detalhe/produto-detalhe.component';
import { ProdutoListaComponent } from './componentes/produtos/produto-lista/produto-lista.component';
import { TamanhoListaComponent } from './componentes/tamanhos/tamanho-lista/tamanho-lista.component';
import { TamanhosComponent } from './componentes/tamanhos/tamanhos.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoriasComponent,
    ProdutosComponent,
    TamanhosComponent,
    TitulosComponent,
      NavComponent,
      CategoriaDetalheComponent,
      CategoriaListaComponent,
      ProdutoDetalheComponent,
      ProdutoListaComponent,
      TamanhoListaComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 50000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CategoriaService, ProdutoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
