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
  loginAdmin(email: string, password: string) {
    return new Promise((resolve, reject) => {
      let url = `${this.URL_LOCAL}/authenticate/login-admin`
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      return this.http.post(url, { email, password }, httpOptions).toPromise().then((res: any) => {
        if (res.token) {
          this.setTokenAdminLogge(`Bearer ${res.token}`)
          resolve(true)
        } else reject(false)
      }).catch(err => reject(err))
    })

  }
  // ----------thêm xóa sửa category-----------
  getAllCategorys(queryCondition) {
    let url = `${this.URL_LOCAL}/categorys`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.getTokenAdminLogged()
      }),
      params: {
        queryCondition: JSON.stringify(queryCondition || {}),
      }
    };
    return this.http.get(url, httpOptions).toPromise()
  }

  addCategogys(json: any) {
    let url = `${this.URL_LOCAL}/categorys`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.getTokenAdminLogged()
      })
    };
    return this.http.post(url, json, httpOptions).toPromise()
  }
  updateCaterogyById(_id: string, json) {
    let url = `${this.URL_LOCAL}/categorys?_id=${_id}`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.getTokenAdminLogged()
      })
    };
    return this.http.patch(url, json, httpOptions).toPromise()
  }
  deleteCaterogyById(_id: string) {
    let url = `${this.URL_LOCAL}/categorys?_id=${_id}`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.getTokenAdminLogged()
      })
    };
    return this.http.delete(url, httpOptions).toPromise()
  }
  // ----------thêm xóa sửa category-----------
  //-----------thêm xóa sửa bài viết -----------
  getAllPosts(queryCondition, select?, limit?, page?) {
    let url = `${this.URL_LOCAL}/posts`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.getTokenAdminLogged()
      }),
      params: {
        queryCondition: JSON.stringify(queryCondition || {}),
        select: select || null,
        limit: limit || null,
        page: page || null
      }
    };
    return this.http.get(url, httpOptions).toPromise()
  }
  getDetailPostByID(_id: string) {
    let url = `${this.URL_LOCAL}/posts/${_id}`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.getTokenAdminLogged()
      })
    };
    return this.http.get(url, httpOptions).toPromise()
  }
  addPosts(json: any) {
    let url = `${this.URL_LOCAL}/posts`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.getTokenAdminLogged()
      })
    };
    return this.http.post(url, json, httpOptions).toPromise()
  }
  updatePostById(_id: string, json) {
    let url = `${this.URL_LOCAL}/posts?_id=${_id}`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.getTokenAdminLogged()
      })
    };
    return this.http.patch(url, json, httpOptions).toPromise()
  }
  deletePostById(_id: string) {
    let url = `${this.URL_LOCAL}/posts?_id=${_id}`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.getTokenAdminLogged()
      })
    };
    return this.http.delete(url, httpOptions).toPromise()
  }
  //-----------thêm xóa sửa bài viết -----------

  uploadImage(folder, file: any, old_url?: string) {
    let url = `${this.URL_LOCAL}/update-image`
    let json: any = { folder, file }
    if (old_url) this.deleteIamge(old_url).then(res => console.log('ảnh cũ:', res))
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.getTokenAdminLogged()
      })
    };
    return this.http.post(url, json, httpOptions).toPromise()
  }



  deleteIamge(urlImage: string) {
    let url = `${this.URL_LOCAL}/update-image?url=${urlImage}`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.getTokenAdminLogged()
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

  public renderNavigation(current_page: number, total: number, limit: number) {
    let totalNumber = Math.ceil(total / limit)
    let array: Array<any> = []
    if (totalNumber <= 4)
      for (let i = 1; i <= totalNumber; i++) array.push(i)
    else if (totalNumber > 4) {
      for (let i = current_page - 2; i <= current_page + 2; i++) {
        if (i > 0 && i <= totalNumber) array.push(i)
      }
      if (current_page - 3 > 1) array.unshift(1, null)
      if (current_page + 3 < totalNumber) array.push(null, totalNumber)
    }
    return array
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

  public getTokenAdminLogged() {
    return JSON.parse(localStorage.getItem('itweb_admin_token'))
  }
  public setTokenAdminLogge(data: any) {
    localStorage.setItem('itweb_admin_token', JSON.stringify(data))
  }
  public clearTokenAdminLogge() {
    localStorage.removeItem('itweb_admin_token')
  }

  /**----------------------------------CÁC HÀM LOCAL----------------------------------- */
}
