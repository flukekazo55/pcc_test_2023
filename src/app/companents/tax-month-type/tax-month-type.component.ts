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
import { Year } from '../year/year.component';

@Component({
  selector: 'app-tax-month-type',
  templateUrl: './tax-month-type.component.html',
  styleUrls: ['./tax-month-type.component.scss'],
})
export class TaxMonthTypeComponent implements OnInit, OnDestroy {
  @Input() formGroup: FormGroup;
  @Output() taxMonthType = new EventEmitter<string>();

  years: Year[] = [];

  formSub: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formSub = this.formGroup.controls['taxMonthType'].valueChanges.subscribe(
      (taxMonthType) => {
        this.taxMonthType.emit(taxMonthType);
      }
    );
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }

  checkFormInvalid() {
    return (
      this.formGroup.controls['taxMonthType'].invalid &&
      (this.formGroup.controls['taxMonthType'].dirty ||
        this.formGroup.controls['taxMonthType'].touched)
    );
  }
}
