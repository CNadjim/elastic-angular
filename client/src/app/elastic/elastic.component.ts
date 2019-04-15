import {Component, OnInit} from '@angular/core';
import {ElasticService} from "./service/elastic.service";


@Component({
  selector: 'app-elastic',
  templateUrl: './elastic.component.html',
  styleUrls: ['./elastic.component.scss']
})
export class ElasticComponent implements OnInit {

  public criteriaVisible:boolean;

  constructor(private elasticService: ElasticService) {
  }

  ngOnInit(): void {
    this.criteriaVisible = true;
    this.elasticService.search();
  }

}
