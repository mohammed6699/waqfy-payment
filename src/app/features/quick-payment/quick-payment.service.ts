import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class QuickPaymentService {
    selectedDonation = signal<number | null>(null);

    setDonation(amount: number): void{
        this.selectedDonation.set(amount)
    }
    clearAmount(): void{
        this.selectedDonation.set(null);
    }
}