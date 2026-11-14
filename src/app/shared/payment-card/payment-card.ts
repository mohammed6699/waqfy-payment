import { CommonModule, SlicePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { QuickPaymentService } from '../../features/quick-payment/quick-payment.service';
import { ActivatedRoute } from '@angular/router';
import { CardNumberPipe } from '../../pipes/card-number-pipe';

@Component({
  selector: 'app-payment-card',
  imports: [CommonModule, TranslatePipe, CardNumberPipe],
  templateUrl: './payment-card.html',
  styleUrl: './payment-card.css',
})
export class PaymentCard implements OnInit {
  @Input() cardNumber = '';
  @Input() cardOwnerName = '';
  @Input() expireMonth = '';
  @Input() expireYear = '';
  @Input() cvv = '';

  transactionId!: string;
  constructor(
    private quickPayment: QuickPaymentService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.transactionId =
      this.route.snapshot.queryParamMap.get('transactionId') ||
      this.quickPayment.paymentTrasnactionId() ||
      '';
    if (!this.transactionId) {
      console.error('No transaction ID found!');
      return;
    }
  }

  get cardBrand(): 'visa' | 'mastercard' | 'mada' | 'unknown' {
    const num = this.cardNumber?.replace(/\s+/g, '') || '';
    if (/^4/.test(num)) return 'visa';
    if (/^(5[1-5]|2[2-7])/.test(num)) return 'mastercard';
    return 'unknown';
  }

  getCardOwnerNameDisplay(): string {
    return this.cardOwnerName ? String(this.cardOwnerName) : 'CARD HOLDER';
  }

  getCardNumberDisplay(): string {
    if (!this.cardNumber) return '•••• •••• •••• ••••';
    const clean = this.cardNumber.replace(/\s+/g, '');
    const parts = clean.match(/.{1,4}/g);
    return parts ? parts.join(' ') : clean;
  }

  getExpireMonthDisplay(): string {
    const month = this.expireMonth ? String(this.expireMonth) : '';
    return month ? month.padStart(2, '0') : 'MM';
  }

  getExpireYearDisplay(): string {
    const year = this.expireYear ? String(this.expireYear) : '';
    return year ? year.slice(-2) : 'YY';
  }

  get cvvDisplay(): string {
    return this.cvv ? this.cvv : '•••';
  }
}
