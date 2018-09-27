import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesAdminComponent } from './supplies-admin.component';

describe('SuppliesAdminComponent', () => {
  let component: SuppliesAdminComponent;
  let fixture: ComponentFixture<SuppliesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
