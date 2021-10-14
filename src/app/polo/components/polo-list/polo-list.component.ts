import { Component, OnDestroy, OnInit } from '@angular/core';
import { PoloService } from "../../../core/services/polo.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IBusiness } from "../../../core/interfaces/ibusiness";
import { Router } from "@angular/router";

@Component({
  selector: 'app-polo-list',
  templateUrl: './polo-list.component.html',
  styleUrls: ['./polo-list.component.scss']
})
export class PoloListComponent implements OnInit, OnDestroy {

  @BlockUI() blockUI!: NgBlockUI;
  private unsub$ = new Subject();

  public arrayPolos: Array<IBusiness> = [];

  constructor(
    private poloService: PoloService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllPolos();
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  getAllPolos(): void {
    this.blockUI.start();

    this.poloService.getAll().pipe(takeUntil(this.unsub$)).subscribe(res => {
      this.arrayPolos = res;
    }).add(() => this.blockUI.stop());
  }

  viewPolo(id: number): void {
    this.router.navigate(['/polo/view', id]).then();
  }

}
