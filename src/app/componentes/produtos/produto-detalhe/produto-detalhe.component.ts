import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/Categoria';
import { Produto } from 'src/app/models/Produto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.scss'],
})
export class ProdutoDetalheComponent implements OnInit {
  form: FormGroup;
  produto: Produto;
  categoria: Categoria;
  public categorias: Categoria[] = [];
  categoriaID: number;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private produtoService: ProdutoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private routerlink: Router,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.validation();
    this.carregarProduto();
    this.getCategorias();
  }

  public validation(): void {
    this.form = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      nome: ['', Validators.required],
      categoria: [''],
    });
  }

  public cssvalidator(campoform: FormControl): any {
    return { 'is-invalid': campoform.errors && campoform.touched };
  }

  public carregarProduto(): void {
    const produtoIdParam = this.router.snapshot.paramMap.get('id');

    if (produtoIdParam !== null) {
      this.produtoService.getProdutoById(+produtoIdParam).subscribe(
        (produto: Produto) => {
          this.produto = { ...produto };
          this.form.patchValue(this.produto);
        },
        (error: any) => {
          console.error(error);
        },
        () => {}
      );
    }
  }

  public salvarAlteracao(): void {
    this.spinner.show();

    if (this.form.valid) {
      this.produto = { ...this.form.value };
      this.produto.ativo = true;
      this.produto.categoriaId = this.produto.categoria.id;

      this.produtoService.postProduto(this.produto).subscribe(
        () => this.toastr.success('produto Salvo com Sucesso!', 'Sucesso!'),
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Erro ao salvar produto', 'Erro');
        },
        () => {
          this.spinner.hide();
          this.routerlink.navigate([`produtos/lista`]);
        }
      );
    }
  }

  private getCategorias(): void {
    const observer = {
      next: (_categorias: Categoria[]) => {
        this.categorias = _categorias;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar as categorias', 'Erro');
      },
      complete: () => this.spinner.hide(),
    };

    this.categoriaService.getCategoria().subscribe(observer);
  }
}
