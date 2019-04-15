import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ElasticService} from "../../service/elastic.service";
import {takeUntil} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {SnackBarService} from "../../../shared/service/snack-bar.service";
import {SnackBarType} from "../../../shared/model/snack-bar.type";
import {SearchModel} from "../../model/search.model";
import * as beautify from 'js-beautify';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit, OnDestroy {


  private unsubscribeAll: Subject<any>;

  public index: string;
  public elasticUrl: string;
  public query: SearchModel;


  editorOptions = {theme: 'vs-dark', language: 'json', automaticLayout: true};
  code: string;
  selectedQuestion: any;

  public questions: any = [
    {
      label: 'Question 2',
      content: {
        "match_all": {}
      }
    },
    {
      label: 'Question 4',
      content: {
        "constant_score" : {
          "filter" : {
            "terms" : { "date" : ["2017"]}
          }
        }
      }
    },
    {
      label: 'Question 5',
      content: {
        "match": {
          "title": "elastic"
        }
      }
    },
    {
      label: 'Question 6',
      content: {
        "match": {
          "title": "elastic stack"
        }
      }
    },
  ];

  constructor(private elasticService: ElasticService,
              private snackService: SnackBarService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.selectedQuestion = this.questions[0];
    this.elasticUrl = environment.elastic;
    this.elasticService.index
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.index = res;
      });
    this.elasticService.query
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.query = res;
        this.code = beautify(JSON.stringify(this.query.query));
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  save() {
    this.query.query = JSON.parse(this.code);
    this.elasticService.index.next(this.index);
    this.elasticService.query.next(this.query);
    this.elasticService.search()
      .catch(error => {
        this.snackService.show(SnackBarType.error, error);
      })
  }

  selectQuestion(question) {
    this.code = beautify(JSON.stringify(question.content));
  }

}


