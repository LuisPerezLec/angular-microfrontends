import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  emitEvent() {
    const event = new CustomEvent('login-clicked', {
      detail: {
        message: 'Usuario hizo login',
        timestamp: Date.now(),
      },
    });
    window.dispatchEvent(event);
  }
}
