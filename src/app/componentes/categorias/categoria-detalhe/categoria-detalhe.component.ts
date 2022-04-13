import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/Categoria';
import { GenericCommandResult } from 'src/app/models/GenericCommandResult';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categoria-detalhe',
  templateUrl: './categoria-detalhe.component.html',
  styleUrls: ['./categoria-detalhe.component.scss'],
})
export class CategoriaDetalheComponent implements OnInit {
  form: FormGroup;
  categoria: Categoria;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private categoriaService: CategoriaService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.validation();
    this.carregarCategoria();
  }

  public validation(): void {
    this.form = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      iconURL: ['', Validators.required],
    });
  }

  public cssvalidator(campoform: FormControl): any {
    return { 'is-invalid': campoform.errors && campoform.touched };
  }

  public carregarCategoria(): void {
    const categoriaIdParam = this.router.snapshot.paramMap.get('id');

    if (categoriaIdParam !== null) {
      this.categoriaService.getCategoriaById(+categoriaIdParam).subscribe(
        (categoria: Categoria) => {
          this.categoria = { ...categoria };
          this.form.patchValue(this.categoria);
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
      this.categoria = {...this.form.value}
      this.categoria.ativo = true;

      this.categoriaService.postCategoria(this.categoria).subscribe(
        () => this.toastr.success('Categoria Salva com Sucesso!', 'Sucesso!'),
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Erro ao salvar categoria', 'Erro');
        },
        () => this.spinner.hide()
      );
    }
  }
}
