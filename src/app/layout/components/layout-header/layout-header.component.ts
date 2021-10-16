import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from "../../../core/interfaces/user";
import { AuthService } from "../../../core/services/auth.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit, OnDestroy {
  private unsub$ = new Subject();

  public userData!: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.userData.pipe(takeUntil(this.unsub$)).subscribe(res => this.userData = res);
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  logout(): void {
    this.authService.signOut().subscribe();
  }

}
