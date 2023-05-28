import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') private stepper: MatStepper;

  isLinear: boolean = false;
  currentDate: Date = new Date();

  filingTypeSub: Subscription;
  saleAmountSub: Subscription;
  taxAmountSub: Subscription;

  step1FormGroup = this.fb.group({
    filingType: [0, Validators.required],
    month: [
      String(this.currentDate.getMonth() + 1).padStart(2, '0'),
      Validators.required,
    ],
    year: [this.currentDate.getFullYear().toString(), Validators.required],
    saleAmount: ['', Validators.required],
    taxAmount: ['', Validators.required],
    taxMonthType: [0],
    surchange: [''],
    penalty: [''],
    totalAmount: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // filingType Subscription
    this.filingTypeSub = this.step1FormGroup.controls[
      'filingType'
    ].valueChanges.subscribe((filingType) => {
      if (filingType === 0) {
        this.step1FormGroup.controls['taxMonthType'].removeValidators(
          Validators.required
        );
        this.step1FormGroup.patchValue({
          surchange: '',
          penalty: '',
          totalAmount: '',
        });
      } else {
        this.step1FormGroup.controls['taxMonthType'].addValidators(
          Validators.required
        );
        const taxAmount = Number(
          this.step1FormGroup.controls['taxAmount'].value
        );
        this.step1FormGroup.patchValue({
          surchange: (taxAmount * 0.1).toFixed(2),
          penalty: (200).toFixed(2),
          totalAmount: (taxAmount + taxAmount * 0.1 + 200).toFixed(2),
        });
      }
      this.step1FormGroup.controls['taxMonthType'].updateValueAndValidity();
    });

    // saleAmount Subscription
    this.saleAmountSub = this.step1FormGroup.controls[
      'saleAmount'
    ].valueChanges.subscribe((saleAmount) => {
      this.step1FormGroup.controls['taxAmount'].setValue(
        (Number(saleAmount) * 0.07).toFixed(2)
      );
    });

    // taxAmount Subscription
    this.taxAmountSub = this.step1FormGroup.controls[
      'taxAmount'
    ].valueChanges.subscribe((taxAmount) => {
      const filingType = this.step1FormGroup.controls['filingType'].value;
      if (taxAmount && filingType !== 0) {
        this.step1FormGroup.patchValue({
          surchange: (Number(taxAmount) * 0.1).toFixed(2),
          penalty: (200).toFixed(2),
          totalAmount: (
            Number(taxAmount) +
            Number(taxAmount) * 0.1 +
            200
          ).toFixed(2),
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.filingTypeSub.unsubscribe();
    this.taxAmountSub.unsubscribe();
  }

  setStep1Value(controlName, value) {
    this.step1FormGroup.controls[controlName].setValue(value);
  }

  getStep1Value(controlName) {
    return this.step1FormGroup.controls[controlName].value;
  }

  step1Submit() {
    if (this.step1FormGroup.valid) {
      this.stepper.next();
    } else {
      this.step1FormGroup.markAllAsTouched();
    }
  }

  step2Submit() {
    window.location.reload();
    window.alert('success submit form');
  }

  showTaxMonthType() {
    return this.step1FormGroup.controls['filingType'].value === 1;
  }

  goBack(stepper: MatStepper) {
    this.stepper.previous();
  }

  goNext(stepper: MatStepper) {
    this.stepper.next();
  }

  getMonth() {
    const months = [
      { id: '01', monthName: 'January' },
      { id: '02', monthName: 'February' },
      { id: '03', monthName: 'March' },
      { id: '04', monthName: 'April' },
      { id: '05', monthName: 'May' },
      { id: '06', monthName: 'June' },
      { id: '07', monthName: 'July' },
      { id: '08', monthName: 'August' },
      { id: '09', monthName: 'September' },
      { id: '10', monthName: 'October' },
      { id: '11', monthName: 'November' },
      { id: '12', monthName: 'December' },
    ];
    const month = this.step1FormGroup.controls['month'].value;
    return months.find((x) => x.id === month)?.monthName;
  }

  getTotalPayable() {
    const saleAmount = Number(this.step1FormGroup.controls['saleAmount'].value);
    const taxAmount = Number(this.step1FormGroup.controls['taxAmount'].value);
    const totalAmount = Number(
      this.step1FormGroup.controls['totalAmount'].value
    );
    const filingType = this.step1FormGroup.controls['filingType'].value;
    return filingType === 0 ? taxAmount : totalAmount;
  }
}
