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
  selector: 'app-sale-amount',
  templateUrl: './sale-amount.component.html',
  styleUrls: ['./sale-amount.component.scss'],
})
export class SaleAmountComponent implements OnInit, OnDestroy {
  @Input() formGroup: FormGroup;
  @Output() saleAmount = new EventEmitter<string>();

  formSub: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formSub = this.formGroup.controls['saleAmount'].valueChanges.subscribe(
      (saleAmount) => {
        this.saleAmount.emit(saleAmount);
      }
    );
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }

  checkFormInvalid() {
    return (
      this.formGroup.controls['saleAmount'].invalid &&
      (this.formGroup.controls['saleAmount'].dirty ||
        this.formGroup.controls['saleAmount'].touched)
    );
  }
}
