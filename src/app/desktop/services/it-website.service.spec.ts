import { TestBed } from '@angular/core/testing';

import { ItWebsiteService } from './it-website.service';

describe('ItWebsiteService', () => {
  let service: ItWebsiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItWebsiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
