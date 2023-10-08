import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DASHBOARD } from './main-nav.constant';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ISidebarMenuModel } from './main-nav.model';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent {
  private breakpointObserver = inject(BreakpointObserver);

  // public dataSource = DASHBOARD;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  public routerLink: string | undefined;
  // activeContent: string = 'dashboard';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routerLink = event.urlAfterRedirects.replace('/', '');
      }
    });
    // Inisialisasi routerLink dengan rute saat ini
    // this.routerLink = this.router.url.replace('/', ''); // Hapus karakter '/' jika ada
    // console.log('router', this.routerLink);
    //   // Subscribe ke perubahan rute
    //   this.router.events.subscribe((event) => {
    //     if (event instanceof NavigationEnd) {
    //       this.routerLink = event.urlAfterRedirects.replace('/', ''); // Perbarui routerLink saat rute berubah
    //       // Di sini Anda dapat menentukan konten yang aktif berdasarkan rute
    //     }
    //   });
  }
}
