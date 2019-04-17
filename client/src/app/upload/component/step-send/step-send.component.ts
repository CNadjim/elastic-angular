import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {UploadService} from "../../service/upload.service";
import {takeUntil} from "rxjs/operators";
import {ElasticService} from "../../../elastic/service/elastic.service";
import {SnackBarService} from "../../../shared/service/snack-bar.service";
import {BulkHeaderItemModel, BulkHeaderModel} from "../../model/bulk-header.model";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";

import * as beautify from 'js-beautify';

@Component({
  selector: 'app-step-send',
  templateUrl: './step-send.component.html',
  styleUrls: ['./step-send.component.scss']
})
export class StepSendComponent implements OnInit, OnDestroy {

  error: string;
  loading: boolean;

  private unsubscribeAll: Subject<any>;

  constructor(private uploadService: UploadService,
              private snackBarService: SnackBarService,
              private router: Router,
              private elasticService: ElasticService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.loading = true;
    this.uploadService.sendResult
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        let body = "";
        for (let item of res) {
          let header = new BulkHeaderModel();
          header.create = new BulkHeaderItemModel();
          header.create._id = item.title;
          header.create._index = environment.index;
          header.create._type = "doc";
          body += JSON.stringify(header) + "\n" + JSON.stringify(item) + "\n";
        }
        console.log(body);
        this.elasticService.bulk(body)
          .then(res => {
              setTimeout(() => {
                this.router.navigate(['elastic']);
              }, 3000);
            })
          .catch(error => {
            this.loading = false;
            this.error = beautify(JSON.stringify(error));
          })
      })
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
