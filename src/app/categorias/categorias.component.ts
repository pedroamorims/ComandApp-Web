import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {
  public categorias: any = [];
  public categoriasFiltradas: any = [];

  private _filtroLista: string = '';

  public get filtroLista() : string {
    return this._filtroLista;
  }

  public set filtroLista(value: string){
    this._filtroLista = value;
    this.categoriasFiltradas = (this.filtroLista ? this.filtrarCategorias(this.filtroLista) : this.categorias)
  }

  filtrarCategorias(filtrarPor:string) : any{
    filtrarPor = filtrarPor.toLowerCase();
    return this.categorias.filter(
      (categoria: any) => categoria.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCategorias();

  }

  public getCategorias() {
    this.http.get('http://localhost:5000/v1/categorias').subscribe(
      response => {
        this.categorias = response
        this.categoriasFiltradas = this.categorias
      },
      error => console.log(error)
    );
  }
}


