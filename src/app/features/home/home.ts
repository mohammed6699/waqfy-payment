import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../../shared/card/card';
import { LanuageService } from '../../services/translate.service';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private dialog = inject(MatDialog);
  private router = inject(Router)
  openDonationDialog(): void {
    const ref = this.dialog.open(Card, {
    });

    ref.afterClosed().subscribe(result => {
      if (result?.amount) {
        console.log('Donation amount chosen:', result.amount);
        this.router.navigate(['/home/quick-payment']);
      }
    });
  }
}
