import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss'],
})
export class YearComponent {
  @Input() formGroup: FormGroup;
  @Output() year = new EventEmitter<string>();

  years: Year[] = [];

  formSub: Subscription;

  constructor(private fb: FormBuilder) {
    this.years = this.generateYearsArray(2020, 2023);
  }

  ngOnInit(): void {
    this.formSub = this.formGroup.controls['year'].valueChanges.subscribe(
      (year) => {
        console.log(year)
        this.year.emit(year);
      }
    );
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }

  generateYearsArray(startYear: number, endYear: number) {
    var years: Year[] = [];
    for (var year = endYear; year >= startYear; year--) {
      years.push({
        yearName: year.toString(),
      });
    }
    return years;
  }

  checkFormInvalid() {
    return (
      this.formGroup.controls['year'].invalid &&
      (this.formGroup.controls['year'].dirty ||
        this.formGroup.controls['year'].touched)
    );
  }
}

export interface Year {
  yearName: string;
}
