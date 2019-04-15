import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElasticComponent } from './elastic.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {FlexModule} from "@angular/flex-layout";
import {AngularSplitModule} from "angular-split";
import { TableComponent } from './component/table/table.component';
import { CriteriaComponent } from './component/criteria/criteria.component';
import {MonacoEditorModule, NgxMonacoEditorConfig} from "ngx-monaco-editor";

const monacoConfig: NgxMonacoEditorConfig = {
  defaultOptions: { scrollBeyondLastLine: false }
};

const routes: Routes = [
  {
    path: '',
    redirectTo: '/elastic',
    pathMatch: 'full'
  },
  {
    path        : '',
    component: ElasticComponent,
    children:[

    ]
  },
];

@NgModule({
  declarations: [ElasticComponent, TableComponent, CriteriaComponent],
  imports: [
    SharedModule,
    CommonModule,
    MonacoEditorModule.forRoot(monacoConfig),
    AngularSplitModule,
    RouterModule.forChild(routes),
    FlexModule
  ]
})
export class ElasticModule { }
