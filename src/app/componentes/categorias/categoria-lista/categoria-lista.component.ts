import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categoria-lista',
  templateUrl: './categoria-lista.component.html',
  styleUrls: ['./categoria-lista.component.scss'],
})
export class CategoriaListaComponent implements OnInit {
  modalRef?: BsModalRef;
  message?: string;
  public categorias: Categoria[] = [];
  public categoriasFiltradas: Categoria[] = [];

  private _filtroLista = '';

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.categoriasFiltradas = this.filtroLista
      ? this.filtrarCategorias(this.filtroLista)
      : this.categorias;
  }

  private filtrarCategorias(filtrarPor: string): Categoria[] {
    filtrarPor = filtrarPor.toLowerCase();
    return this.categorias.filter(
      (categoria: any) =>
        categoria.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(
    private categoriaService: CategoriaService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.spinner.show();

    this.getCategorias();
  }

  private getCategorias(): void {
    
    const observer = {
      next: (_categorias: Categoria[]) => {
        this.categorias = _categorias;
        this.categoriasFiltradas = this.categorias;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar as categorias', 'Erro');
      },
      complete: () => this.spinner.hide(),
    };

    this.categoriaService.getCategoria().subscribe(observer);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Deletado!';
    this.modalRef?.hide();
    this.toastr.success('A Categoria foi deletada com sucesso', 'Deletado');
  }

  decline(): void {
    this.message = 'Apagado!';
    this.modalRef?.hide();
    this.toastr.error('', 'Erro ao deletar');
  }

  showError() {
    this.toastr.success(
      'Falha ao conectar no servidor',
      'Servidor Desconectado'
    );
  }

  detalhecategoria(id : number){
    this.router.navigate([`categorias/detalhe/${id}`]);
  }

}
