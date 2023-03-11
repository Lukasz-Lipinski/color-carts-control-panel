import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { UpdateUserDataService } from './update-user-data.service';
import { mockedUpdateUserFields } from 'src/app/mocks';

describe('Testing Update User Data Service', () => {
  let service: UpdateUserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UpdateUserDataService,
          useValue: {
            getUpdateUserFields: () =>
              mockedUpdateUserFields,
          },
        },
      ],
    }).compileComponents();

    service = TestBed.inject(
      UpdateUserDataService
    );
  });

  describe('Class Tests', () => {
    it('Should be rendered', () => {
      expect(service).toBeDefined();
    });

    it('Should return mocked data', () => {
      expect(
        service.getUpdateUserFields().length
      ).toEqual(mockedUpdateUserFields.length);

      for (
        let i = 0;
        i <
        service.getUpdateUserFields().length - 1;
        i++
      ) {
        expect(
          service.getUpdateUserFields()[i].name
        ).toEqual(mockedUpdateUserFields[i].name);
        expect(
          service.getUpdateUserFields()[i]
            .placeholder
        ).toEqual(
          mockedUpdateUserFields[i].placeholder
        );
        expect(
          service.getUpdateUserFields()[i].type
        ).toEqual(mockedUpdateUserFields[i].type);
      }
    });
  });
});
