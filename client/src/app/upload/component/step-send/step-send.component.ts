import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {UploadService} from "../../service/upload.service";
import {takeUntil} from "rxjs/operators";
import {ElasticService} from "../../../elastic/service/elastic.service";

@Component({
  selector: 'app-step-send',
  templateUrl: './step-send.component.html',
  styleUrls: ['./step-send.component.scss']
})
export class StepSendComponent implements OnInit,OnDestroy {

  loading:boolean;
  error: string;

  private unsubscribeAll: Subject<any>;
  constructor(private uploadService:UploadService,
              private elasticService:ElasticService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.loading = true;
    this.uploadService.sendResult
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        for(let item of res){

          this.elasticService.insert(item)
            .then(res => {

            }).catch(error => {
              console.log(error);
            })
        }

        this.loading = false;
      })
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
