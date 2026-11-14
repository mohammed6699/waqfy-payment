import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuickPaymentService } from '../../features/quick-payment/quick-payment.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { PaymentResults, STATUS_CONFIG } from './payment-status.model';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedStars } from '../shared-stars/shared-stars';

@Component({
  imports: [SharedStars],
  selector: 'app-payment-status ',
  styleUrl: './payment-status.css',
  templateUrl: './payment-status.html',
})
export class PaymentStatus implements OnInit {
  private dialogRef = inject(MatDialogRef<PaymentStatus>);
  private route = inject(ActivatedRoute);
  private equickPaymnent = inject(QuickPaymentService);
  private clipboard = inject(Clipboard);
  private destroyRef = inject(DestroyRef);

  private paymentResult = JSON.parse(localStorage.getItem('paymentResult') ?? '{}');
  transactionId!: string;
  status = signal<PaymentResults>(this.paymentResult.status ?? 'failed');
  amount = this.equickPaymnent.selectedDonation;
  config = computed(() => STATUS_CONFIG[this.status()]);
  rating = signal(0);

  constructor() {
    if (this.status() === 'pending') {
      const timer = setTimeout(() => {
        this.status.set('success');
      }, 8000);
      this.destroyRef.onDestroy(() => clearInterval(timer));
    }
  }
  ngOnInit(): void {
    this.transactionId = this.route.snapshot.queryParamMap?.get('transactionId')
      || this.equickPaymnent.paymentTrasnactionId() || '';
  }
  // copy button using angular cdk
  copyId() {
    const success = this.clipboard.copy(this.transactionId);
    if (success) {
      // toastr service to show success message
    } else {
      // toastr
    }
  }
  onPrimaryAction() {
    this.dialogRef.close(this.status() === 'failed' ? 'retry' : 'home');
  }
}
