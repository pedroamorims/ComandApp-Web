/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoriaService } from './categoria.service';

describe('Service: Categoria', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriaService]
    });
  });

  it('should ...', inject([CategoriaService], (service: CategoriaService) => {
    expect(service).toBeTruthy();
  }));
});
