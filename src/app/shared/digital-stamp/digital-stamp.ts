import { Component, OnInit } from '@angular/core';
import { LanuageService } from '../../services/translate.service';
import { NgClass } from '@angular/common';

@Component({
  imports: [NgClass],
  selector: 'app-digital-stamp',
  styleUrl: './digital-stamp.css',
  templateUrl: './digital-stamp.html',
})
export class DigitalStamp implements OnInit{
  currentLang = localStorage.getItem('lang') || 'en';
  constructor(
    private languageSer: LanuageService
  ){}
  ngOnInit(): void {
    this.languageSer.language$.subscribe(
      lang => {this.currentLang = lang}
    )
  }
}
