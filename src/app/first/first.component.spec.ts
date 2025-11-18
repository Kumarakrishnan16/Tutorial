import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirstComponent } from './first.component';
import { ShareService } from '../share.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

// Mock ShareService
const mockShareService = {
  send: jest.fn().mockReturnValue(of([])),
  remove: jest.fn().mockReturnValue(of(null)),
};

// Mock Router
const mockRouter = {
  navigate: jest.fn()
};

describe('FirstComponent', () => {
  let component: FirstComponent;
  let fixture: ComponentFixture<FirstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstComponent],
      providers: [
        { provide: ShareService, useValue: mockShareService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(FirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init (recive())', () => {
    expect(mockShareService.send).toHaveBeenCalled();
    expect(component.database).toEqual([]);
  });

  it('should navigate to /form when add() is called', () => {
    component.add();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/form']);
  });

  it('should navigate to edit page when editer() is called', () => {
    const mockData = { id: 10 };
    component.editer(mockData);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/form', mockData]);
  });

  it('should call delete API when del() is triggered', () => {
    const mockData = { id: 5 };
    component.del(mockData);
    expect(mockShareService.remove).toHaveBeenCalledWith(5);
  });
});
