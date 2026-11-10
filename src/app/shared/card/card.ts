import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CardDialogService } from './dialogCard.service';
import { LanuageService } from '../../services/translate.service';
import { TranslateService } from '@ngx-translate/core';

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
  donationAmount = this.cardSer.paymentAmounts;
  isLoading = this.cardSer.isLoading;
  loadError = this.cardSer.loadError;
  selectedAmount: number | null = null;
  customAmount: number | null = null;
  currentLang = localStorage.getItem('language') || 'en';
  ngOnInit(): void {
    this.cardSer.fetchPaymentAmounts();
    this.languageSer.language$.subscribe((lang) => this.currentLang = lang);
  }

  selectAmount(amount: number): void {
    this.selectedAmount = amount;
    this.customAmount = null;
  }

  onCustomAmountInput(): void {
    this.selectedAmount = null;
  }

  getFinalAmount(): number | null {
    return this.customAmount ?? this.selectedAmount;
  }

  submit(): void {
    const amount = this.getFinalAmount();
    if (!amount) return;
    this.dialogRef.close({ amount });
  }

  close(): void {
    this.dialogRef.close();
  }
}
