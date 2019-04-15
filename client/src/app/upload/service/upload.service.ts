import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  header: string = "title;seo_title;url;author;date;category;locales;content\n";
  file: BehaviorSubject<any>;
  currentStep: BehaviorSubject<any>;
  sendResult: BehaviorSubject<any>;

  constructor() {
    this.file = new BehaviorSubject("");
    this.currentStep = new BehaviorSubject('step-upload');
    this.sendResult = new BehaviorSubject(null);
  }
}
