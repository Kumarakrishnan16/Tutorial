import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ShareService } from './share.service';

describe('ShareService', () => {
  let service: ShareService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShareService],
    });

    service = TestBed.inject(ShareService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('give() should POST data', () => {
    const testData = { name: 'Test' };
    service.give(testData).subscribe((res) => {
      expect(res).toEqual(testData);
    });

    const req = httpMock.expectOne('http://localhost:3000/Database');
    expect(req.request.method).toBe('POST');
    req.flush(testData); // mock response
  });

  it('send() should GET all data', () => {
    const testData = [{ id: 1, name: 'Test' }];
    service.send().subscribe((res) => {
      expect(res).toEqual(testData);
    });

    const req = httpMock.expectOne('http://localhost:3000/Database');
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('sender(id) should GET data by ID', () => {
    const testData = { id: 1, name: 'Test' };
    service.sender(1).subscribe((res) => {
      expect(res).toEqual(testData);
    });

    const req = httpMock.expectOne('http://localhost:3000/Database/1');
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('modify(id, db) should PUT data', () => {
    const testData = { id: 1, name: 'Updated' };
    service.modify(1, testData).subscribe((res) => {
      expect(res).toEqual(testData);
    });

    const req = httpMock.expectOne('http://localhost:3000/Database/1');
    expect(req.request.method).toBe('PUT');
    req.flush(testData);
  });

  it('remove(id) should DELETE data', () => {
    service.remove(1).subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:3000/Database/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
