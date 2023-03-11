import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { PasswordFormService } from './password-form.service';
import { mockedPasswordFields } from 'src/app/mocks';

describe('Testing Password Form Service ', () => {
  let service: PasswordFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PasswordFormService,
          useValue: {
            getPasswordFields: () =>
              mockedPasswordFields,
          },
        },
      ],
    }).compileComponents();

    service = TestBed.inject(PasswordFormService);
  });

  describe('Class Tests', () => {
    it('Should return mocked data', () => {
      expect(
        service.getPasswordFields()
      ).toBeDefined();
      expect(
        service.getPasswordFields().length
      ).toEqual(mockedPasswordFields.length);
    });
  });
});
