import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxDropzoneComponent} from "ngx-dropzone";
import {SnackBarService} from "../../../shared/service/snack-bar.service";
import {SnackBarType} from "../../../shared/model/snack-bar.type";
import {UploadService} from "../../service/upload.service";

@Component({
  selector: 'app-step-upload',
  templateUrl: './step-upload.component.html',
  styleUrls: ['./step-upload.component.scss']
})
export class StepUploadComponent implements OnInit {

  public file:File;
  public csvContent:string;
  @ViewChild('dropzone') dropzone: NgxDropzoneComponent;

  constructor(private snackBarService:SnackBarService,
              private uploadService:UploadService) { }

  ngOnInit() {
  }

  onFileAdded(event: File[]){
    let extension = event[0].name.split('.').pop();
    if(extension != 'csv'){
      this.dropzone.reset();
      this.snackBarService.show(SnackBarType.error, extension+" file not supported");
      return null;
    }
    this.file = event[0];
    if(this.file && this.file.size){
      let fileReader = new FileReader();
      fileReader.onloadend = () =>{
        this.csvContent = fileReader.result as string;
        this.done();
      };
      fileReader.readAsText(this.file, "UTF-8");
    }
  }

  done(){
    let data = this.uploadService.header + this.csvContent;
    this.uploadService.file.next(data);
    this.uploadService.currentStep.next('step-preview');
  }

}
