import {Injectable} from "@angular/core";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {SnackBarType} from "../model/snack-bar.type";
import {SnackBarComponent} from "../component/snack-bar/snack-bar.component";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService{

  constructor(private snackBar: MatSnackBar){

  }

  public show(type: SnackBarType, message : string, time? : number){
    let config = new MatSnackBarConfig();
    config.duration = (time ? time : 4000);
    switch (type){
      case SnackBarType.success : config.panelClass = ["success-snack"];
      break;
      case SnackBarType.warning : config.panelClass = ["warning-snack"];
      break;
      case SnackBarType.error : config.panelClass = ["error-snack"];
      break;
      case SnackBarType.info : config.panelClass = ["info-snack"];
      break;
    }

    config.data = {message, type};
    let snackRef = this.snackBar.openFromComponent(SnackBarComponent,config);
    return snackRef.afterDismissed();
  }

}
