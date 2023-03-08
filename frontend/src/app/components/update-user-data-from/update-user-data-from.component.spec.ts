import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserDataFromComponent } from './update-user-data-from.component';

describe('UpdateUserDataFromComponent', () => {
  let component: UpdateUserDataFromComponent;
  let fixture: ComponentFixture<UpdateUserDataFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserDataFromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserDataFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
