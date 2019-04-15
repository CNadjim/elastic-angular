import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Subject} from "rxjs";
import {ElasticService} from "../../service/elastic.service";
import {takeUntil} from "rxjs/operators";
import {ElasticResult} from "../../model/result.model";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0',minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TableComponent implements OnInit,OnDestroy {


  displayedColumns = ['date', 'title', 'seo_title', 'url', 'author', 'category', 'locales',"content"];
  resultSearch: ElasticResult = null;
  dataSource = null;
  onSearch = false;
  selectedRow = null;
  detailVisible = false;

  private unsubscribeAll: Subject<any> ;

  constructor(private elasticService: ElasticService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.elasticService.elasticResult
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.resultSearch = res;
      });
    this.elasticService.datasource
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.detailVisible = false;
        this.selectedRow = null;
        this.onSearch = true;
        this.dataSource = false;
        setTimeout(() => {
          this.onSearch = false;
          this.dataSource = res;
        },1000);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  selectRow(row){
    if (this.selectedRow == row){
      this.detailVisible = false;
      this.selectedRow = null;
    }else{
      this.selectedRow = row;
      this.detailVisible = true;
    }
  }



}
