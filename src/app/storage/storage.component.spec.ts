import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StorageComponent } from './storage.component';
import { ShareService } from '../share.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('StorageComponent', () => {
  let component: StorageComponent;
  let fixture: ComponentFixture<StorageComponent>;
  let mockService: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockService = {
      sender: jest.fn()
    };

    // Mock ActivatedRoute: get returns string '1'
    mockActivatedRoute = {
      paramMap: of({
        get: (key: string) => '1'
      })
    };

    await TestBed.configureTestingModule({
      declarations: [StorageComponent],
      providers: [
        { provide: ShareService, useValue: mockService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StorageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ShareService.sender with the correct id on init', () => {
    const fakeData = { name: 'Test' };
    mockService.sender.mockReturnValue(of(fakeData));

    component.ngOnInit();

    // Fix: expect string '1' instead of number
    expect(mockService.sender).toHaveBeenCalledWith('1');
    expect(component.db).toEqual(fakeData);
  });
});
