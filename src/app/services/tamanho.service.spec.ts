/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TamanhoService } from './tamanho.service';

describe('Service: Tamanho', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TamanhoService]
    });
  });

  it('should ...', inject([TamanhoService], (service: TamanhoService) => {
    expect(service).toBeTruthy();
  }));
});
