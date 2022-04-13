import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';
import { GenericCommandResult } from '../models/GenericCommandResult';

@Injectable()
export class CategoriaService {
baseURL = 'http://localhost:5000/';

constructor(private http: HttpClient) { }

  getCategoria(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.baseURL + "v2/categorias");
  }

  getCategoriaById(id: number): Observable<Categoria>{
    return this.http.get<Categoria>(this.baseURL + "v1/categorias/" +id);
  }

  postCategoria(categoria: Categoria): Observable<GenericCommandResult>{
    return this.http.post<GenericCommandResult>(this.baseURL + "v1/categorias", categoria);
  }


}
