import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthComponent} from "./auth/auth.component";

@Component({
  selector: 'app-root', //selector reprezinta modul de apelare al componentei(e un tag de HTML)
  standalone: true,
  imports: [CommonModule, RouterOutlet, DashboardComponent, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'onlineshop';
}
