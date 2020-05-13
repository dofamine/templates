import { TestBed } from '@angular/core/testing';

import { TemplatesResolverService } from './templates.resolver.service';

describe('Templates.ResolverService', () => {
  let service: TemplatesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplatesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
