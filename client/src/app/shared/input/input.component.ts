import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Output() imageUrl = new EventEmitter();
  @Input() currentImage: undefined | string = '';
  isValid = true;

  inactive = true;
  fileName: string | undefined = 'Upload Image';
  btnText = 'Choose file';
  uploading = false;
  file!: FormData;
  progress = "0 %";
  constructor(private http: HttpClient) { }

  ngOnChanges() {
    this.fileName = this.currentImage;
  }

  uploadingHandler() {
    this.uploading = !this.uploading;
    this.uploadFile(this.file);
  }

  upload(event: any) {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('upload_preset', 'shared-trips')
    this.file = data;
    this.inactive = !this.inactive;
    this.fileName = event.target.files[0].name;
    this.uploading = !this.uploading;
    this.uploadFile(this.file);
  }

  uploadFile(data: FormData) {
    this.http.post<{ secure_url: string }>('https://api.cloudinary.com/v1_1/dofijitd8/image/upload', data, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(
        event => {
          this.isValid = true;
          if (event.type == HttpEventType.UploadProgress) {
            const progress = Math.round(event.loaded / (event.total || 100) * 100);
            this.progress = `${progress} %`;
          } else if (event.type === HttpEventType.Response) {
            if (event.body) {
              this.uploading = !this.uploading;
              this.btnText = 'Successfull';
              this.imageUrl.emit({ imageUrl: event.body?.secure_url });
            }
          }
        },
        err => {
          this.imageUrl.emit({ message: err.error.error.message });
          this.uploading = !this.uploading;
          this.isValid = false;
        }
      )
  }
}
