import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsComponent } from './forms.component';
import { ShareService } from '../share.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('FormsComponent', () => {
  let component: FormsComponent;
  let fixture: ComponentFixture<FormsComponent>;
  let shareServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    shareServiceMock = {
      sender: jest.fn().mockReturnValue(of({
        name: 'A',
        email: 'a@gmail.com',
        role: 'admin',
        address: 'X street',
        city: 'NY'
      })),
      give: jest.fn().mockReturnValue(of({})),
      send: jest.fn().mockReturnValue(of([])),
      modify: jest.fn().mockReturnValue(of({}))
    };

    routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [FormsComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ShareService, useValue: shareServiceMock },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } } // returns string '1'
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // runs constructor logic
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should patch form in constructor using sender()', () => {
    // Expect string '1' because the component passes the string
    expect(shareServiceMock.sender).toHaveBeenCalledWith('1');
    expect(component.myform.value.name).toBe('A');
  });
});
