import {Component, Inject, OnInit} from '@angular/core';
import {SnackBarType} from "../../model/snack-bar.type";
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material";

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {
  type:SnackBarType;
  message:string;

  snackBarType = SnackBarType;

  constructor(public snackBarRef: MatSnackBarRef<SnackBarComponent>,
              @Inject(MAT_SNACK_BAR_DATA) private data : any) {
    this.message = data.message;
    this.type = data.type;
  }

  ngOnInit() {
  }

}

