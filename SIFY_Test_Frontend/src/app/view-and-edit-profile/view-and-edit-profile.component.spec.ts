import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAndEditProfileComponent } from './view-and-edit-profile.component';

describe('ViewAndEditProfileComponent', () => {
  let component: ViewAndEditProfileComponent;
  let fixture: ComponentFixture<ViewAndEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAndEditProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAndEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
