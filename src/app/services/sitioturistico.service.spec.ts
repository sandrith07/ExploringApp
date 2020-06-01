import { TestBed } from '@angular/core/testing';

import { SitioturisticoService } from './sitioturistico.service';

describe('SitioturisticoService', () => {
  let service: SitioturisticoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitioturisticoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
