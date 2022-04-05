import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/Produto';

@Injectable()
export class ProdutoService {
baseURL = 'http://localhost:5000/v1/Produtos';

constructor(private http: HttpClient) { }

  getProduto(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.baseURL);
  }
}
