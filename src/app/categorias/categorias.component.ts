import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {
  public categorias: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCategorias();

  }

  public getCategorias() {
    this.http.get('http://localhost:5280/v1/categorias').subscribe(
      response => this.categorias = response,
      error => console.log(error)
    );

  }
}


