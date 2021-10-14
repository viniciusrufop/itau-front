import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PoloService } from "../../../core/services/polo.service";
import { takeUntil } from "rxjs/operators";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Subject } from "rxjs";
import { IBusiness } from "../../../core/interfaces/ibusiness";

@Component({
  selector: 'app-polo-view',
  templateUrl: './polo-view.component.html',
  styleUrls: ['./polo-view.component.scss']
})
export class PoloViewComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  private unsub$ = new Subject();

  public polo: IBusiness = {} as IBusiness;

  constructor(
    private route: ActivatedRoute,
    private poloService: PoloService,
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.getPolo(id);
  }

  getPolo(id: number): void {
    this.blockUI.start();

    this.poloService.getById(id).pipe(takeUntil(this.unsub$)).subscribe(res => {
      this.polo = res;
    }).add(() => this.blockUI.stop());
  }

}
