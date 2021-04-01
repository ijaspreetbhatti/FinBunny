import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _snackBar: MatSnackBar) { }

  public sendNotification(message: string, action: string = '') {
    this._snackBar.open(message, action, {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 450,
    });
  }

}
