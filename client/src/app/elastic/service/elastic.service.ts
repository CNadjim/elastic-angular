import {Injectable} from '@angular/core';
import {Client} from 'elasticsearch-browser';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {environment} from "../../../environments/environment";
import {ElasticResult, ItemModel} from "../model/result.model";
import {BehaviorSubject} from "rxjs";
import {SnackBarService} from "../../shared/service/snack-bar.service";
import {SnackBarType} from "../../shared/model/snack-bar.type";
import {SearchModel} from "../model/search.model";

@Injectable({
  providedIn: 'root'
})
export class ElasticService implements Resolve<Client> {

  public esClient: Client;

  public datasource: BehaviorSubject<ItemModel[]>;
  public elasticResult: BehaviorSubject<ElasticResult>;
  public index: BehaviorSubject<string>;
  public query: BehaviorSubject<SearchModel>;

  constructor(private snackBarService: SnackBarService) {
    this.datasource = new BehaviorSubject(null);
    this.elasticResult = new BehaviorSubject(null);
    this.query = new BehaviorSubject(new SearchModel());
    this.index = new BehaviorSubject(environment.index);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return new Promise((resolve) => {
      this.esClient = new Client({host: environment.elastic});
      resolve();
    })
  }


  search(): Promise<ElasticResult> {
    return this.esClient.search(
      {
        index: this.index.value,
        body: this.query.value
      }
    )
      .then(res => {
        this.elasticResult.next(res);
        this.datasource.next(this.extractResult(res));
      }).catch(error => {
        this.datasource.next(null);
        this.elasticResult.next(null);
        this.snackBarService.show(SnackBarType.error, error);
      })
  }

  insert(body: any): Promise<any> {
    return this.esClient.create(
      {
        index: environment.index,
        type: 'item',
        id: body.title,
        body: body
      })
      .then(res => {

      })
      .catch(error => {
        this.snackBarService.show(SnackBarType.error, error)
      })
  }



  private extractResult(elasticResult: ElasticResult) {
    let result = [];
    for (let hit of elasticResult.hits.hits) {
      result.push(hit._source);
    }
    return result;
  }


}
