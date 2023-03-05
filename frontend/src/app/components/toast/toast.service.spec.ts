import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { ToastService } from './toast.service';
import { ToastDirective } from './toast.directive';
import {
  NO_ERRORS_SCHEMA,
  ViewContainerRef,
} from '@angular/core';
import { details } from 'src/app/mocks';

describe('Testing Toast Service', () => {
  let service: ToastService;
  let directive: ToastDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastDirective],
      providers: [
        {
          provide: ToastDirective,
          useValue: {
            viewContainerRef: ViewContainerRef,
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    service = TestBed.inject(ToastService);
    directive = TestBed.inject(ToastDirective);
  });

  describe('Class Tests', () => {
    it('should be rendered', () => {
      expect(service).toBeDefined();
    });

    it('should invoke createComponent function', () => {
      const spy = spyOn(
        service,
        'createComponent'
      );

      service.createComponent(directive, details);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
