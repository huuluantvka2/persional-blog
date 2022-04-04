import { Component, OnInit } from '@angular/core';
import { ItWebsiteService } from 'src/app/desktop/services/it-website.service';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.scss']
})
export class CategorysComponent implements OnInit {
  listCategory: Array<any> = []
  modalAddCategory: any
  modalupdateCategory: any
  modalDeleteCategory: any
  dataAdd: any = { name: '', type: '' }
  dataUpdate: any = {}
  dataDelete: any = {}
  constructor(
    private webService: ItWebsiteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.modalAddCategory = new Modal(document.getElementById('modalAddCategory'))
    this.modalupdateCategory = new Modal(document.getElementById('modalUpdateCategory'))
    this.modalDeleteCategory = new Modal(document.getElementById('modalDeleteCategory'))
    this.webService.showLoading().then(() => {
      this.webService.getAllCategorys({}).then((res: any) => {
        this.listCategory = res.data
        console.log(this.listCategory)
      }).catch(err => { { console.log(err.status == 401); if (err.status == 401) this.router.navigate(['/admin']); this.webService.alertMessage(err.error?.message, 'error') } }).finally(() => this.webService.hideLoading())
    })

  }
  showModalAdd() {
    this.modalAddCategory.show();
  }
  closeModalAdd() {
    this.dataAdd = {}
    this.modalAddCategory.hide()
  }
  checkFormValid(id_button) {
    setTimeout(() => {
      let button = document.getElementById(id_button)
      if ((this.dataAdd.name && this.dataAdd.type) || (this.dataUpdate.name && this.dataUpdate.type)) button.removeAttribute('disabled')
      else button.setAttribute('disabled', '')
    }, 100)
  }
  addCategory() {
    this.webService.showLoading().then(() => {
      this.webService.addCategogys(this.dataAdd).then(res => {
        this.listCategory.unshift(res)
        this.closeModalAdd()
      }).catch(err => { if (err.status == 401) this.router.navigate(['/admin']); this.webService.alertMessage(err.error?.message, 'error') }).finally(() => this.webService.hideLoading())
    })
  }
  showModalUpdate(item) {
    this.dataUpdate = { ...item }
    this.modalupdateCategory.show()
  }
  closeModalEdit() {
    this.dataUpdate = {}
    this.modalupdateCategory.hide()
  }
  updateCategory() {
    this.webService.showLoading().then(() => {
      this.webService.updateCaterogyById(this.dataUpdate._id, this.dataUpdate).then(res => {
        this.listCategory[this.listCategory.findIndex(item => item._id == this.dataUpdate._id)] = this.dataUpdate
        this.closeModalEdit()
      }).catch(err => { { if (err.status == 401) this.router.navigate(['/admin']); this.webService.alertMessage(err.error?.message, 'error') } }).finally(() => this.webService.hideLoading())
    })
  }
  showModalDelete(item, index) {
    this.dataDelete = { _id: item._id, index }
    this.modalDeleteCategory.show()
  }
  closeModalDelete() {
    this.dataDelete = {}
    this.modalDeleteCategory.hide()
  }
  deleteCategory() {
    this.webService.showLoading().then(() => {
      this.webService.deleteCaterogyById(this.dataUpdate._id).then(res => {
        this.listCategory.splice(this.dataDelete.index, 1)
        this.closeModalDelete()
      }).catch(err => { if (err.status == 401) this.router.navigate(['/admin']); this.webService.alertMessage(err.error?.message, 'error') }).finally(() => this.webService.hideLoading())
    })
  }
  trackByMyFunc(index, item) {
    return item.name;
  }
}
