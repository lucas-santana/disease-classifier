import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FileRoutingModule } from './file-routing.module';
import { FileUploadComponent } from './file-upload/file-upload.component';


@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    FileRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule


  ]
})
export class FileModule { }
