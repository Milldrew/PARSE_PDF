import { TestBed } from '@angular/core/testing';

import { ParsePdfService } from './parse-pdf.service';

describe('ParsePdfService', () => {
  let service: ParsePdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParsePdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
