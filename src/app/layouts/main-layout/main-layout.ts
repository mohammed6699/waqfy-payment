import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { DigitalStamp } from '../../shared/digital-stamp/digital-stamp';

@Component({
  imports: [Navbar, RouterOutlet, DigitalStamp],
  selector: 'app-main-layout',
  styleUrl: './main-layout.css',
  templateUrl: './main-layout.html',
})
export class MainLayout {}
