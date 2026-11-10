import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Card } from '../../shared/card/card';
import { LanuageService } from '../../services/translate.service';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private dialog = inject(MatDialog);

  openDonationDialog(): void {
    const ref = this.dialog.open(Card, {
    });

    ref.afterClosed().subscribe(result => {
      if (result?.amount) {
        console.log('Donation amount chosen:', result.amount);
        // TODO: navigate to payment flow
      }
    });
  }
}
