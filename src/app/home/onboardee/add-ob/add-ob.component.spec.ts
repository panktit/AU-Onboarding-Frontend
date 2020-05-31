import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObComponent } from './add-ob.component';

describe('AddObComponent', () => {
  let component: AddObComponent;
  let fixture: ComponentFixture<AddObComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddObComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddObComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
