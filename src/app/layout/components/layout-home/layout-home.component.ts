import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from "@angular/cdk/overlay";
import { StorageKeys } from "../../../core/interfaces/storage-keys";

@Component({
  selector: 'app-layout-home',
  templateUrl: './layout-home.component.html',
  styleUrls: ['./layout-home.component.scss']
})
export class LayoutHomeComponent implements OnInit {

  constructor(
    public overlayContainer: OverlayContainer,
  ) { }

  ngOnInit(): void {
    this.changeTheme('light-theme')
  }

  changeTheme(theme: string): void {
    // @ts-ignore
    this.overlayContainer.getContainerElement().parentElement.classList.remove('dark-theme');
    // @ts-ignore
    this.overlayContainer.getContainerElement().parentElement.classList.remove('light-theme');
    // @ts-ignore
    this.overlayContainer.getContainerElement().parentElement.classList.add(theme);

    // window.localStorage.setItem(StorageKeys.THEME, theme.value);
    // this.userData.theme = theme.value;
  }

}
