import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItWebsiteService } from '../../services/it-website.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  sex: '-1' | '0' | '1' = "-1"
  constructor(
    private itWeb: ItWebsiteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkFormValid()

  }
  checkFormValid(form?) {
    setTimeout(() => {
      let button = document.getElementById('button-signup')
      if (form && form.valid && this.sex != '-1') button.removeAttribute('disabled')
      else button.setAttribute('disabled', '')
    }, 100);
  }
  gotoSignIn() {
    this.router.navigate(['/authen/signin'])
  }
  signup(form) {
    let json = form.value
    json.sex = json.sex == '1' ? true : false
    this.itWeb.signupWeb(json).then(res => {
      console.log(res)
    }).catch(err => { this.itWeb.alertMessage(err.error?.message, 'error') })
  }
}
