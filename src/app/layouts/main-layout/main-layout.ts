import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Navbar, RouterOutlet],
  selector: 'app-main-layout',
  styleUrl: './main-layout.css',
  templateUrl: './main-layout.html',
})
export class MainLayout {}
