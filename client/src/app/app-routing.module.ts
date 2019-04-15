import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ElasticService} from "./elastic/service/elastic.service";

const routes: Routes = [
  {
    path      : '',
    redirectTo : 'elastic',
    pathMatch: 'full'
  },
  {
    path        : 'elastic',
    loadChildren: './elastic/elastic.module#ElasticModule',
    resolve: {
      esClient: ElasticService
    }
  },
  {
    path        : 'upload',
    loadChildren: './upload/upload.module#UploadModule',
    resolve: {
      esClient: ElasticService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
