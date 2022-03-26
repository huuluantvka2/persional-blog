import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItWebsiteService } from '../../services/it-website.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  email: string = ''
  password: string = ''
  constructor(
    private itWeb: ItWebsiteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkFormValid()
  }
  login() {
    this.itWeb.showLoading().then(() => {
      this.itWeb.loginWeb(this.email, this.password).then(res => {
        console.log(res)
      }).catch(err => { console.error(err.error?.message) })
    })
  }

  checkFormValid(form?) {
    let button = document.getElementById('button-login')
    if (form && form.value.email && form.value.password) button.removeAttribute('disabled')
    else button.setAttribute('disabled', '')
  }
  gotoSignUp() {
    this.router.navigate(['/authen/signup'])
  }
}
