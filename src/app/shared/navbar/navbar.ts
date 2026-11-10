import { Component, OnInit } from '@angular/core';
import { LanuageService } from '../../services/translate.service';

@Component({
  imports: [],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit{
  currentLanguage = 'en'
  constructor(
    private languageSer: LanuageService
  ){}
  ngOnInit(): void {
    this.languageSer.language$.subscribe(
      lang => {this.currentLanguage = lang}
    )
  }

  changeDirection(lang: string) {
    this.languageSer.changeLang(lang)
  }
}
