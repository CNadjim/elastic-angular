import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Papa} from "ngx-papaparse";
import {UploadService} from "../../service/upload.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-step-preview',
  templateUrl: './step-preview.component.html',
  styleUrls: ['./step-preview.component.scss']
})
export class StepPreviewComponent implements OnInit, OnDestroy {

  public error: string;
  public data: string;
  public array: [];

  private unsubscribeAll: Subject<any>;

  constructor(private papa: Papa,
              private uploadService: UploadService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.data = null;
    this.error = null;
    this.uploadService.file
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(data => {
        if (data){
          setTimeout(() => {
            this.papa.parse(data, {
              header : true,
              delimiter: ';',
              newline: '\n',
                complete: (results => {
                  if(results.errors.length > 0 ){
                    this.error = JSON.stringify(results.errors)
                  }else{
                    this.data = JSON.stringify(results.data);
                    this.array = results.data;
                    this.send();
                  }
                })
            })

          },1000);
        }else {
          this.error = null;
          this.data = null;
        }
      })
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  modify(){
    this.uploadService.currentStep.next('step-upload');
  }

  send(){
    this.uploadService.sendResult.next(this.array);
    this.uploadService.currentStep.next('step-send');
  }

}
