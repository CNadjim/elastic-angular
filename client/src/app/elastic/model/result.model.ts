export class HitModel {
  _id: string;
  _index: string;
  _score: number;
  _source: ItemModel;
  _type: string;
}

export class ItemModel {
  title: string;
  author: string;
  category: string;
  content: string;
  date: Date;
  locales: string;
  seo_title: string;
  url: string;
}

export class ElasticResult{
  hits: HitsModel;
  timed_out: boolean;
  took: number;
  _shards: any;
}

export class HitsModel {
  hits: HitModel[];
  max_score: number;
  total: number;
}
