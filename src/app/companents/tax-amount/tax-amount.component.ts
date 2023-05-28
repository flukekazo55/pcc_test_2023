import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tax-amount',
  templateUrl: './tax-amount.component.html',
  styleUrls: ['./tax-amount.component.scss'],
})
export class TaxAmountComponent implements OnInit, OnDestroy {
  @Input() formGroup: FormGroup;
  @Output() taxAmount = new EventEmitter<string>();

  formSub: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formSub = this.formGroup.controls['taxAmount'].valueChanges.subscribe(
      (taxAmount) => {
        this.taxAmount.emit(taxAmount);
      }
    );
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }

  checkFormInvalid() {
    return (
      this.formGroup.controls['taxAmount'].invalid &&
      (this.formGroup.controls['taxAmount'].dirty ||
        this.formGroup.controls['taxAmount'].touched)
    );
  }

  checkTaxInvalid() {
    const saleAmount = Number(this.formGroup.controls['saleAmount'].value) * 0.07;
    const taxAmount = Number(this.formGroup.controls['taxAmount'].value);
    const min = saleAmount - 20;
    const max = saleAmount + 20;
    return (taxAmount && saleAmount && taxAmount < min) || taxAmount > max;
  }
}
