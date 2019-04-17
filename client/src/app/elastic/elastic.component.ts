import {Component, OnInit} from '@angular/core';
import {ElasticService} from "./service/elastic.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-elastic',
  templateUrl: './elastic.component.html',
  styleUrls: ['./elastic.component.scss']
})
export class ElasticComponent implements OnInit {

  public criteriaVisible:boolean;
  public show : boolean;
  constructor(private elasticService: ElasticService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.show = false;
    this.criteriaVisible = true;
    this.elasticService.search().then(res => {
      this.show = true;
    })
      .catch(error => {
      if(error.status == 404){
        this.router.navigate(['upload']);
      }
    })
  }

}
