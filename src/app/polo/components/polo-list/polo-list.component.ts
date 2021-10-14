import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PoloService } from "../../../core/services/polo.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IBusiness } from "../../../core/interfaces/ibusiness";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'app-polo-list',
  templateUrl: './polo-list.component.html',
  styleUrls: ['./polo-list.component.scss']
})
export class PoloListComponent implements OnInit, OnDestroy, AfterViewInit {

  @BlockUI() blockUI!: NgBlockUI;
  private unsub$ = new Subject();
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  public displayedColumns: string[] = ['name', 'business', 'valuation', 'active', 'action'];
  public dataSource: MatTableDataSource<IBusiness> = {} as MatTableDataSource<IBusiness>;

  constructor(
    private poloService: PoloService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllPolos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  getAllPolos(): void {
    this.blockUI.start();

    this.poloService.getAll().pipe(takeUntil(this.unsub$)).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    }).add(() => this.blockUI.stop());
  }

  viewPolo(id: number): void {
    this.router.navigate(['/polo/view', id]).then();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
