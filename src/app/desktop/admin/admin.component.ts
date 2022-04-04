import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItWebsiteService } from '../services/it-website.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private webService: ItWebsiteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkFormValid()
  }
  login(form) {
    this.webService.showLoading().then(() => {
      this.webService.loginAdmin(form.value.email, form.value.password).then(res => {
        this.router.navigate(['/admin/daskboard'])
      }).catch(err => { this.webService.alertMessage(err.error?.message, 'error') }).finally(() => this.webService.hideLoading())
    })
  }

  checkFormValid(form?) {
    let button = document.getElementById('button-login')
    if (form && form.value.email && form.value.password) button.removeAttribute('disabled')
    else button.setAttribute('disabled', '')
  }

}
