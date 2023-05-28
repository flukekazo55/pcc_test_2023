import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filing-type',
  templateUrl: './filing-type.component.html',
  styleUrls: ['./filing-type.component.scss'],
})
export class FilingTypeComponent implements OnInit, OnDestroy {
  @Input() formGroup: FormGroup;
  @Output() filingForm = new EventEmitter<number>();

  formSub: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      filingType: [
        this.formGroup.controls['filingType'].value,
        Validators.required,
      ],
    });

    this.formSub = this.formGroup.controls['filingType'].valueChanges.subscribe(
      (filingType) => {
        this.filingForm.emit(Number(filingType));
      }
    );
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }
}
