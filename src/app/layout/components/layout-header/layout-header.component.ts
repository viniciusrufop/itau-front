import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from "../../../core/interfaces/user";
import { AuthService } from "../../../core/services/auth.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { StorageKeys } from "../../../core/interfaces/storage-keys";
import { OverlayContainer } from "@angular/cdk/overlay";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit, OnDestroy {
  private unsub$ = new Subject();

  public userData!: User;
  public theme!: string;
  public language!: string;

  constructor(
    private authService: AuthService,
    public overlayContainer: OverlayContainer,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.authService.userData.pipe(takeUntil(this.unsub$)).subscribe(res => {
      if (!res || Object.entries(res).length === 0) return;

      this.userData = res
      this.theme = res.theme;
      this.language = res.language;
      this.changeTheme(res.theme)
      this.changeLanguage(res.language)
    });

  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  changeTheme(theme: string): void {
    this.overlayContainer.getContainerElement().parentElement?.classList.remove('dark-theme');
    this.overlayContainer.getContainerElement().parentElement?.classList.remove('light-theme');
    this.overlayContainer.getContainerElement().parentElement?.classList.add(theme);

    window.localStorage.setItem(StorageKeys.THEME, theme);
    this.userData.theme = theme;
  }

  changeLanguage(language: string): void {
    window.localStorage.setItem(StorageKeys.LANGUAGE, language);
    this.userData.language = language;
    this.translateService.use(language);
  }

  logout(): void {
    this.authService.signOut().subscribe();
  }

}
