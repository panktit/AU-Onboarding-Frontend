import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditObComponent } from './edit-ob.component';

describe('EditObComponent', () => {
  let component: EditObComponent;
  let fixture: ComponentFixture<EditObComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditObComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditObComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
