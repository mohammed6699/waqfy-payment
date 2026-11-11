import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CardDialogService } from './dialogCard.service';
import { LanuageService } from '../../services/translate.service';
import { QuickPaymentService } from '../../features/quick-payment/quick-payment.service';
import { ResultPayment } from '../../Models/QuickPayment.model';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  selector: 'app-card',
  styleUrl: './card.css',
  templateUrl: './card.html',
})
export class Card implements OnInit {
  private cardSer = inject(CardDialogService);
  private dialogRef = inject(MatDialogRef<Card>);
  private languageSer = inject(LanuageService);
  private quickPaymentSer = inject(QuickPaymentService);
  private router = inject(Router);
  donationAmount = this.cardSer.paymentAmounts;
  isLoading = this.cardSer.isLoading;
  loadError = this.cardSer.loadError;

  selectedItem: ResultPayment | null = null;
  customAmount: number | null = null;

  isSubmitting = false;
  submitError: string | null = null;

  currentLang = localStorage.getItem('language') || 'en';

  ngOnInit(): void {
    this.cardSer.fetchPaymentAmounts();
    this.languageSer.language$.subscribe((lang) => (this.currentLang = lang));
  }

  selectAmount(item: ResultPayment): void {
    this.selectedItem = item;
    this.customAmount = null;
  }

  onCustomAmountInput(): void {
    this.selectedItem = null;
  }

  getFinalAmount(): number | null {
    return this.customAmount ?? this.selectedItem?.amount ?? null;
  }

  submit(): void {
    const amount = this.getFinalAmount();
    if (!amount) return;
    this.isSubmitting = true;
    this.submitError = null;

    this.quickPaymentSer.createQuickPaymentDraft(amount).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.success && res.result?.paymentTransactionId) {
          const transactionId = res.result.paymentTransactionId;
          this.quickPaymentSer.setDonation(amount, transactionId);
          // this.dialogRef.close({ amount, transactionId, response: res });
          this.dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/home/quick-payment'], { queryParams: { transactionId } });
          });
          this.dialogRef.close();
        } else {
          this.submitError = res.errors?.[0] ?? 'حدث خطأ، يرجى المحاولة مجددًا.';
        }
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = 'تعذر إتمام العملية، يرجى المحاولة لاحقًا.';
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
