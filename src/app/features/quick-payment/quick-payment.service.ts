import { Injectable, signal } from "@angular/core";
import { MainService } from "../../services/Main.service";
import { 
  QuickPayment, 
  QuickDonationRequest, 
  PaymentDraftDetails, 
  PaymentDraftResult, 
  PaymentCheckoutRequest,
  PaymentTransactionResponse 
} from "../../Models/QuickPayment.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class QuickPaymentService {
  selectedDonation = signal<number | null>(null);
  isLoading = signal<boolean>(false);
  // payment transaction id (GUID string) to be saved like amount
  paymentTrasnactionId = signal<string | null>(null);
  error = signal<string | null>(null);

  constructor(private httpService: MainService) {}

  quickPayment(data: QuickDonationRequest): Observable<QuickPayment> {
    return this.httpService.post<QuickPayment>('Payment/PrepareQuickDonation', data);
  }

  // payment draft
  getPaymentDraft(transId: string): Observable<PaymentDraftDetails> {
    return this.httpService.get<PaymentDraftDetails>(`GetPaymentDraft/${transId}`);
  }

  createQuickPaymentDraft(amount: number): Observable<PaymentDraftResult> {
    return this.httpService.post<PaymentDraftResult>('Payment/CreateQuickPaymentDraft', { amount });
  }

  // Create payment checkout session
  createPaymentCheckout(data: PaymentCheckoutRequest): Observable<PaymentTransactionResponse> {
    return this.httpService.post<PaymentTransactionResponse>('Payment/CreatePaymentCheckout', data);
  }

  // here I set the amount and transactionId as I will need them instead of fetching all over again alongside the project
  setDonation(amount: number, transactionId?: string): void {
    this.selectedDonation.set(amount);
    if (transactionId) {
      this.paymentTrasnactionId.set(transactionId);
    }
  }

  clearAmount(): void {
    this.selectedDonation.set(null);
    this.paymentTrasnactionId.set(null);
  }
}