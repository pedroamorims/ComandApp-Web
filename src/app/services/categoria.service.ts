import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';

@Injectable()
export class CategoriaService {
baseURL = 'http://localhost:5000/v2/categorias';

constructor(private http: HttpClient) { }

  getCategoria(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.baseURL);
  }
}
