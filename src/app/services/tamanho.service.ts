import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericCommandResult } from '../models/GenericCommandResult';
import { Tamanho } from '../models/Tamanho';

@Injectable({
  providedIn: 'root'
})
export class TamanhoService {
  baseURL = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

    getTamanho(): Observable<Tamanho[]>{
      return this.http.get<Tamanho[]>(this.baseURL + "v1/Tamanhos");
    }

    getTamanhoByProduto(idProduto: number): Observable<Tamanho[]>{
      return this.http.get<Tamanho[]>(this.baseURL + "v1/Tamanhos?idProduto="+idProduto);
    }

    postTamanho(tamanho: Tamanho): Observable<GenericCommandResult>{
      return this.http.post<GenericCommandResult>(this.baseURL + "v1/Tamanhos", tamanho);
    }
}
