import { ItWebsiteService } from '../../../services/it-website.service'
export default class MyUploadAdapter {
    private loader;
    private folder;
    private arrayUrl: Array<any> = []
    constructor(loader, folder, private webService: ItWebsiteService) {
        this.loader = loader;
        this.folder = folder
    }
    public upload() {
        return new Promise<any>((resolve) => {
            this.loader.file.then((file: File) => {
                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    resolve({ default: reader.result })
                    //không dùng cách upload to firebase vì không biết khi nào ảnh bị xóa nên làm rác trong firebase

                    // this.webService.uploadImage(this.folder, reader.result).then((url: string) => {
                    //     this.arrayUrl.push(url)
                    //     resolve({ default: url })
                    // }).catch(err => {this.webService.alertMessage(err.error?.message, 'error');if(err.status ==401) this.router.navigate(['/admin'])})
                }

            })
        })

    }
    public getArrayUrl() {
        return this.arrayUrl
    }
    // Aborts the upload process.
    abort() {
        let stop = ''
    }
}