import { Injectable, signal } from '@angular/core';
import { MainService } from '../../services/Main.service';
import { QuickDonationRequest, QuickPayment, ResultPayment } from '../../Models/QuickPayment.model';

@Injectable({ providedIn: 'root' })
export class CardDialogService {
  paymentAmounts = signal<ResultPayment[]>([]);
  isLoading = signal<boolean>(false);
  loadError = signal<string | null>(null);

  constructor(private httpService: MainService) {}

  fetchPaymentAmounts() {
    this.isLoading.set(true);
    this.loadError.set(null);
    this.httpService.get<QuickPayment>('LookUp/GetQuickPaymentAmountList').subscribe({
      next: (res) => {
        this.paymentAmounts.set(res.result);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('error showing fast payment data', err);
        this.loadError.set('تعذر تحميل مبالغ التبرع. يمكنك إدخال مبلغ يدويًا.');
        this.isLoading.set(false);
      },
    });
  }
}
