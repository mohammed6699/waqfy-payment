import { Component, inject } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PaymentStatus } from '../payment-status/payment-status';

const VALID_OTP = '1234';
const PENDING_OTP = '0000';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-mobile-otp-dialog',
  styleUrl: './mobile-otp-dialog.css',
  templateUrl: './mobile-otp-dialog.html',
})
export class MobileOtpDialog {
  private dialog = inject(MatDialog);
  private dialogRef = inject(MatDialogRef<MobileOtpDialog>);

  otp = new FormArray([
    new FormControl(''),
    new FormControl(''),
    new FormControl(''),
    new FormControl(''),
  ]);

  verifyOtp() {
    const entered = this.otp.value.join('');
    const status =
      entered === VALID_OTP ? 'success' : entered === PENDING_OTP ? 'pending' : 'failed';
    localStorage.setItem(
      'paymentResult',
      JSON.stringify({ status, amount: 75, transactionId: crypto.randomUUID() }),
    );
    this.dialogRef.close();
    this.dialog
      .open(PaymentStatus, { disableClose: true })
      .afterClosed()
      .subscribe((action) => {
        if (action === 'retry') {
          this.dialog.open(MobileOtpDialog);
        }
      });
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.value && index < this.otp.length - 1) {
      (input.nextElementSibling as HTMLInputElement | null)?.focus();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
  resendOtp() {
    // handle toastr
  }
}
