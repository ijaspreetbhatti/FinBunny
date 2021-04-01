import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FinBunny';

  isLoggedIn = true;

  formBuilder = new FormBuilder();
  formGroup = this.formBuilder.group({
    username: ['admin', [Validators.required]],
    password: ['123', [Validators.required]],
  })

  constructor(private adminService: AdminService) {

  }

  login() {
    if (this.formGroup.value.username === 'admin' && this.formGroup.value.password === '123') {
      this.isLoggedIn = true;
      this.adminService.sendNotification('Successfully Logged In', '');
    } else {
      this.adminService.sendNotification('Wrong Credentials', '');
    }
  };

  logout() {
    this.isLoggedIn = false;
  }
}
