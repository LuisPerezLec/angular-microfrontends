import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent implements OnInit, OnDestroy {
  message = 'Esperando evento...';

  private handler = (event: Event) => {
    const customEvent = event as CustomEvent;
    this.message = 'Evento recibido: ' + customEvent.detail.message;
  };

  ngOnInit(): void {
    window.addEventListener('login-clicked', this.handler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('login-clicked', this.handler);
  }
}
