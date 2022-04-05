import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  modalRef?: BsModalRef;
  message?: string;
  public produtos: Produto[] = [];
  public produtosFiltradas: Produto[] = [];

  private _filtroLista = '';

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.produtosFiltradas = this.filtroLista
      ? this.filtrarprodutos(this.filtroLista)
      : this.produtos;
  }

  private filtrarprodutos(filtrarPor: string): Produto[] {
    filtrarPor = filtrarPor.toLowerCase();
    return this.produtos.filter(
      (produto: any) =>
        produto.categoria.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(private produtoService: ProdutoService, private modalService: BsModalService, private toastr: ToastrService, private spinner: NgxSpinnerService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.message = 'Deletado!';
    this.modalRef?.hide();
    this.toastr.success('A produto foi deletada com sucesso', 'Deletado');
  }

  decline(): void {
    this.message = 'Apagado!';
    this.modalRef?.hide();
    this.toastr.error('', 'Erro ao deletar');
  }

  showError() {
    this.toastr.success('Falha ao conectar no servidor', 'Servidor Desconectado');
  }

  public ngOnInit(): void {
    this.spinner.show();


    this.getprodutos();
  }

  private getprodutos(): void {
    const observer = {
      next: (_produtos: Produto[]) => {
        this.produtos = _produtos;
        this.produtosFiltradas = this.produtos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar as produtos','Erro')
      },
      complete: () => this.spinner.hide()
    };

    this.produtoService.getProduto().subscribe(observer);
  }
}



