import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/models/Produto';
import { TamanhoService } from 'src/app/services/tamanho.service';
import { Tamanho } from 'src/app/models/Tamanho';
import { ProdutoService } from 'src/app/services/produto.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-tamanho-lista',
  templateUrl: './tamanho-lista.component.html',
  styleUrls: ['./tamanho-lista.component.scss'],
})
export class TamanhoListaComponent implements OnInit {
  form: FormGroup;
  modalRef?: BsModalRef;
  message?: string;
  public tamanhos: Tamanho[] = [];
  public tamanhosFiltradas: Tamanho[] = [];
  produto: Produto;
  tamanho: any = {};
  modoedicao: boolean;
  modoinsercao: boolean;
  produtoIdparam : any;

  get f(): any {
    return this.form.controls;
  }

  private _filtroLista = '';

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.tamanhosFiltradas = this.filtroLista
      ? this.filtrartamanhos(this.filtroLista)
      : this.tamanhos;
  }

  private filtrartamanhos(filtrarPor: string): Tamanho[] {
    filtrarPor = filtrarPor.toLowerCase();
    return this.tamanhos.filter(
      (tamanho: any) =>
        tamanho.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(
    private fb: FormBuilder,
    private tamanhoservice: TamanhoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private routerlink: Router,
    private router: ActivatedRoute,
    private produtoService: ProdutoService
  ) {}

  public ngOnInit(): void {
    this.spinner.show();
    this.validation();
    this.gettamanhos();

    this.modoedicao = false;
    this.modoinsercao = false;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
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
    this.toastr.success(
      'Falha ao conectar no servidor',
      'Servidor Desconectado'
    );
  }

  private gettamanhos(): void {
    this.produtoIdparam = this.router.snapshot.queryParamMap.get('idProduto');

    const observerProduto = {
      next: (_tamanhos: Tamanho[]) => {
        this.tamanhos = _tamanhos;
        this.tamanhosFiltradas = this.tamanhos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar as tamanhos', 'Erro');
      },
      complete: () => this.spinner.hide(),
    };

    if (this.produtoIdparam !== null) {
      this.tamanhoservice
        .getTamanhoByProduto(+this.produtoIdparam)
        .subscribe(observerProduto);

      this.produtoService.getProdutoById(+this.produtoIdparam).subscribe(
        (produto: Produto) => {
          this.produto = { ...produto };
        },
        (error: any) => {
          console.error(error);
        },
        () => {}
      );
    } else {
      this.tamanhoservice.getTamanho().subscribe(observerProduto);
      this.produto.descricao = 'produtos';
    }
  }

  detalheproduto(id: number) {
    this.routerlink.navigate([`tamanhos/detalhe/${id}`]);
  }

  public validation(): void {
    this.form = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(5)]],
      preco: ['', Validators.required],
    });
  }

  public cssvalidator(campoform: FormControl): any {

    return { 'is-invalid': campoform.errors && campoform.touched };
  }

  public editar(i : any) {
    this.modoedicao = true;
  }

  public adicionar() {
    this.modoinsercao = true;
  }

  public salvartamanho(){
    this.modoinsercao = false;
  }

 /*angular public validaedicao(i : number) : boolean{
    if(i === this.registroemedicao){
      console.log(true)
      return true;
    }
    else{
      console.log(false)
      return false;
    }
  }*/

  public salvarAlteracao(): void {
    this.spinner.show();

    if (this.form.valid) {
      this.tamanho = { ...this.form.value };
      this.tamanho.ativo = true;
      this.tamanho.produtoId = this.produtoIdparam;

      this.tamanhoservice.postTamanho(this.tamanho).subscribe(
        () => this.toastr.success('tamanho Salvo com Sucesso!', 'Sucesso!'),
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Erro ao salvar tamanho', 'Erro');
        },
        () => {
          this.spinner.hide();
          this.modoinsercao = false;
          this.form.reset();
          this.gettamanhos();
        }
      );
    }
  }

  public cancelarAlteracao() {
    this.modoinsercao = false;
  }
}
