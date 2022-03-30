import { ItWebsiteService } from '../../../services/it-website.service'
export default class MyUploadAdapter {
    private loader;
    private folder;
    private arrayUrl:Array<any> = []
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
                    this.webService.uploadImage(this.folder, reader.result).then((url: string) => {
                        this.arrayUrl.push(url)
                        resolve({ default: url })
                    }).catch(err => this.webService.alertMessage(err.message, 'error'))
                }

            })
        })

    }
    public getArrayUrl(){
        return this.arrayUrl
    }
    // Aborts the upload process.
    abort() {
        let stop = ''
    }
}