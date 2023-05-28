import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-surcharge',
  templateUrl: './surcharge.component.html',
  styleUrls: ['./surcharge.component.scss'],
})
export class SurchargeComponent {
  @Input() formGroup: FormGroup;
  
  constructor(private fb: FormBuilder) {}
}
