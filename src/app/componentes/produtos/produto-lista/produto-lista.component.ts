import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.scss']
})
export class ProdutoListaComponent implements OnInit {
  modalRef?: BsModalRef;
  message?: string;
  public produtos: Produto[] = [];
  public produtosFiltradas: Produto[] = [];
  categoria: Categoria;

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
        produto.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(private produtoService: ProdutoService, private modalService: BsModalService, private toastr: ToastrService, private spinner: NgxSpinnerService, private routerlink: Router,  private router: ActivatedRoute, private categoriaService: CategoriaService,) {}

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
    const categoriaIdParam = this.router.snapshot.queryParamMap.get('idCategoria');

    const observerProduto = {
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

    if (categoriaIdParam !== null) {
      this.produtoService.getProdutoByCategoria(+categoriaIdParam).subscribe(observerProduto);

      this.categoriaService.getCategoriaById(+categoriaIdParam).subscribe(
        (categoria: Categoria) => {
          this.categoria = { ...categoria };
        },
        (error: any) => {
          console.error(error);
        },
        () => {}
      );
    }
    else{
      this.produtoService.getProduto().subscribe(observerProduto);
      this.categoria.descricao = "Produtos";
    }

  }


  detalheproduto(id : number){
    this.routerlink.navigate([`produtos/detalhe/${id}`]);
  }


}
