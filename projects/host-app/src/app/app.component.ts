import {
  Component,
  ViewChild,
  ViewContainerRef,
  createComponent,
  Type,
  EnvironmentInjector,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'host-app';

  @ViewChild('loginContainer', { read: ViewContainerRef, static: true })
  loginContainer!: ViewContainerRef;

  @ViewChild('bannerContainer', { read: ViewContainerRef, static: true })
  bannerContainer!: ViewContainerRef;

  constructor(private envInjector: EnvironmentInjector) {}

  async ngOnInit() {
    const loginModule = await loadRemoteModule({
      remoteEntry: 'http://localhost:4300/remoteEntry.js',
      exposedModule: './LoginComponent',
      type: 'module',
    });

    const bannerModule = await loadRemoteModule({
      remoteEntry: 'http://localhost:4400/remoteEntry.js',
      exposedModule: './BannerComponent',
      type: 'module',
    });

    const loginComponent = createComponent(
      loginModule.LoginComponent as Type<any>,
      {
        environmentInjector: this.envInjector,
      }
    );
    this.loginContainer.insert(loginComponent.hostView);

    const bannerComponent = createComponent(
      bannerModule.BannerComponent as Type<any>,
      {
        environmentInjector: this.envInjector,
      }
    );
    this.bannerContainer.insert(bannerComponent.hostView);
  }
}
