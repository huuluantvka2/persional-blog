import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItWebsiteService {
  private URL_PRODUCT: string = ''
  private URL_LOCAL: string = 'http://localhost:3000/api/v1'
  constructor(
    private http: HttpClient
  ) {

  }
  //---------------------------CÁC HÀM TƯƠNG TÁC SERVER-----------------------//

  public loginWeb(email: string, password: string) {
    let url = `${this.URL_LOCAL}/authenticate/signin`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(url, { email, password }, httpOptions).toPromise()
  }
  public signupWeb(json: any) {
    return new Promise<any>((resolve, reject) => {
      let url = `${this.URL_LOCAL}/authenticate/signup`
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      this.http.post(url, json, httpOptions).toPromise().then(res => {
        this.setUserLogged(res)
        resolve(true)
      }).catch(err => reject(err))
    })
  }
  public protectSignIn() {
    return new Promise<any>((resolve) => {
      let token = this.getUserLogged()?.token
      if (token) {
        let url = `${this.URL_LOCAL}/authenticate/protect`
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'token': token
          })
        };
        this.http.get(url, httpOptions).toPromise().then(res => {
          resolve(true)
        }).catch(err => {
          this.clearUserLogged()
          resolve(false)
        })
      } else resolve(false)

    })
  }
  // ----------thêm xóa sửa category-----------
  getAllCategorys() {
    let url = `${this.URL_LOCAL}/categorys`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get(url, httpOptions).toPromise()
  }

  addCategogys(json: any) {
    let url = `${this.URL_LOCAL}/categorys`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(url, json, httpOptions).toPromise()
  }
  updateCaterogyById(_id: string, json) {
    let url = `${this.URL_LOCAL}/categorys?_id=${_id}`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.patch(url, json, httpOptions).toPromise()
  }
  deleteCaterogyById(_id: string) {
    let url = `${this.URL_LOCAL}/categorys?_id=${_id}`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.delete(url, httpOptions).toPromise()
  }
  // ----------thêm xóa sửa category-----------
  loginAdmin(email: string, password: string) {
    let url = `${this.URL_LOCAL}/authenticate/login-admin`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(url, { email, password }, httpOptions).toPromise()
  }
  uploadImage(folder, file: any) {
    let url = `${this.URL_LOCAL}/update-image`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(url, { folder, file }, httpOptions).toPromise()
  }



  deleteIamge(urlImage: string) {
    let url = `${this.URL_LOCAL}/update-image?url=${urlImage}`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.delete(url, httpOptions).toPromise()
  }
  //---------------------------CÁC HÀM TƯƠNG TÁC SERVER-----------------------//
  //---------------CÁC HÀM LOADING---------------------------//
  timeOutLoading: any;
  public showLoading(timeout?) {
    return new Promise((resolve) => {
      resolve(true)
      document.getElementById('loading-one').style.display = 'block'
      this.timeOutLoading = setTimeout(() => {
        this.hideLoading()
        resolve(true)
      }, timeout || 30000)
    })
  }
  public hideLoading() {
    clearTimeout(this.timeOutLoading)
    document.getElementById('loading-one').style.display = 'none'
  }
  public alertMessage(message, type: 'success' | 'error' | 'warning', duration?) {
    let div = document.createElement('div')
    div.classList.add('alert', 'alert-position', `${type}-alert`)
    div.appendChild(document.createTextNode(message))
    document.getElementById('app-root').appendChild(div)
    setTimeout(() => {
      document.getElementById('app-root').removeChild(div)
    }, duration || 2000);
  }
  //---------------CÁC HÀM LOADING---------------------------//
  /**----------------------------------CÁC HÀM LOCAL----------------------------------- */
  public getUserLogged() {
    return JSON.parse(localStorage.getItem('itweb_account'))
  }
  public setUserLogged(data: any) {
    localStorage.setItem('itweb_account', JSON.stringify(data))
  }
  public clearUserLogged() {
    localStorage.removeItem('itweb_account')
  }

  /**----------------------------------CÁC HÀM LOCAL----------------------------------- */
}
