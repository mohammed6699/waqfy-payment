import { Component } from '@angular/core';
import { Card } from '../../shared/card/card';

@Component({
  imports: [Card],
  selector: 'app-quick-payment',
  styleUrl: './quick-payment.css',
  templateUrl: './quick-payment.html',
})
export class QuickPayment {}
