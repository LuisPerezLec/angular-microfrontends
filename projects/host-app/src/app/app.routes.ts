import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () => {
      return loadRemoteModule({
        remoteEntry: 'http://localhost:4300/remoteEntry.js',
        exposedModule: './LoginComponent',
        type: 'module',
      })
        .then((m) => m.LoginComponent)
        .catch((err) => console.error('Error loading LoginComponent:', err));
    },
  },
  {
    path: 'banner',
    loadComponent: () => {
      return loadRemoteModule({
        remoteEntry: 'http://localhost:4400/remoteEntry.js',
        exposedModule: './BannerComponent',
        type: 'module',
      })
        .then((m) => m.BannerComponent)
        .catch((err) => console.error('Error loading BannerComponent:', err));
    },
  },
];
