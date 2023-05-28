import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent {
  @Input() formGroup: FormGroup;
  @Output() month = new EventEmitter<string>();
  
  months: Month[] = [];
  currentDate: Date = new Date();

  formSub: Subscription;

  constructor(private fb: FormBuilder) {
    this.months = [
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
  }

  ngOnInit(): void {
    this.formSub = this.formGroup.controls['month'].valueChanges.subscribe(
      (month) => {
        this.month.emit(month);
      }
    );
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }

  checkFormInvalid() {
    return (
      this.formGroup.controls['month'].invalid &&
      (this.formGroup.controls['month'].dirty ||
        this.formGroup.controls['month'].touched)
    );
  }
}

export interface Month {
  id: string;
  monthName: string;
}