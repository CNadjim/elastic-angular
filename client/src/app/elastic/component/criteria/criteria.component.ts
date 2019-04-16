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
        "match": {
          "date": {
            "query": "May 2017",
            "operator": "and"
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
    {
      label: 'Question 8',
      content: {
        "bool": {
          "must": [{
            "match": {
              "content": "search"
            }
          }, {
            "match": {
              "content": "search analytics"
            }
          }, {
            "match": {
              "content": {
                "query": "search analytics",
                "operator": "and"
              }
            }
          }]
        }
      }
    },
    {
      label: 'Question 8.1',
      content: {
        "match": {
          "content": "search"
        }
      }
    },
    {
      label: 'Question 8.2',
      content: {
        "match": {
          "content": {
            "query": "search analytics",
            "operator" : "or"
          }
        }
      }
    },
    {
      label: 'Question 8.3',
      content: {
        "match": {
          "content": {
            "query": "search analytics",
            "operator" : "and"
          }
        }
      }
    },
    {
      label: 'Question 9',
      content: {
        "match_phrase": {
          "content": {
            "query": "search analytics"
          }
        }
      }
    },
    {
      label: 'Question 10',
      content: {
        "match_phrase": {
          "content": {
            "query": "search analytics",
            "slop": 1
          }
        }
      }
    },
    {
      label: 'Question 11',
      content: {
        "bool": {
          "must": [{
            "match": {
              "content": "performance optimizations improvements"
            }
          }]
        }
      }
    },
    {
      label: 'Question 12',
      content: {
        "bool": {
          "should": [{
            "match": {
              "content": "performance"
            }
          }, {
            "match": {
              "content": "optimizations"
            }
          }, {
            "match": {
              "content": "improvements"
            }
          }],
          "minimum_should_match": 2
        }
      }
    }
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


