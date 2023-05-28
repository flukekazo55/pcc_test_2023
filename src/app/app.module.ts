import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './companents/header/header.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FilingTypeComponent } from './companents/filing-type/filing-type.component';
import { MonthComponent } from './companents/month/month.component';
import { YearComponent } from './companents/year/year.component';
import { SaleAmountComponent } from './companents/sale-amount/sale-amount.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { TaxAmountComponent } from './companents/tax-amount/tax-amount.component';
import { MatIconModule } from '@angular/material/icon';
import { SurchargeComponent } from './companents/surcharge/surcharge.component';
import { PenaltyComponent } from './companents/penalty/penalty.component';
import { TotalAmountComponent } from './companents/total-amount/total-amount.component';
import { TaxMonthTypeComponent } from './companents/tax-month-type/tax-month-type.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilingTypeComponent,
    MonthComponent,
    YearComponent,
    SaleAmountComponent,
    TaxAmountComponent,
    SurchargeComponent,
    PenaltyComponent,
    TotalAmountComponent,
    TaxMonthTypeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatIconModule
  ],
  providers: [DatePipe, provideNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}
