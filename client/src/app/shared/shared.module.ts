import {MaterialModule} from "./component/material/material.module";
import {NgModule} from "@angular/core";
import {IfOnDomDirective} from "./directive/if-on-dom.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SnackBarComponent } from './component/snack-bar/snack-bar.component';
import {SnackBarService} from "./service/snack-bar.service";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import { LoaderComponent } from './component/loader/loader.component';

@NgModule({
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CommonModule,
  ],
  declarations: [
    IfOnDomDirective,
    SnackBarComponent,
    LoaderComponent
  ],
  exports: [
    MaterialModule,
    IfOnDomDirective,
    FormsModule,
    ReactiveFormsModule,
    SnackBarComponent,
    LoaderComponent
  ],
  providers: [
    SnackBarService
  ],
  entryComponents: [
    SnackBarComponent
  ]
})
export class SharedModule { }
