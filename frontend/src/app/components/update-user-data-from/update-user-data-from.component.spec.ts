import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  UpdateUserDataFormProps,
  UpdateUserDataFromComponent,
} from './update-user-data-from.component';
import { AuthService } from '../auth/auth.service';
import {
  UpdateUserDataService,
  UpdateUserFormProps,
} from './update-user-data.service';
import { mockedUpdateUserFields } from 'src/app/mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Testing Update User Data Form Component', () => {
  let fixture: ComponentFixture<UpdateUserDataFromComponent>;
  let component: UpdateUserDataFromComponent;

  let authService: AuthService;
  let updateUserDataService: UpdateUserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserDataFromComponent],
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: UpdateUserDataService,
          useValue: {
            getUpdateUserFields: () =>
              mockedUpdateUserFields,
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(
      UpdateUserDataFromComponent
    );
    component = fixture.componentInstance;

    component.ngOnInit();
    fixture.detectChanges();
  });

  describe('Class Tests', () => {
    it('Should get data from service', () => {
      expect(
        component.updateUserDataFormFields.length
      ).toEqual(mockedUpdateUserFields.length);
    });

    it('Should initialiazed form', () => {
      expect(
        component.updateUserDataForm
      ).toBeDefined();
    });

    it('Should emit value if onSubmit event was triggered', () => {
      const spyOnOnSubmit = spyOn(
        component.userDataEmitter,
        'emit'
      );

      for (let control of Object.values(
        component.updateUserDataForm.controls
      )) {
        (control as FormControl).setValue(
          'test@test'
        );
      }
      fixture.detectChanges();
      expect(
        component.updateUserDataForm.valid
      ).toBeTrue();

      component.onSubmit();

      expect(spyOnOnSubmit).toHaveBeenCalled();
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeDefined();
    });

    it('Should render number of labels equaled number of  fields', () => {
      const labels =
        fixture.debugElement.queryAll(
          By.css('label')
        );

      expect(labels.length).toEqual(
        mockedUpdateUserFields.length
      );
    });

    it('Should render disabled button and set on undisabled if form is valid ', () => {
      const btn = fixture.debugElement.query(
        By.css('button')
      ).nativeElement as HTMLButtonElement;

      expect(btn).toBeDefined();
      expect(btn.disabled).toBeTrue();

      for (let control in component
        .updateUserDataForm.controls) {
        component.updateUserDataForm.controls[
          control as keyof UpdateUserDataFormProps
        ].setValue('test@test');
      }

      expect(
        component.updateUserDataForm.valid
      ).toBeTrue();
      fixture.detectChanges();

      btn.click();

      fixture.detectChanges();
      const spinner = fixture.debugElement.query(
        By.css('div.spinner-grow')
      );
      expect(spinner).toBeDefined();
    });
  });
});
