import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import { UploadComponent } from './upload.component';
import { StepPreviewComponent } from './component/step-preview/step-preview.component';
import { StepSendComponent } from './component/step-send/step-send.component';
import { StepUploadComponent } from './component/step-upload/step-upload.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import {PapaParseModule} from "ngx-papaparse";
import {AngularSplitModule} from "angular-split";
import {FlexLayoutModule} from "@angular/flex-layout";

const routes: Routes = [
  {
    path: '**',
    component:UploadComponent,
    children:[]
  }
];

@NgModule({
  declarations: [UploadComponent, StepPreviewComponent, StepSendComponent, StepUploadComponent],
  imports: [
    SharedModule,
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    AngularSplitModule,
    NgxDropzoneModule,
    PapaParseModule
  ]
})
export class UploadModule { }
