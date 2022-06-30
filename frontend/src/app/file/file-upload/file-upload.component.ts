import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  private api: string = 'http://localhost:3000/upload';

  @Input()
  requiredFileType: string = '';

  fileName = '';
  uploadProgress: any;
  uploadSub: any;

  predict: string = '';
  resultado: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    event.target.value = null;

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('imagem', file);

      const upload$ = this.http.post(this.api, formData);

      upload$.subscribe({
        next: (retorno: any) => {
          console.log(
            `Predict: ${retorno.predict} - Resultado: ${
              retorno.predict > 0.5 ? 'Normal' : 'Drusen'
            }`
          );
          this.predict = retorno.predict;
          this.resultado = retorno.predict > 0.5 ? 'Normal' : 'Drusen';
        },
        error: (err) => console.log('Error', err),
      });
    }
  }
}
