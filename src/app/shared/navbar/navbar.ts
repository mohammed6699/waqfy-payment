import { Component, OnInit } from '@angular/core';
import { LanuageService } from '../../services/translate.service';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, TranslatePipe, CommonModule, FormsModule],
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit{
  currentLanguage = 'en'
  searchQuery: string = ''
  isMenuOpen: boolean = false;
  constructor(
    private languageSer: LanuageService
  ){}
  ngOnInit(): void {
    this.languageSer.language$.subscribe(
      lang => {this.currentLanguage = lang}
    )
  }
  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }
  changeDirection(lang: string) {
    this.languageSer.changeLang(lang)
  }
}
