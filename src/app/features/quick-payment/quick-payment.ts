import { Component, inject, OnInit } from '@angular/core';
import { QuickPaymentService } from './quick-payment.service';
import { LanuageService } from '../../services/translate.service';
import { NgClass } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [NgClass],
  selector: 'app-quick-payment',
  styleUrl: './quick-payment.css',
  templateUrl: './quick-payment.html',
})
export class QuickPayment implements OnInit {
  currentLang = localStorage.getItem('language') || 'en';
  paymentForm!: FormGroup;
  isCardBtnClicked: boolean = false;
  private equickPaymnent = inject(QuickPaymentService);
  private platform = inject(Platform);
  constructor(
    private langSer: LanuageService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.langSer.language$.subscribe((lang) => {
      this.currentLang = lang;
    });
  }
  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      cardType: [0, Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      cardOwnerName: ['', Validators.required],
      expireMonth: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      expireYear: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    });
  }
  // check payment type according to os
  handleSubmitForm(): void {
    const transactionId =
      this.route.snapshot.queryParamMap.get('transactionId') ||
      this.equickPaymnent.paymentTrasnactionId();

    if (!transactionId) {
      console.error('No transaction ID found!');
      return;
    }

    const paymentMethod = Number(this.paymentForm.get('cardType')?.value ?? 0);

    const payload = {
      paymentTransactionId: transactionId,
      paymentMethod: paymentMethod,
    };

    this.equickPaymnent.createPaymentCheckout(payload).subscribe({
      next: (res) => {
        // Saving for testing purposes with teammate
        const checkoutStorageData = {
          paymentTransactionId: transactionId,
          checkoutId: res?.checkoutId,
          integrityKey: res?.integrityKey,
          paymentMethod: paymentMethod,
          formData: this.paymentForm.value,
        };

        localStorage.setItem('checkoutData', JSON.stringify(checkoutStorageData));
        console.log('Checkout data saved to localStorage:', checkoutStorageData);
      },
      error: (err) => {
        console.error('Error creating payment checkout:', err);
      },
    });
  }
  amount = this.equickPaymnent.selectedDonation;

  // show data form
  showDataForm() {
    this.isCardBtnClicked = true;
  }
}
