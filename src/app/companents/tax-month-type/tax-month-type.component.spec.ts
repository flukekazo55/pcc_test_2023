import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxMonthTypeComponent } from './tax-month-type.component';

describe('TaxMonthTypeComponent', () => {
  let component: TaxMonthTypeComponent;
  let fixture: ComponentFixture<TaxMonthTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxMonthTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxMonthTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
