import { Component, inject } from '@angular/core';
import { Card } from '../../shared/card/card';
import { QuickPaymentService } from './quick-payment.service';

@Component({
  imports: [Card],
  selector: 'app-quick-payment',
  styleUrl: './quick-payment.css',
  templateUrl: './quick-payment.html',
})
export class QuickPayment {

  private equickPaymnent = inject(QuickPaymentService);

  amount = this.equickPaymnent.selectedDonation
}
