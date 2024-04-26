import { TestBed } from '@angular/core/testing';

import { MailgunServiceService } from './mailgun-service.service';

describe('MailgunServiceService', () => {
  let service: MailgunServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailgunServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
