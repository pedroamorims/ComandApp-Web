import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericCommandResult } from '../models/GenericCommandResult';
import { Produto } from '../models/Produto';

@Injectable()
export class ProdutoService {
baseURL = 'http://localhost:5000/';

constructor(private http: HttpClient) { }

  getProduto(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.baseURL + "v1/produtos");
  }

  getProdutoByCategoria(idCategoria: number): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.baseURL + "v1/produtos?idCategoria="+idCategoria);
  }


  getProdutoById(id: number): Observable<Produto>{
    return this.http.get<Produto>(this.baseURL + "v1/produtos/" +id);
  }

  postProduto(produto: Produto): Observable<GenericCommandResult>{
    return this.http.post<GenericCommandResult>(this.baseURL + "v1/Produtos", produto);
  }
}
