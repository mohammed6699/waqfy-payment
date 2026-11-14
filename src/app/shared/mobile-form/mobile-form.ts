import { Component, inject } from '@angular/core';
import { QuickPaymentService } from '../../features/quick-payment/quick-payment.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgPlural } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  imports: [ReactiveFormsModule, NgClass, NgPlural],
  selector: 'app-mobile-form',
  styleUrl: './mobile-form.css',
  templateUrl: './mobile-form.html',
})
export class MobileForm {
  private equickPaymnent = inject(QuickPaymentService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private clipboard = inject(Clipboard);
  amount = this.equickPaymnent.selectedDonation;
  isSaved = false;

  mobileForm: FormGroup = this.fb.group({
    mobileNumber: ['', [Validators.required, Validators.pattern('^5[0-9]{8}$')]],
  });

  get transactionId(): string {
    return (
      this.equickPaymnent.paymentTrasnactionId() ||
      this.route.snapshot.queryParamMap.get('transactionId') ||
      ''
    );
  }

  handleSaveMobile(): void {
    if (this.mobileForm.invalid) {
      return;
    }

    const payload = {
      countryCode: '+966',
      mobileNumber: this.mobileForm.value.mobileNumber,
      paymentTransactionId: this.transactionId,
    };

    localStorage.setItem('donorMobileData', JSON.stringify(payload));
    console.log('Donor mobile saved to localStorage:', payload);
    this.isSaved = true;
  }
  copyId() {
    this.clipboard.copy(this.transactionId);
  }
}
