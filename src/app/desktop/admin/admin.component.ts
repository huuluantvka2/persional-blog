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
    private itWeb: ItWebsiteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkFormValid()
  }
  login(form) {
    this.itWeb.showLoading().then(() => {
      this.itWeb.loginAdmin(form.value.email, form.value.password).then(res => {
        console.log(res)
      }).catch(err => { console.error(err.error?.message) })
    })
  }

  checkFormValid(form?) {
    let button = document.getElementById('button-login')
    if (form && form.value.email && form.value.password) button.removeAttribute('disabled')
    else button.setAttribute('disabled', '')
  }

}
