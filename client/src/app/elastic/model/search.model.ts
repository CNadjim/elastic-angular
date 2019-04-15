export class SearchModel {
  query:any;
  from:number;
  size:number;

  constructor() {
    this.from = 0;
    this.size = 10000;
    this.query = {
      'match_all': {}
    }
  }
}

