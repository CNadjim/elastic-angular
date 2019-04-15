import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {UploadService} from "./service/upload.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  private unsubscribeAll:Subject<any>;
  public currentStep: string;

  constructor(private uploadService:UploadService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.uploadService.currentStep
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.currentStep = res;
      })
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
