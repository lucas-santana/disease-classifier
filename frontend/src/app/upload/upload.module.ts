import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload/upload.component';


@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    MatCardModule
  ]
})
export class UploadModule { }
